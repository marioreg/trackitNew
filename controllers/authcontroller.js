var db = require("../models");

var exports = module.exports = {}

exports.signup = function(req,res){
	res.render('signup');
}

exports.signin = function(req,res){
	res.render('signin');
}

//exports.tracking = function(req,res){
//	res.render('tracking');
//}

exports.tracking = function(req,res){
  db.ShowTracks.findAll({
    where: {
      UserId:req.user.id
    }
  }).then(function (tracks){
    res.render('tracking', {name: req.user.firstname, last: req.user.lastname, id1:req.user.id, tracks: tracks});

  })
}



exports.logout = function(req,res){
  req.session.destroy(function(err) {
  res.redirect('/');
  });

}


