import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
