import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    description: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'user',
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

const postModel = mongoose.model('post', postSchema);

export default postModel;
