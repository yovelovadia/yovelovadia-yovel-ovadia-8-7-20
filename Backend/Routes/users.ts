import express, { Request, Response, NextFunction } from "express";
import userSchema from "../Schemas/users";
import * as joi from "@hapi/joi";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { NewUser, jsonRes } from "../types";

dotenv.config();

const Router = express.Router();

const signUpSchema: joi.ObjectSchema<NewUser> = joi.object({
  // checks given data and returns answer based on missing/wrong parts
  name: joi.string().required().min(2),
  email: joi.string().email().required(),
  password: joi.string().min(8).required().alphanum(),
  admin: joi.boolean().required(),
});

// sign up user using hapi joi for error response and hashing password for extra security
Router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const emailExists: NewUser | null = await userSchema.findOne({
        email: req.body.email,
      });
      if (emailExists) {
        return res.status(422).json({ error: "User already exists" }); // check for existing email
      }

      const validation: joi.ValidationResult = signUpSchema.validate(req.body); // check for joi error validation and res based on that if needed
      if (validation.error) {
        return res
          .status(400)
          .json({ error: validation.error.details[0].message });
      }

      bcrypt.hash(req.body.password, 10, (error, hash) => {
        // hashing password
        if (error) {
          return res.status(500).json({ error });
        } else {
          const user = new userSchema({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            admin: req.body.admin,
          });
          user
            .save()
            .then(() => res.status(200).json({ message: "New user created" }));
        }
      });
    } catch (error) {
      () => {
        res.status(500).json({ error });
      };
    }
  }
);

// login post comparing hash password
Router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchema.findOne({ email: req.body.email }).then((user: any) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Wrong email or password nigger" });
      } else {
        bcrypt.compare(req.body.password, user.password, (error, hash) => {
          if (error) {
            return res.status(500).json({ error: "Error occured try again" });
          }
          if (hash) {
            const secret: any = process.env.JWT_KEY;
            const token: string = jwt.sign(
              {
                email: user.email,
                userId: user._id,
                admin: user.admin,
              },
              secret,
              { expiresIn: "2h" }
            );

            return res.status(200).json({
              message: "Logged in",
              token,
            });
          }
          res.status(401).json({ error: "Wrong email or password" });
        });
      }
    });
  } catch (error) {
    () => {
      res.status(500).json({ error: "Error occured try again" });
    };
  }
});

module.exports = Router;
