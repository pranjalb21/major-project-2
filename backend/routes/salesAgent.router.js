import express from "express";
import { createSalesAgent, getSalesAgents } from "../apis/salesAgent.methods.js";

export const router = express.Router();

router
    .get("/", getSalesAgents)
    .post("/", createSalesAgent);
