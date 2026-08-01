const express = require("express");
const positionRoutes = require("./routes/position.routes");
const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/positions', positionRoutes);
app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT), () => {
    console.log(`Server running port ${POrt}`);
};