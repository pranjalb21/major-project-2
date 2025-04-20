import express from "express";
import {
    createLead,
    deleteLead,
    getLeadById,
    getLeads,
    getLeadsByAgentId,
    getLeadStatusCount,
    updateLead,
} from "../apis/lead.methods.js";
import { addComment, getComments } from "../apis/comment.methods.js";

export const router = express.Router();

// POST endpoints
router
    .post("/", createLead)
    .get("/all", getLeads)
    .get("/statuscount", getLeadStatusCount)
    .get("/get/:id", getLeadById)
    .put("/update/:id", updateLead)
    .delete("/:id", deleteLead)
    .post("/:id/comments", addComment)
    .get("/:id/comments", getComments)
    .get("/agent/:id", getLeadsByAgentId);
