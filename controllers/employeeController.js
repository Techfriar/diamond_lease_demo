import asyncHandler from "express-async-handler";
import employeeRepository from "../repository/employeeRepository.js";
import employeeResource from "../resources/employeeResource.js";
import employee from "../models/employee.js";
import addEmployeeRequest from "../requests/addEmployeeRequest.js";
import getEmployeeRequest from "../requests/getEmployeeRequest.js";
import updateEmployeeRequest from "../requests/updateEmployeeRequest.js";
import deleteEmployeeRequest from "../requests/deleteEmployeeRequest.js";

const employeeRepo = new employeeRepository();

/**
 * Add employee
 *
 * @swagger
 * /employee/add:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Add New Employee
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: name
 *          description: Enter name
 *          type: string
 *        - in: query
 *          name: email
 *          description: Enter email
 *          type: string
 *        - in: query
 *          name: phone
 *          description: Enter phone
 *          type: string
 *        - in: query
 *          name: status
 *          description: Enter the status(true or false)
 *          type: boolean
 *        - in: query
 *          name: password
 *          description: Enter password
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, status, password } = req.query;
  const employeeRequest = new addEmployeeRequest({
    name,
    email,
    phone,
    status,
    password,
  });

  try {
    const validatedData = employeeRequest.validate();
    const employeeDetails = await employeeRepo.addEmployee(validatedData);

    if (employeeDetails) {
      const employeeData = employeeResource(employeeDetails);
      res.json(employeeData);
    } else {
      res.status(404);
      throw new Error("Unable to add employee");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get employee
 *
 * @swagger
 * /employee/get:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Get Employee
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const getEmployee = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const employeeRequest = new getEmployeeRequest({ _id });

  try {
    const validatedData = await employeeRequest.validate();
    const employeeData = await employeeRepo.getEmployee(validatedData);

    if (employeeData) {
      const employeeDetails = employeeResource(employeeData);
      res.json(employeeDetails);
    } else {
      res.status(404);
      throw new Error("Unable to get employee");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Update employee
 *
 * @swagger
 * /employee/update:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Add New Employee
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *        - in: query
 *          name: name
 *          description: Enter name
 *          type: string
 *        - in: query
 *          name: email
 *          description: Enter email
 *          type: string
 *        - in: query
 *          name: phone
 *          description: Enter phone
 *          type: string
 *        - in: query
 *          name: status
 *          description: Enter the status(true or false)
 *          type: boolean
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const updateEmployee = asyncHandler(async (req, res) => {
  const { _id, name, email, phone, status } = req.query;

  const employeeRequest = new updateEmployeeRequest({
    _id,
    name,
    email,
    phone,
    status,
  });

  try {
    const validatedData = await employeeRequest.validate();

    const updatedEmployee = await employeeRepo.updateEmployee(validatedData);
    if (updatedEmployee) {
      const employeeData = employeeResource(updatedEmployee);
      res.json(employeeData);
    } else {
      res.status(404);
      throw new Error("Employee not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * List employees
 *
 * @swagger
 * /employee/list:
 *   post:
 *     tags:
 *       - Employee
 *     summary: List Employees
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const listEmployees = asyncHandler(async (req, res) => {
  const employees = await employeeRepo.listEmployees();
  if (employees) {
    const employeesData = employees.map((employee) =>
      employeeResource(employee)
    );
    res.json(employeesData);
  } else {
    res.status(404);
    throw new Error("Unable to list employees");
  }
});

/**
 * Delete employee
 *
 * @swagger
 * /employee/delete:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Delete Employee
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: _id
 *          description: Enter id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const deleteEmployee = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const employeeRequest = new deleteEmployeeRequest({ _id });

  try {
    const validatedData = await employeeRequest.validate();
    const deleteEmployee = await employeeRepo.deleteEmployee(validatedData);
    if (deleteEmployee) {
      res.json("Employee deleted successfully");
    } else {
      res.status(404);
      throw new Error("Unable to get employee");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export {
  addEmployee,
  getEmployee,
  updateEmployee,
  listEmployees,
  deleteEmployee,
};
