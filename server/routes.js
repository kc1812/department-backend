const userRoutes = require("./modules/User/routes");
const loginRoutes = require("./modules/Login/route");
const departmentRoutes = require('./modules/Department/routes');
const formRoutes = require('./modules/Form/routes');

module.exports = (app) => {
    app.use('/user', userRoutes);
    app.use('/auth', loginRoutes);
    app.use('/form', formRoutes);
    app.use('/department', departmentRoutes);
};