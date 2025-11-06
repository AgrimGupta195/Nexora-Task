import express from "express";
import { addToCart, getCart, removeFromCart, checkout } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);
router.post("/checkout", checkout);

export default router;
