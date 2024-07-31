import Movie from "../../models/movies.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createMovie = asyncHandler(async (req, res) => {
  const { title, publishingYear, poster } = req.body;
  if (!title && !publishingYear) {
    throw new ApiError(400, "All fields are required");
  }
  const movie = new Movie({
    title,
    publishingYear,
    poster,
  });
  await movie.save();
  return res
    .status(201)
    .json(new ApiResponse(200, movie, "Movie created successfully"));
});

const getAll = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;

  const totalCount = await Movie.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const task = await Movie.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();
  const meta = {
    totalCount,
    page,
    pageSize,
    totalPages,
    lastPage: page === totalPages,
  };

  const sendRes = {
    data: task,
    meta,
  };

  return res.status(201).json(new ApiResponse(200, sendRes, ""));
});

const getSingle = asyncHandler(async (req, res) => {
  const Id = req.params.id;
  const response = await Movie.findById(Id);
  if (!response) {
    throw new ApiError(400, "Movie not found");
  }
  return res.status(201).json(new ApiResponse(200, response, ""));
});

const deleteMovie = asyncHandler(async (req, res) => {
  const Id = req.params.id;
  const deleted = await Movie.findOneAndDelete({ _id: Id });
  if (!deleted) {
    throw new ApiError(400, "Movie not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, deleted, "Deleted Successfully"));
});
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, publishingYear } = req.body;
  if (!title && !publishingYear) {
    throw new ApiError(
      400,
      "At least one field (title or publishingYear) is required"
    );
  }
  const updateFields = {};
  if (title) updateFields.title = title;
  if (publishingYear) updateFields.publishingYear = publishingYear;

  if (req.file && req.file.buffer) {
    updateFields.poster = req.file.buffer;
  }

  const movie = await Movie.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, movie, "Movie updated successfully"));
});
export { createMovie, getAll, getSingle, deleteMovie, updateMovie };
