const express = require("express");
const healthRouter = express.Router();
const { db } = require("../config/db");
const { HTTP_RESPONSE_STATUS_CODES } = require("../utils/httpResponseStatusCode");

healthRouter.get("/health", async (req, res) => {
  try {
    await db.authenticate();
    res.status(HTTP_RESPONSE_STATUS_CODES.ok).json({
      status: "ok",
      database: "up",
    });
  } catch (error) {
    res.status(HTTP_RESPONSE_STATUS_CODES.service_unavailable).json({
      status: "unhealthy",
      database: "down",
    });
  }
});

module.exports = { healthRouter };
