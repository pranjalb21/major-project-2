import dotenv from "dotenv";
dotenv.config();
import initializeDB from "./utils/db/db.connect.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

import { router as leadRouter } from "./routes/lead.router.js";
import { router as salesAgentRouter } from "./routes/salesAgent.router.js";
import { router as reportRouter } from "./routes/report.router.js";

app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/agents", salesAgentRouter);
app.use("/api/v1/reports", reportRouter);

app.get("/", (_, res) => res.status(200).json({ message: "Major Project 2" }));
initializeDB();
app.listen(PORT, () => {
    console.log(`Server running on Port:`, PORT);
});
