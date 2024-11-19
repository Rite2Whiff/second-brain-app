import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const Content = new Schema({
  link: { type: String, require: true },
  title: { type: String, require: true },
  type: { type: String, require: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", require: true },
  tags: [{ type: String, ref: "tags" }],
});

const Tags = new Schema({
  title: { type: String, require: true },
});

const Links = new Schema({
  hash: { type: String, require: true },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

export const userModel = mongoose.model("user", User);
export const contentModel = mongoose.model("content", Content);
export const tagsModel = mongoose.model("tags", Tags);
export const linksModel = mongoose.model("links", Links);
