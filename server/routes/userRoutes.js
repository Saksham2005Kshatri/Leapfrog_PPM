import express from "express";

import multer from "multer";
import auth from "../auth.js";
import { storage } from "../cloudinary/index.js";
import userController from "../controllers/userController.js";
import adminController from "../controllers/adminController.js";

const upload = multer({ storage });

const router = express.Router();

router.get("/", userController.getUsers);

router
  .route("/user/:id")
  .delete(userController.deleteUser)
  .get(userController.getUserById);

router.post(
  "/register",
  upload.single("profilePicture"),
  (req, res, next) => {
    const imagePath = req.file.path;
    console.log("Image path: " + imagePath);
    res.locals.imagePath = imagePath; // Pass imagePath to the response.locals object
    next();
  },
  userController.register
);

// router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.put(
  "/user/:id/edit",
  auth,
  upload.single("profilePicture"), // Then, handle the file upload if needed
  userController.updateUser
);

router.get("/admins", adminController.getAdmins);
router.get("/admin/:id", adminController.getAdminById);
router.post("/signup", adminController.signup);
router.post("/signin", adminController.signin);

export default router;
