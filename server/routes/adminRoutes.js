import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

router.route("/admins", (req, res) => {
  adminController.getAdmins(req, res);
});

router.route("/admin/:id", (req, res) => {
  adminController.getAdminById(req, res);
});

router.post("/signup", (req, res) => {
  console.log("Entering /signup route");
  adminController.signup(req, res);
});

router.post("/signin", (req, res) => {
  adminController.signin(req, res);
});

export default router;
