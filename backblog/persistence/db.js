var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.dayWeek = function(req, res) {
    gettodb([{
            $group: { _id: "$Day_of_Week", total: { $sum: 1 } }
        },
        {
            $sort: { total: -1 }
        }
    ], (documentos) => {
        res.send(documentos);
    })
}

exports.numVechicle = function(req, res) {
    gettodb([{
            $group: { _id: "$numCars", total: { $sum: 1 } }
        },
        {
            $sort: { total: -1 }
        }, {
            $limit: 10
        }
    ], (documentos) => {
        res.send(documentos);
    })
}

exports.PoliceReport = function(req, res) {
    gettodb([{
            $group: { _id: "$Police_Report", total: { $sum: 1 } }
        },
        {
            $sort: { total: -1 }
        }
    ], (documentos) => {
        res.send(documentos);
    })
}


function gettodb(query, callback) {
    mongoClient.connect(url, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electiva2"); //here
        findDateDb(query, dbase, callback)
    });
}

const findDateDb = async function(query, db, callback) {
    const collection = db.collection('accidente');
    collection.aggregate(query).toArray(function(err, docs) {
        callback(docs)
    });
}