import BuyAnimal from "../model/BuyAnimalModel.js"
export const addBuyAnimal = async (req, res) => {

  try {

    // ✅ USER ID FROM TOKEN
    const userId = req.userId;

    // ✅ ANIMAL ID FROM PARAMS
    const { animalId } = req.params;

 

    // ✅ CHECK EXISTING
    const existingItem = await BuyAnimal.findOne({
      userId,
      animalId,
    });

    if (existingItem) {

      return res.status(400).json({
        success: false,
        message: "Animal already exists in cart",
      });
    }

    // ✅ CREATE NEW
    const newItem = await BuyAnimal.create({
      userId,
      animalId,
    });

    return res.status(201).json({
      success: true,
      message: "Animal added to cart successfully",
      data: newItem,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBuyAnimal = async (req, res) => {
  try {

    // ================= USER ID =================
    const userId = req.userId;

    // ================= GET CART ITEMS =================
    const items = await BuyAnimal.find({ userId })

      // populate full animal data
      .populate({
        path: "animalId",
        select:
          "name price quantity description animalimage",
      })

      // latest added first
      .sort({ createdAt: -1 });

    // ================= FILTER INVALID ANIMALS =================
    // agar koi animal delete ho gaya ho
    const validItems = items.filter(
      (item) => item.animalId
    );

    // ================= TOTAL BILL =================
    const totalBill = validItems.reduce(
      (total, item) => {

        const animalPrice =
          item?.animalId?.price || 0;

        return total + animalPrice;

      },
      0
    );

    // ================= RESPONSE =================
    return res.status(200).json({
      success: true,

      count: validItems.length,

      totalBill,

      items: validItems.map((item) => ({
        cartId: item._id,

        userId: item.userId,

        animal: {
          animalId: item?.animalId?._id,

          name: item?.animalId?.name,

          price: item?.animalId?.price,

          quantity: item?.animalId?.quantity,

          description:
            item?.animalId?.description,

          image:
            item?.animalId?.animalimage?.url,
        },

        addedAt: item.createdAt,
      })),
    });

  } catch (err) {

    console.log("GET BUY ANIMAL ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
      error: err.message,
    });
  }
};

export const deleteBuyAnimal = async (req, res) => {
  try {

    const { id } = req.params;

    await BuyAnimal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item removed successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const increaseBuyAnimalQty = async (req, res) => {
  try {

    const { id } = req.params;

    const item = await BuyAnimal.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    // stock check
    if (item.cartQty < item.quantity) {
      item.cartQty += 1;
    }

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Quantity increased",
      data: item
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const decreaseBuyAnimalQty = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await BuyAnimal.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    item.cartQty -= 1;

    if (item.cartQty <= 0) {
      await BuyAnimal.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Item removed from cart"
      });
    }

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Quantity decreased",
      data: item
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



