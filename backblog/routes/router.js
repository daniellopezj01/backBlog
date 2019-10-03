var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function(app) {
    app.use(body_parser.urlencoded({ extended: true }));

    //REALIZA LA CONEXION Y LA INSERCION DE DATOS EN MONGO 
    // db.connectDB();

    //*************SOLICITUDES GET******************
    app.get('/person', db.getperson);
    app.get('/blogs', db.getblogs);
    app.get('/comments', db.getcomments);
    app.get('/publications', db.getpublications);

    //*************SOLICITUDES POST******************
    app.post('/person', db.postPerson);
    app.post('/blogs', db.postBlogs);
    app.post('/comments', db.postComments);
    app.post('/publications', db.postPublications);


    //*************SOLICITUDES REMOVE******************
    app.delete('/person', db.removePerson);
    app.delete('/blogs', db.removeBlogs);
    app.delete('/comments', db.removeComments);
    app.delete('/publications', db.removePublications);

    //*************SOLICITUDES REMOVE******************
    app.put('/person', db.UpdatePerson);


    /*    app.get('/numVechicle', db.numVechicle);
        app.get('/countyName', db.countyName);
        app.get('/PoliceReport', db.PoliceReport);
        app.get('/month', db.month);
         */
}