import express from "express";
import { routes } from "./routes";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
//change made to allow railway app usage.
app.listen(process.env.PORT || 3333, () => {
  console.log("HTTP Server running.");
});
