// src/controllers/reviewController.ts
import { Request, Response } from 'express';
import reviewModel from './review.model';


// Create a new review (user only)
export const createReview = async (req: Request, res: Response) => {
  const { bookId, rating, comment }: { bookId: string; rating: number; comment: string } = req.body;

  try {
    const review = await reviewModel.create({
      book: bookId,
      user: req?.user?.id,
      rating,
      comment,
      approved: false, // pending approval
    });

    res.status(201).json(review);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You already reviewed this book' });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// Approve a review (admin only)
export const approveReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const review = await reviewModel.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// Optional: Delete review (admin)
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const review = await reviewModel.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};