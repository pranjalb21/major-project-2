import express from "express";
import { createSalesAgent, getSalesAgents } from "../apis/salesAgent.methods";

const router = express.Router();

router
    .get("/", getSalesAgents)
    .post("/", createSalesAgent);
export default router;
