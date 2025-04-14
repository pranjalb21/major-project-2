import { z } from "zod";

const comentSchema = z.object({
    commentText: z
        .string({ required_error: "Comment is required." })
        .nonempty("Comment is required.")
});

export default comentSchema;
