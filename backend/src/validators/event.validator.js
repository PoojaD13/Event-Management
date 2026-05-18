import { body } from "express-validator";

export const eventValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title required"),

  body("description")
    .notEmpty()
    .withMessage("Description required"),

  body("date")
    .notEmpty()
    .withMessage("Date required"),

  body("building")
    .notEmpty()
    .withMessage("Building required")
];