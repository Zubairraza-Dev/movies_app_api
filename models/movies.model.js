import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    publishingYear: {
      type: Number,
      required: true,
      min: [1900, "Publishing year must be after 1900"],
      max: [
        new Date().getFullYear(),
        "Publishing year cannot be in the future",
      ],
    },
    poster: {
      //   type: Buffer,
      type: String, // URL
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
