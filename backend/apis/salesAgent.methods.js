import { z } from "zod";
import SalesAgent from "../models/salesAgent.models.js";
import salesAgentSchema from "../utils/validators/salesAgent.schema.js";

export const createSalesAgent = async (req, res) => {
    try {
        const parsedData = salesAgentSchema.parse(req.body);
        const existingSalesAgent = await SalesAgent.findOne({
            email: parsedData.email,
        });
        if (existingSalesAgent) {
            return res.status(400).json({
                error: "Sales agent with email 'john@example.com' already exists.",
            });
        }
        const newSalesAgent = new SalesAgent(parsedData);
        await newSalesAgent.save();
        res.status(201).json({
            message: "Sales Agent created successfully.",
            data: newSalesAgent,
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

export const getSalesAgents = async (req, res) => {
    try {
        const salesAgents = await SalesAgent.find();
        if (!salesAgents.length) {
            return res.status(404).json({ error: "No sales agents found." });
        }
        res.status(200).json({
            message: "Sales Agents fetched successfully.",
            data: salesAgents,
        });
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};

export const getSalesAgentById = async (req, res) => {
    try {
        const { id } = req.params;
        const salesAgent = await SalesAgent.findById(id);
        if (!salesAgent) {
            return res.status(404).json({ error: "Sales agent not found." });
        }
        res.status(200).json({
            message: "Sales Agent fetched successfully.",
            data: salesAgent,
        });
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};

export const updateSalesAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const parsedData = salesAgentSchema.parse(req.body);
        const updatedSalesAgent = await SalesAgent.findByIdAndUpdate(
            id,
            parsedData,
            { new: true }
        );
        if (!updatedSalesAgent) {
            return res.status(404).json({ error: "Sales agent not found." });
        }
        res.status(200).json({
            message: "Sales Agent updated successfully.",
            data: updatedSalesAgent,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = error.errors.map((e) => e.message);
            // Handle validation errors from Zod
            return res.status(400).json({ errors: message });
        }
        console.error("Error in PUT /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};
