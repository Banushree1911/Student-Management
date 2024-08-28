require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const departmentRoutes = require('./routes/departmentsRoutes');
const studentRoutes = require('./routes/studensRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());

db();
app.use('/departments', departmentRoutes);
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3010;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
});
