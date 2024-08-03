import { Request, Response } from "express";
import Item from "../models/item";

export const getItem = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'An error occurred while fetching items' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { onCart } = req.body;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (onCart !== undefined) {
      item.onCart = onCart;
    }

    await item.save();

    res.status(201).json({ message: "Item updated", item });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'An error occurred while updating the item' });
  }
};
