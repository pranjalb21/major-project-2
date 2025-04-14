import Lead from "../models/lead.models.js";

export const getLeadsClosedLastWeek = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const leads = await Lead.find({
            status: "Closed",
            closedAt: { $gte: sevenDaysAgo },
        }).populate({
            path: "salesAgent",
            select: "name -_id",
        });

        if (!leads.length) {
            return res
                .status(404)
                .json({ message: "No leads closed last week found." });
        }

        res.status(200).json({
            message: "Leads closed last week fetched successfully.",
            data: leads,
        });
    } catch (error) {
        console.error("Error in GET /last-week:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const getLeadsPipeline = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments({
            status: { $ne: "Closed" },
        });
        res.status(200).json({
            message: "Total leads in the pipeline fetched successfully.",
            totalLeadsInPipeline: totalLeads,
        });
    } catch (error) {
        console.error("Error in GET /pipeline:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
