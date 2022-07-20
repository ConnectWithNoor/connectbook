import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'User',
      },
    ],
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model('Post', postSchema);

export default postModel;
