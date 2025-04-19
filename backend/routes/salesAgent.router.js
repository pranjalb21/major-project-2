import express from "express";
import { createSalesAgent, getSalesAgentById, getSalesAgents, updateSalesAgent } from "../apis/salesAgent.methods.js";

export const router = express.Router();

router
    .get("/", getSalesAgents)
    .get("/:id", getSalesAgentById)
    .post("/", createSalesAgent)
    .put("/:id", updateSalesAgent);
