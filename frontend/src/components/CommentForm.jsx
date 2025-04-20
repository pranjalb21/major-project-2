import React, { useState } from "react";
import useLead from "../contexts/Lead.context";

export default function CommentForm() {
    const [comment, setComment] = useState({
        commentText: "",
    });
    const [error, setError] = useState("");
    const { selectedLead, addComment } = useLead();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!comment.commentText.trim()) {
            setError("Comment cannot be empty.");
        } else {
            await addComment(selectedLead?._id, comment);
            setComment({
                commentText: "",
            }); // Clear the textarea after submission
            setError("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-2">
                <textarea
                    value={comment.commentText}
                    onChange={(e) =>
                        setComment({ [e.target.name]: e.target.value })
                    }
                    placeholder="Write your comment here..."
                    rows="4"
                    cols="50"
                    className="form-control mt-3"
                    name="commentText"
                />
                {error && (
                    <p className="text-danger">
                        * <small>{error}</small>
                    </p>
                )}
            </div>
            <button className="btn btn-sm btn-primary mt-">Submit</button>
        </form>
    );
}
