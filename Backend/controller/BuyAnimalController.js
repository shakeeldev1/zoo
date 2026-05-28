import BuyAnimal from "../model/BuyAnimalModel.js";
import Animal from "../model/AnimalModel.js";

// ======================================================
// CREATE/UPDATE BUY ANIMAL
// ======================================================
export const addBuyAnimal = async (req, res) => {
  try {
    const userId = req.userId;
    const { animalId } = req.params;
    const { cartQty } = req.body;

    // ================= VALIDATION =================
    if (!cartQty || cartQty < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid quantity",
      });
    }

    // ================= FIND ANIMAL =================
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    // ================= STOCK CHECK =================
    if (animal.quantity < cartQty) {
      return res.status(400).json({
        success: false,
        message: "Not enough animals available",
      });
    }

    // ================= CHECK EXISTING =================
    const existingItem = await BuyAnimal.findOne({
      userId,
      animalId,
    });

    // ================= IF ALREADY EXISTS - INCREASE QTY =================
    if (existingItem) {
      const newQty = existingItem.cartQty + cartQty;

      // Check if new total exceeds stock
      if (animal.quantity < newQty) {
        return res.status(400).json({
          success: false,
          message: "Stock limit reached for this animal",
        });
      }

      // Reduce animal stock
      animal.quantity -= cartQty;
      await animal.save();

      existingItem.cartQty = newQty;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Animal quantity updated in cart",
        data: existingItem,
      });
    }

    // ================= CREATE NEW =================
    const newItem = await BuyAnimal.create({
      userId,
      animalId,
      cartQty,
    });

    // ================= UPDATE STOCK =================
    animal.quantity -= cartQty;
    await animal.save();

    return res.status(201).json({
      success: true,
      message: "Animal added to cart successfully",
      data: newItem,
    });

  } catch (err) {
    console.log("ADD BUY ANIMAL ERROR:", err);
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
      data: items,
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

    const cartItem = await BuyAnimal.findById(id);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Restore animal stock
    await Animal.findByIdAndUpdate(
      cartItem.animalId,
      { $inc: { quantity: cartItem.cartQty } }
    );

    await BuyAnimal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const increaseBuyAnimalQty = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid quantity",
      });
    }

    const item = await BuyAnimal.findById(id).populate("animalId");
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const animal = item.animalId;
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    // Check stock availability
    if (animal.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Stock limit reached",
      });
    }

    // Update
    item.cartQty += quantity;
    animal.quantity -= quantity;

    await item.save();
    await animal.save();

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
    const { quantity: decreaseQty } = req.body;

    const item = await BuyAnimal.findById(id).populate("animalId");
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Validate: can't decrease below 1
    if (item.cartQty <= 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum quantity is 1",
      });
    }

    // Use the quantity to decrease or default to 1
    const qtyToDecrease = decreaseQty && decreaseQty > 0 ? Math.min(decreaseQty, item.cartQty - 1) : 1;

    // Restore animal stock
    const animal = item.animalId;
    if (animal) {
      animal.quantity += qtyToDecrease;
      await animal.save();
    }

    // Decrease
    item.cartQty -= qtyToDecrease;
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

// ======================================================
// GET SINGLE BUY ANIMAL
// ======================================================
export const getBuyAnimalById = async (req, res) => {
  try {
    const { id } = req.params;

    const buyAnimal = await BuyAnimal.findById(id)
      .populate("animalId", "name price quantity description animalimage")
      .populate("userId", "name email");

    if (!buyAnimal) {
      return res.status(404).json({
        success: false,
        message: "Buy animal not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: buyAnimal,
    });
  } catch (err) {
    console.log("GET BUY ANIMAL BY ID ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



