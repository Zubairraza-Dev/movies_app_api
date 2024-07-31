import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//routes import
import userRouter from "./routes/users/user.routes.js";
import moviesRouter from "./routes/movies/movies.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";

//middlewares import
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/movies", moviesRouter);

app.use(errorHandler);

export { app };
