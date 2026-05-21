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

    const totalBill = validItems.reduce(
  (total, item) => {

    const animalPrice =
      item?.animalId?.price || 0;

    return total + (animalPrice * item.cartQty);

  },
  0
);

    return res.status(200).json({
      success: true,

      count: validItems.length,

      totalBill,

     items: validItems.map((item) => ({
  cartId: item._id,

  // ✅ VERY IMPORTANT
  cartQty: item.cartQty,

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

export const getAllBuyAnimal = async (req, res) => {
  try {
    const items = await BuyAnimal.find()
      .populate("animalId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (err) {
    console.log("GET ALL BUY ANIMAL ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch items",
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
    const item = await BuyAnimal.findById(id)
      .populate("animalId");
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }
    const stock = item?.animalId?.quantity || 0;

    if (item.cartQty >= stock) {
      return res.status(400).json({
        success: false,
        message: "Stock limit reached",
      });
    }

    item.cartQty += 1;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Quantity increased successfully",
      cartQty: item.cartQty,
    });

  } catch (err) {

    console.log("INCREASE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
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
        message: "Item not found",
      });
    }

    // ✅ STOP AT 1
    if (item.cartQty <= 1) {

      return res.status(400).json({
        success: false,
        message: "Minimum quantity is 1",
      });
    }

    // ✅ DECREASE
    item.cartQty -= 1;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Quantity decreased",
      cartQty: item.cartQty,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



