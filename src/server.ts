import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customersRoutes from "./routes/customers";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/customers", customersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
