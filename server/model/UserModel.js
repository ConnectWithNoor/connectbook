import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import PostModel from './PostModel.js';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [7, 'password must be greater than 6 characters'],
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('password cannot contain "password"');
        }
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    about: {
      type: String,
      minlength: [10, 'Please write more about yourself'],
      default: 'I am an interesting person',
    },
    livesIn: {
      type: String,
      default: 'My land',
    },
    worksAt: {
      type: String,
      default: 'My Workplace',
    },
    country: {
      type: String,
      default: 'United States',
    },
    relationshipStatus: {
      type: String,
      default: 'relationshipStatus',
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'user',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'user',
      },
    ],
    tokens: [
      {
        accessToken: {
          type: String,
          required: true,
        },
        refreshToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// UserSchema.set('toJSON', {
//     virtuals: true
// })

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;
  delete userObj.isAdmin;
  delete userObj.createdAt;
  delete userObj.updatedAt;
  delete userObj.__v;

  return userObj;
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

UserSchema.pre('remove', async function (next) {
  const user = this;
  await PostModel.deleteMany({ userId: user._id });
  next();
});

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await userModel.findOne({ username });
  if (!user) throw new Error('Invalid Credentials');

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) throw new Error('Invalid Credentials');

  return user;
};

UserSchema.methods.generateAccessToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    }
  );
  return token;
};

UserSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    }
  );
  return token;
};

const userModel = mongoose.model('user', UserSchema);

export default userModel;
