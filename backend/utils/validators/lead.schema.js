import { z } from "zod";

// Zod schema for Lead input validation
const leadSchema = z.object({
    name: z
        .string({ required_error: "Name is required." })
        .nonempty("Name is required."),
    source: z
        .string({ required_error: "Source is required." })
        .nonempty("Source is required."),
    salesAgent: z
        .string({ required_error: "Sales agent is required" })
        .nonempty("Sales agent is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid Sales Agent ID."),
    status: z
        .string({ required_error: "Status is required." })
        .nonempty("Status is required."),
    tags: z
        .array(z.string({ required_error: "Tags is required." }))
        .min(1, "Tags must contain at least one item."),
    timeToClose: z
        .number({ required_error: "Time to close is required." })
        .positive("Time to close must be a positive number."),
    priority: z
        .string({ required_error: "Priority is required." })
        .nonempty("Priority is required."),
});

export default leadSchema;
