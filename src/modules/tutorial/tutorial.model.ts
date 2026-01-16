import { model, Schema } from 'mongoose';
export interface ITutorial {
  title: string;
  youtubeUrl: string;
  thumbnail?: string;
}

const tutorialSchema = new Schema<ITutorial>(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    thumbnail: { type: String },
  },
  { timestamps: true },
);

export default model<ITutorial>('Tutorial', tutorialSchema);