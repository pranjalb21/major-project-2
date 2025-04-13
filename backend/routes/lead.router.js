import leadSchema from "../utils/validators/lead.schema.js";
import Lead from "../models/lead.models.js";
import SalesAgent from "../models/salesAgent.models.js";
import express from "express";

export const router = express.Router();

// POST endpoints
router.post("/", async (req, res) => {
    try {
        // Validate request body using Zod schema
        const parsedData = leadSchema.parse(req.body);

        // Check if salesAgent exists in the database
        const existingSalesAgent = await SalesAgent.findById(
            parsedData.salesAgent
        );
        if (!existingSalesAgent) {
            return res.status(404).json({
                error: "Sales agent with the provided ID not found.",
            });
        }

        // Create a new lead
        const createdLead = await Lead.create(parsedData);

        // Check if Lead creation failed
        if (!createdLead) {
            return res.status(400).json({ error: "Unable to post lead info." });
        }

        // Populate salesAgent details in the new lead
        const newLead = await createdLead.populate({
            path: "salesAgent",
            select: "_id name",
        });

        // Respond with the newly created lead
        res.status(201).json({ message: "New Lead created.", data: newLead });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = error.errors.map((e) => e.message);
            // Handle validation errors from Zod
            return res.status(400).json({ errors: message });
        }
        console.error("Error in POST /:", error); // Useful for debugging
        res.status(500).json({
            error: "Unable to perform this action right now.",
            details: error.message,
        });
    }
});
