import { Router } from "express";
import { addPost, deletePost, getPosts, getUserPosts, updatePost } from "../controllers/postsController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

// *** get all post
router.get("/", getPosts);

// *** get user post
router.get("/user", auth, getUserPosts);

// *** create new post
router.post("/", auth, addPost);

// *** delete post
router.delete("/:id", auth, deletePost);

// *** update post
router.put("/:id", auth, updatePost);

export { router as postsRoutes };
