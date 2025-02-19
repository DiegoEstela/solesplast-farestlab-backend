import { Router } from "express";
import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customersController";

const router = Router();

router.get("/", getCustomers);
router.post("/", addCustomer);
router.delete("/:id", deleteCustomer);
router.put("/:id", updateCustomer);

export default router;
