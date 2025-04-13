import { z } from "zod";

const salesAgentSchema = z.object({
    name: z.string().nonempty("Name is required."),
    email: z
        .string()
        .nonempty("Email is required.")
        .email("Invalid input: 'Email' must be a valid email address."),
})
export default salesAgentSchema;