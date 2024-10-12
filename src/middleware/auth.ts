import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../models";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

type customRequest = Request & { user?: any };

export const isAuthenticated = async (req:customRequest, res:Response, next:Function) => {
    try {
      if (
        req.headers.authorization?.startsWith("Bearer")
      ) {
        const token =
          req.headers.authorization.split(" ")[1]
        if (token) {
            jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded:any) => {
              if (err) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                  message: "Token expired.Login Again",
                });
              }
              let authenticatedUser = await db.user.findById(
                decoded._id
              ).lean();
  
  
              if (!authenticatedUser) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                  message: "You are not authorized to access this route",
                  success: false,
                });
              }
              req.user = authenticatedUser;
              next();
            }
          );
        } else {
          res.status(403).json({
            message: "token is not present in headers",
          });
        }
      } else {
        res.status(403).json({
          message: "headers does not have a bearer token",
        });
      }
    } catch (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired.Login Again');
    }
  };