import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const issignedin = (req: Request, res: Response, next: NextFunction): void  => {
    // Check if the token exists in cookies
    const token = req.cookies.jwt;
  
    if (!token) {
        res.status(401).json({
        message: "Unauthorized: No token provided",
      });
      return;
    }
  
    // Check if JWT_SECRET is configured
    const secret = process.env.JWT_SECRET;
    if (!secret) {
       res.status(500).json({
        message: "Internal Server Error: JWT_SECRET is not configured",
      });
      return;
    }
  
    try {
      // Verify the JWT and decode its payload
      const decoded = jwt.verify(token, secret) as { Id: string };
  
      // Attach the decoded user ID to the request object
      // @ts-ignore
      req.userId = decoded.Id;
  
      // Proceed to the next middleware
      next();
    } catch (error) {
      // Handle invalid or expired token
        res.status(403).json({
        message: "Forbidden: Invalid or expired token",
      });
      return;
    }
  };
  
  export default issignedin;
  
