import express from "express";
import cors from "cors";
import loanRoute from "./routes/loanRoute.js";
import { json } from "sequelize";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(loanRoute);

app.listen(5000, ()=> console.log('Server up and Running'));