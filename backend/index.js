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

app.use("/api/v1/leads", leadRouter);

initializeDB();
app.listen(PORT, () => {
    console.log(`Server running on Port:`, PORT);
});
