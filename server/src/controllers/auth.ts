import { Request, Response } from "express";
import { db } from "../connect";
import bcrypt from "bcryptjs";

export const register = (req: Request, res: Response) => {
  // check if username exists

  const q = "SELECT * FROM user WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist!");
    // hashPassword
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO users (`username`,`email`,`password`) VALUE (?)";
    const reqValues = [req.body.username, req.body.email, hashedPassword];
    db.query(q, reqValues, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req: Request, res: Response) => {};

export const logout = (req: Request, res: Response) => {};