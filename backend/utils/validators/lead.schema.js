import { z } from "zod";

// Zod schema for Lead input validation
const leadSchema = z.object({
    name: z.string().nonempty("Name is required."),
    source: z.string().nonempty("Source is required."),
    salesAgent: z
        .string()
        .nonempty("Sales agent is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid Sales Agent ID."),
    status: z.string().nonempty("Status is required."),
    tags: z.array(z.string()).min(1, "Tags must contain at least one item."),
    timeToClose: z
        .number()
        .positive("Time to close must be a positive number."),
    priority: z.string().nonempty("Priority is required."),
});

export default leadSchema;
