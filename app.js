import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysis.routes.js"
import { rateLimit } from "express-rate-limit";

const app = express();

const analysisLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,                // 10 analysis requests per IP
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        error: "Too many analysis requests. Please try again after 15 minutes."
    }
});

app.use(cors());
app.use(express.json());
app.use("/api", analysisLimiter, analysisRoutes);

app.get("/", (req, res) => {
    res.send("CP Analyzer Backend Running");
});

export default app;