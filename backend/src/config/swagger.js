import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Smart Event Platform API",
      version: "1.0.0",
      description: "Conference management backend API"
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1"
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
