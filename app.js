import express from "express"

const app= express()

app.use(express.json());

app.get("/health", (req, res) =>{
res.json({status:"ok", service:"Media Query logger"});
});

export default app;