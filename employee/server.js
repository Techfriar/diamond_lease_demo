import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();
const app = express();

const port = process.env.PORT;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Swagger setup
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "DiamondLease Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "DiamondLease",
          url: "https://diamondlease.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/api",
          description: "Local server",
        },
      ],
    },
    apis: ["./controllers/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api/documentation",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
  

app.use('/api', api);


app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(notFound);
app.use(errorHandler);