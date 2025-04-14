import { z } from "zod";

const salesAgentSchema = z.object({
    name: z
        .string({ required_error: "Name is required." })
        .nonempty("Name is required."),
    email: z
        .string({ required_error: "Email is required." })
        .nonempty("Email is required.")
        .email("Invalid input: 'Email' must be a valid email address."),
});

export default salesAgentSchema;
