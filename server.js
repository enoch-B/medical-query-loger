import app from "./app.js";
import dotenv from "dotenv"
import queriesRoute from "./routes/queriesRoute.js";

dotenv.config()

const PORT = process.env.PORT || 3000
if (!PORT) {
    console.warn("The Port from .env is not Used")
}

app.use("/query", queriesRoute);

app.listen(
    PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
)