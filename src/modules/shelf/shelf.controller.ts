import { Request, Response } from 'express';
import shelfModel from './shelf.model';

exports.addToShelf = async (req: Request, res: Response) => {
  const { bookId, status, progress = 0 } = req?.body;
  const userId = req?.user?._id;
  if (!userId) {
    throw new Error('User id not found');
  }
  try {
    let shelfItem = await shelfModel.findOne({ user: userId, book: bookId });
    if (shelfItem) {
      shelfItem.status = status;
      shelfItem.progress = status === 'read' ? 100 : progress;
      if (status === 'read') shelfItem.finishedAt = new Date();
      await shelfItem.save();
    } else {
      shelfItem = await shelfModel.create({
        user: userId,
        book: bookId,
        status,
        progress: status === 'read' ? 100 : progress,
        ...(status === 'read' && { finishedAt: new Date() }),
      });
    }
    res.status(200).json(shelfItem);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const getMyLibrary = async (req: Request, res: Response) => {
  const shelves = await shelfModel
    .find({ user: req.user?._id })
    .populate('book', 'title author coverImage')
    .sort('-dateAdded');
  res.json(shelves);
};
