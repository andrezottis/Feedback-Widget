import express from "express";
import { routes } from "./routes";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {  //change made to allow railway app usage.
  console.log("HTTP Server running.");
});
