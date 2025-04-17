import express from "express";
import {
    createLead,
    deleteLead,
    getLeads,
    getLeadStatusCount,
    updateLead,
} from "../apis/lead.methods.js";
import { addComment, getComments } from "../apis/comment.methods.js";

export const router = express.Router();

// POST endpoints
router
    .post("/", createLead)
    .get("/", getLeads)
    .put("/:id", updateLead)
    .delete("/:id", deleteLead)
    .post("/:id/comments", addComment)
    .get("/:id/comments", getComments)
    .get("/statuscount", getLeadStatusCount)
