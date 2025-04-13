import express from "express";
import {
    createLead,
    deleteLead,
    getLeads,
    updateLead,
} from "../apis/lead.methods.js";

export const router = express.Router();

// POST endpoints
router
    .post("/", createLead)
    .get("/", getLeads)
    .put("/:id", updateLead)
    .delete("/:id", deleteLead);
