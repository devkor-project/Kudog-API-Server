import express, { Request, Response, Router } from "express";

const router = express.Router();

/**
 * server health check
 */
router.get("/", (req: Request, res: Response) => {
  res.send(
    "<h1>Devkor project app</h1> <h4>Message: Server is alive</h4> <p>Version 1.0</p>"
  );
});

module.exports = router;
