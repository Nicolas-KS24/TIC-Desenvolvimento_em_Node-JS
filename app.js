const express = require("express");
const positionRoutes = require("./routes/position.routes");
const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());

app.use('/positions', positionRoutes);
app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);

app.listen(8000);