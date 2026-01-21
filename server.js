import app from "./app.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000
if (!PORT) {
    console.warn("The Port from .env is not Used")
}

app.listen(
    PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
)