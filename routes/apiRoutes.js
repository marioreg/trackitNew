var db = require("../models");
var carriertrack = require("../utils/carriers.js")


module.exports = function(app) {

  // Api route to get all guides and its info from the database
  app.get("/api/tracks/:id", function(req, res) {
console.log('llega id?');

    db.ShowTracks.findAll({
      include: [{
        model: db.User,
        where: { id: req.params.id }
    }]
    }).then(function(result) {
      res.json(result);
    });
  });


//Route to write new track and it current status
app.post("/api/tracks", function(req, res) {
carriertrack.Status(req.body.carrier, req.body.track).then(function(status){
  console.log ( " dentro del then de carriertrack "+status);
  db.ShowTracks.create(
    {
    track: req.body.track,
    carrier: req.body.carrier,
    origin: status.shipperCity,
    destination: status.recipientCity,
    status: status.status,
    UserId:req.body.UserId
    }  
  ).then(function(dbTracks) {
    console.log("ya llego al then de la escritura");
    res.json(dbTracks);
  });
});
});


// Route to delete a record from the database
app.delete("/api/tracks/:track", function(req, res) {
  db.ShowTracks.destroy({
    where: {
      track: req.params.track
    }
  }).then(function(dbTracks) {
    res.json(dbTracks);
  });
});


};