import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";

export async function addUserToCollection(req: Request, res: Response, next: NextFunction) {
  const payload = req.body;
  let usr = new UserModel(payload);
  usr.save().catch((err) => res.send(err));
  res.status(200).send()
}