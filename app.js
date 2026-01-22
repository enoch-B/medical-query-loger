import express from "express"
import queriesRoute from "./routes/queriesRoute.js";

const app = express()

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "Media Query logger" });
});

app.use("/api", queriesRoute);

//Endpoint logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
});

export default app;