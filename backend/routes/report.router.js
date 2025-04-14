import express from "express";
import {
    getLeadsClosedLastWeek,
    getLeadsPipeline,
} from "../apis/report.methods.js";
export const router = express.Router();

router
    .get("/last-week", getLeadsClosedLastWeek)
    .get("/pipeline", getLeadsPipeline);
