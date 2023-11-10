import Admin from "../db/adminModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const getAdmins = async (request, response) => {
  const admins = await Admin.find({});
  response.json(admins);
};

const getAdminById = async (request, response) => {
  const admin = await Admin.findById(request.params.id);
  response.json(admin);
};

const signup = async (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const admin = new Admin({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
      });
      console.log(admin);
      admin
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          if (error.name == "ValidationError") {
            console.error("Validation Error: " + error);
          }
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
      console.log("Error: " + e);
    });
};

const signin = asyncHandler(async (request, response) => {
  Admin.findOne({ email: request.body.email })

    // if email exists
    .then((admin) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, admin.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: admin._id,
              userEmail: admin.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: admin.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

export default { getAdmins, getAdminById, signup, signin };
