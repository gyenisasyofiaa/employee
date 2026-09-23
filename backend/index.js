import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import KaryawanRoute from "./routes/KaryawanRoute.js";
import { json } from "sequelize";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(KaryawanRoute);

app.listen(5000, ()=> console.log('Server up and Running'));