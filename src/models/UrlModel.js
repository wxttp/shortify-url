import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 24 * 7
  }
});

const UrlSchema = mongoose.model('url', urlSchema);

export { UrlSchema };