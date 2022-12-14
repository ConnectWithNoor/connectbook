import { ErrorHandler } from '../middleware/errorHandler.js';
import PostModel from '../model/PostModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// create new Post
export const createPost = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { description, image } = req.body;
  const validImg = image.match(/\.(jpg|jpeg|png)$/);

  if (!description || !validImg)
    return next(
      new ErrorResponse(
        'Not able to create a post, Plesse insert an image and a desc',
        400
      )
    );

  const newPost = new PostModel({ userId, description, image });

  try {
    await newPost.save();
    await newPost.populate('userId');
    res.status(201).json([newPost]);
  } catch (error) {
    console.error(
      `Error: File: PostController, func: createPost, line: 18`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// Get a post by id
export const getPostById = async (req, res, next) => {
  const { id: postId } = req.params;
  try {
    const post = await PostModel.findById(postId);

    if (!post)
      return next(new ErrorResponse('No post founds. Invalid post id', 404));

    return res.status(200).json(post);
  } catch (error) {
    console.error(
      `Error: File: PostController, func: getPostById, line: 38`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// update a post by id
export const updatePostById = async (req, res, next) => {
  const { id: postId } = req.params;
  const allowedOptions = ['description', 'image'];
  const updates = Object.keys(req.body);
  const userId = req.user._id.toString();

  try {
    const post = await PostModel.findOne({ _id: postId, userId });
    if (!post)
      return next(new ErrorResponse('No post found. Invalid post id', 404));

    updates.forEach((update) => {
      if (allowedOptions.includes(update)) {
        post[update] = req.body[update];
      }
    });

    await post.save();
    return res.status(200).json({ status: true, message: 'Post is updated' });
  } catch (error) {
    console.error(
      `Error: File: PostController, func: updatePostById, line: 61`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// delete a post by id
export const deletePostById = async (req, res, next) => {
  const { id: postId } = req.params;
  const userId = req.user._id.toString();

  try {
    const post = await PostModel.findOne({ _id: postId, userId });
    if (!post)
      return next(new ErrorResponse('No post founds. Invalid post id', 404));

    await post.remove();

    return res
      .status(200)
      .json({ status: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(
      `Error: File: PostController, func: deletePostById, line: 101`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// like/dislike a post by Id
export const likeOrDislikePostById = async (req, res, next) => {
  const { id: postId } = req.params;
  const userId = req.user._id.toString();

  try {
    const post = await PostModel.findById(postId);

    if (!post)
      return next(new ErrorResponse('Not post found. Invalid post id', 404));

    if (!post.likes.includes(userId)) {
      //   if post isn't liked by the user. Like it
      post.likes = post.likes.concat(userId);
      await post.save();
      await post.populate('userId');
      return res
        .status(201)
        .json({ status: true, message: 'Post liked added', post });
    } else {
      //   if post is already liked by the user. Unlike it
      post.likes = post.likes.filter((id) => id === userId);
      await post.save();
      await post.populate('userId');
      return res
        .status(201)
        .json({ status: true, message: 'Post liked removed', post });
    }
  } catch (error) {
    console.error(
      `Error: File: PostController, func: likeOrDislikePostById, line: 138`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// get timelime posts
export const getTimelinePosts = async (req, res, next) => {
  const user = req.user;

  try {
    const userIdsSet = new Set([]);
    userIdsSet.add(user._id.toString());

    user.following.forEach((id) => userIdsSet.add(id.toString()));
    const userIdsArray = Array.from(userIdsSet);

    const allPosts = await PostModel.find({ userId: userIdsArray })
      .populate('userId', 'username firstName lastName _id profilePicture')
      .sort({ createdAt: -1 });

    return res.status(200).json(allPosts);

    // by using aggregation pipeline

    // const currentUserPosts = await PostModel.find({ userId });
    // const postsByFollowings = await UserModel.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'posts',
    //       localField: 'following',
    //       foreignField: 'userId',
    //       as: 'postsByFollowings',
    //     },
    //   },
    //   {
    //     $project: {
    //       postsByFollowings: 1,
    //       _id: 0,
    //     },
    //   },
    // ]);
    // return res
    //   .status(200)
    //   .json([...currentUserPosts, ...postsByFollowings[0].postsByFollowings]);
  } catch (error) {
    console.error(
      `Error: File: PostController, func: getTimelinePosts, line: 172`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};
