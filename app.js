import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysis.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", analysisRoutes);

app.get("/", (req, res) => {
    res.send("CP Analyzer Backend Running");
});

export default app;