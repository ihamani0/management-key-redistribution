// node_module
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// You must insrte the extension if you want import file localy
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import notFoundError from "./utils/notFoundError.js";
import {errorHandler} from "./middleware/errorMiddleware.js"

dotenv.config();

const app = express();

connectDB();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
// 👇 Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

//log
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
  console.log("--- Mode : ---:", process.env.NODE_ENV);
}

// Serve static files from the public directory
app.use(express.static("public"));

// Mount the authentication routes
// app.use("/api/auth", authRoutes);
// You could add other routes here, e.g., app.use('/api/users', userRoutes);


app.all(/(.*)/, (req, res, next) => {

  next(new notFoundError(404, "Ther is No route exsists")); // This forwards the error to your error-handling middleware
});

// Error-handling middleware



// --- Error Handling Middleware ---
// IMPORTANT: Error handler must be the LAST piece of middleware added

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
