import express, { type Request, type Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 200,
    message: "API is running",
  });
});

export default app;
