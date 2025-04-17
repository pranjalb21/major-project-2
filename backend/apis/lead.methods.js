import leadSchema from "../utils/validators/lead.schema.js";
import Lead from "../models/lead.models.js";
import SalesAgent from "../models/salesAgent.models.js";
import mongoose from "mongoose";
import { z } from "zod";

export const createLead = async (req, res) => {
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

        res.status(201).json({
            message: "New Lead created.",
            data: newLead,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = error.errors.map((e) => e.message);
            // Handle validation errors from Zod
            return res.status(400).json({ errors: message });
        }
        console.error("Error in POST /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};

export const getLeads = async (req, res) => {
    try {
        const { salesAgent, status, tags, source } = req.query;
        let query = {};

        if (salesAgent) {
            if (!mongoose.isValidObjectId(salesAgent)) {
                return res.status(400).json({ error: "Invalid Lead ID." });
            }
            query.salesAgent = salesAgent;
        }

        if (status) {
            if (status !== "All") {
                query.status = status;
            } else {
                query.status = { $ne: "Closed" };
            }
        } else {
            query.status = { $ne: "Closed" };
        }

        if (tags) {
            query.tags = { $in: tags };
        }

        if (source) {
            query.source = source;
        }

        const agents = await Lead.find(query).populate("salesAgent");

        // Return the list of agents.
        return res.status(200).json({ data: agents });
    } catch (error) {
        // Log the error for debugging.
        console.error("Error in GET /:", error);

        // Return a 500 error if a server error occurs.
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const updateLead = async (req, res) => {
    try {
        // Validate request body using Zod schema
        const parsedData = leadSchema.parse(req.body);
        const { id } = req.params;

        const existingUser = await Lead.findById(id);
        if (!existingUser) {
            return res
                .status(404)
                .json({ error: "Lead with the provided ID not found." });
        }

        // Check if salesAgent exists in the database
        const existingSalesAgent = await SalesAgent.findById(
            parsedData.salesAgent
        );
        if (!existingSalesAgent) {
            return res.status(404).json({
                error: "Sales agent with the provided ID not found.",
            });
        }

        if (parsedData.status === "Closed") {
            parsedData.closedAt = new Date();
        }
        // Update lead
        const updatedLead = await Lead.findByIdAndUpdate(id, parsedData, {
            new: true,
        });

        // Check if Lead is updated
        if (!updatedLead) {
            return res.status(400).json({ error: "Unable to post lead info." });
        }

        // Populate salesAgent details in the updated lead
        const newLead = await updatedLead.populate({
            path: "salesAgent",
            select: "_id name",
        });

        res.status(200).json({
            message: "Lead info updated.",
            data: newLead,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error.errors);

            const message = error.errors.map((e) => e.message);
            // Handle validation errors from Zod
            return res.status(400).json({ errors: message });
        }
        console.error("Error in POST /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLead = await Lead.findByIdAndDelete(id);

        // Check if Lead is deleted
        if (!deletedLead) {
            return res.status(404).json({
                error: "Lead with the provided ID not found.",
            });
        }

        res.status(200).json({
            message: "Lead deleted.",
            data: deletedLead,
        });
    } catch (error) {
        console.error("Error in DELETE /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};

export const getLeadStatusCount = async (req, res) => {
    try {
        // ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"
        const newLeads = await Lead.countDocuments({ status: "New" });
        const contactedLeads = await Lead.countDocuments({
            status: "Contacted",
        });
        const qualifiedLeads = await Lead.countDocuments({
            status: "Qualified",
        });
        const proposalSentLeads = await Lead.countDocuments({
            status: "Proposal Sent",
        });
        const closedLeads = await Lead.countDocuments({ status: "Closed" });
        res.status(200).json({
            message: "Lead status count fetched.",
            data: {
                newLeads,
                contactedLeads,
                qualifiedLeads,
                proposalSentLeads,
                closedLeads,
            },
        });
    } catch (error) {
        console.error("Error in GET /lead-status-count:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};
