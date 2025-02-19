import { Request, Response } from "express";
import pool from "../db";

// Obtener clientes
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
};

// Agregar un nuevo cliente
export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, cuil, contactName, contactPhone, address, city } =
      req.body;
    const result = await pool.query(
      "INSERT INTO customers (name, email, cuil, contact_name, contact_phone, address, city) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, email, cuil, contactName, contactPhone, address, city]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creando cliente:", error);
    res.status(500).json({ error: "Error creando cliente" });
  }
};

// Eliminar cliente
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM customers WHERE id = $1", [id]);
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando cliente:", error);
    res.status(500).json({ error: "Error eliminando cliente" });
  }
};

// Actualizar cliente
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query(
      "UPDATE customers SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando cliente:", error);
    res.status(500).json({ error: "Error actualizando cliente" });
  }
};
