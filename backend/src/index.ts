import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel, contentModel } from "./db";
import { JWT_SECRET, connectionDB } from "./config";
import { authMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

declare global {
  namespace Express {
    interface Request {
      userId: string;
      headers: {
        token: string;
      };
    }
  }
}

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  await userModel.create({
    username,
    password,
  });

  res.json({
    message: "Successfully signe up",
  });
});

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await userModel.findOne({
    username,
    password,
  });

  if (!foundUser) {
    res.json({
      message: "Invalid credentials",
    });
    return;
  }

  const token = jwt.sign({ id: foundUser._id }, JWT_SECRET);
  res.json({
    token,
  });
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { link, title, type, tags } = req.body;
  const foundUser = await userModel.findOne({ _id: userId });

  if (!foundUser) {
    res.json({
      message: "User not found",
    });
    return;
  }

  const content = await contentModel.create({
    userId,
    link,
    title,
    type,
    tags,
  });

  res.json({
    message: "Content addded sucessfully",
    content,
  });
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const foundUser = await userModel.findOne({ _id: userId });

  if (!foundUser) {
    res.json({
      message: "User not found",
    });
    return;
  }

  const content = await contentModel
    .find({
      userId: userId,
    })
    .populate("userId", "username");

  res.json({
    content,
  });
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const contentId = req.body.contentId;
  const foundUser = await userModel.findOne({ _id: userId });
  if (!foundUser) {
    res.json({
      message: "user not found",
    });
    return;
  }

  await contentModel.deleteOne({ _id: contentId });

  res.json({
    message: "Content removed successfully",
  });
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const share = req.body.share;
  const userId = req.userId;
  const foundUser = await userModel.findOne({ _id: userId });

  if (!foundUser) {
    res.json({
      message: "user not found",
    });
    return;
  }

  if (share) {
    res.json({
      link: `/api/v1/content/${foundUser._id}`,
    });
  }
});

app.get("/api/v1/brain", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const sharLinkId = req.query.id;

  const foundUser = await userModel.findOne({ _id: userId });

  if (!foundUser) {
    res.json({
      message: "user not found",
    });
    return;
  }

  const content = await contentModel
    .find({ userId: sharLinkId })
    .populate("userId", "username");
  if (!content) {
    res.json({
      message: "No content found",
    });
  } else {
    res.json({
      content,
    });
  }
});

app.listen(3000, async () => {
  await mongoose.connect(connectionDB);
  console.log("sucessfully connected to the db");
});
