import { z } from "zod";
import Lead from "../models/lead.models.js";
import comentSchema from "../utils/validators/comment.schema.js";
import Comment from "../models/comment.models.js";

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const parsedData = comentSchema.parse(req.body);
        const leadData = await Lead.findById(id);
        if (!leadData) {
            return res.status(404).json({ message: "Lead not found." });
        }

        const comment = await Comment.create({
            commentText: parsedData.commentText,
            lead: leadData._id,
            author: leadData.salesAgent,
        });
        await comment.populate({
            path: "author",
            select: "name -_id",
        });
        const addedComment = {
            author: comment.author.name,
            commentText: comment.commentText,
            _id: comment._id,
            createdAt: comment.createdAt,
        };
        res.status(201).json({
            message: "Comment added successfully",
            data: addedComment,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = error.errors.map((e) => e.message);
            // Handle validation errors from Zod
            console.log(error.errors);

            return res.status(400).json({ errors: message });
        }
        console.error("Error in POST /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const leadData = await Lead.findById(id);
        if (!leadData) {
            return res.status(404).json({ message: "Lead not found." });
        }
        const comments = await Comment.find({ lead: leadData._id }).populate({
            path: "author",
            select: "name -_id",
        });
        if (!comments.length) {
            return res.status(404).json({ message: "No comments found." });
        }
        let commentsData = comments.map((comment) => ({
            author: comment.author.name,
            commentText: comment.commentText,
            _id: comment._id,
            createdAt: comment.createdAt,
        }));
        res.status(200).json({
            message: "Comments fetched successfully.",
            data: commentsData,
        });
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message,
        });
    }
};
