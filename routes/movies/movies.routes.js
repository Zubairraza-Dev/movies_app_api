import { Router } from "express";

// import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  createMovie,
  getAll,
  getSingle,
  deleteMovie,
  updateMovie,
} from "../../controllers/movies/movies.controller.js";

const router = Router();

// Route to create a new movie
router.post("/", createMovie);

// Route to get all movies
router.get("/", getAll);

// Route to get a single movie by ID
router.get("/:id", getSingle);

// Route to update a movie by ID
router.patch("/:id", updateMovie);

// Route to delete a movie by ID
router.delete("/:id", deleteMovie);

export default router;
