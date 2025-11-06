import Product from "../models/productSchema.js";
import Cart from "../models/cartSchema.js";

const getSessionId = (req) => {
  let sessionId = req.cookies?.sessionId;
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  return sessionId;
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const sessionId = getSessionId(req);
    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [],
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += qty;
    } else {
      cart.items.push({
        productId: product._id,
        quantity: qty,
      });
    }

    await cart.save();

    res.cookie('sessionId', sessionId, { 
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ cartItems: [], total: 0 });
    }

    const cartItems = cart.items
      .filter(item => item.productId)
      .map((cartItem) => {
        const product = cartItem.productId;
        return {
          id: product._id.toString(),
          productId: product._id.toString(),
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: cartItem.quantity,
        };
      });

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.status(200).json({ cartItems, total });
  } catch (error) {
    console.log("Error in getCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const sessionId = getSessionId(req);
    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== id.toString()
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.log("Error in removeFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const checkout = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    const sessionId = getSessionId(req);
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartItems = cart.items
      .filter(item => item.productId)
      .map((cartItem) => {
        const product = cartItem.productId;
        return {
          id: product._id.toString(),
          productId: product._id.toString(),
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: cartItem.quantity,
        };
      });

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const receipt = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      total: total,
      timestamp: new Date().toISOString(),
      cartItems: cartItems,
      customer: {
        name,
        email,
      },
    };

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Checkout successful", receipt });
  } catch (error) {
    console.log("Error in checkout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
