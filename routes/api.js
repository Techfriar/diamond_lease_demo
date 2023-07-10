import express from 'express';
const router = express.Router();
import { addEmployee, deleteEmployee, getEmployee, listEmployees, updateEmployee } from '../controllers/employeeController.js';

/**
 * employee routes
 */
router.route("/employee/add").post(addEmployee);
router.route("/employee/get").post(getEmployee);
router.route("/employee/update").post(updateEmployee);
router.route("/employee/list").post(listEmployees);
router.route("/employee/delete").post(deleteEmployee);

export default router;