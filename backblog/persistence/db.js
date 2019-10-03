var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;
/********************** GET *****************************/
exports.getperson = function(req, res) {
    select(req.body, 'persons', (documentos) => {
        res.send(documentos);
    })
}

exports.getblogs = function(req, res) {
    select(req.body, 'blogs', (documentos) => {
        res.send(documentos);
    })
}

exports.getcomments = function(req, res) {
    select(req.body, 'comments', (documentos) => {
        res.send(documentos);
    })
}

exports.getpublications = function(req, res) {
    select(req.body, 'publications', (documentos) => {
        res.send(documentos);
    })
}

/********************** POST *****************************/
exports.postPerson = function(req, res) {
    insert(req.body, 'persons', (documentos) => {
        res.send(documentos);
    });
}

exports.postBlogs = function(req, res) {
    insert(req.body, 'blogs', (documentos) => {
        res.send(documentos);
    });
}

exports.postComments = function(req, res) {
    insert(req.body, 'comments', (documentos) => {
        res.send(documentos);
    });
}

exports.postPublications = function(req, res) {
    insert(req.body, 'publications', (documentos) => {
        res.send(documentos);
    });
}

/********************** REMOVE *****************************/
exports.removePerson = function(req, res) {
    remove(req.body, 'persons', (documentos) => {
        res.send(documentos);
    });
}

exports.removeBlogs = function(req, res) {
    remove(req.body, 'blogs', (documentos) => {
        res.send(documentos);
    });
}

exports.removeComments = function(req, res) {
    remove(req.body, 'comments', (documentos) => {
        res.send(documentos);
    });
}

exports.removePublications = function(req, res) {
    remove(req.body, 'publications', (documentos) => {
        res.send(documentos);
    });
}

/********************** UPDATE *****************************/
exports.UpdatePerson = function(req, res) {
    Update({ "id_person": req.body.id_person }, req.body, 'persons', (documentos) => {
        res.send(documentos);
    });
}

exports.UpdateBlogs = function(req, res) {
    Update({ "id_blog": req.body.id_blog }, req.body, 'blogs', (documentos) => {
        res.send(documentos);
    });
}

exports.UpdateComments = function(req, res) {
    Update({ "id_comment": req.body.id_comment }, req.body, 'comments', (documentos) => {
        res.send(documentos);
    });
}

exports.UpdatePublications = function(req, res) {
    Update({ "id_publication": req.body.id_publication }, req.body, 'publications', (documentos) => {
        res.send(documentos);
    });
}

function select(query, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electiva2"); //here
        selectData(query, collection, dbase, callback)
    });
}

const selectData = async function(query, col, db, callback) {
    const collection = db.collection(col);
    collection.find(query).toArray(function(err, docs) {
        callback(docs)
    });
}

function insert(query, collection, callback) {
    mongoClient.connect(url, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electiva2"); //here
        insertData(query, collection, dbase, callback)
    });
}

const insertData = async function(query, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.insertOne(query);
        callback({ "status": 200, "message": "guardado exitoso" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}

function remove(query, collection, callback) {
    mongoClient.connect(url, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electiva2"); //here
        removeData(query, collection, dbase, callback)
    });
}

const removeData = async function(query, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.remove(query);
        callback({ "status": 200, "message": "eliminado exitoso" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}

function Update(condition, set, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electiva2");
        UpdateData(condition, set, collection, dbase, callback)
    });
}

const UpdateData = async function(condition, set, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.update(condition, set);
        callback({ "status": 200, "message": "actualizacion exitosa" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}