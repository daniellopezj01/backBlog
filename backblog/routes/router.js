var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function(app) {
    app.use(body_parser.urlencoded({ extended: true }));

    //REALIZA LA CONEXION Y LA INSERCION DE DATOS EN MONGO 
    // db.connectDB();
    /*
        app.get('/dayWeek', db.dayWeek);
        app.get('/numVechicle', db.numVechicle);
        app.get('/countyName', db.countyName);
        app.get('/PoliceReport', db.PoliceReport);
        app.get('/month', db.month);
         */
}