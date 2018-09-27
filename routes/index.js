var express = require('express');
var router = express.Router();

var dataCardBike = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  dataBike = [
    {nom: 'Model BIKO45', prix: 679, img: "/images/bike-1.jpg"},
    {nom: 'Model ZOOK7', prix: 799, img: "/images/bike-2.jpg"},
    {nom: 'Model LIKO89', prix: 839, img: "/images/bike-3.jpg"},
    {nom: 'Model GEWO', prix: 1206, img: "/images/bike-4.jpg"},
    {nom: 'Model TITAN5', prix: 989, img: "/images/bike-5.jpg"},
    {nom: 'Model AMIG39', prix: 599, img: "/images/bike-6.jpg"}];

  if (req.session.dataCardBike == undefined) {
       req.session.dataCardBike = [];
  }

  res.render('index', {dataBike});
});

/* GET route for empty shopping cart */
router.get('/shop', function(req, res, next) {
  res.render('shop', {dataCardBike: req.session.dataCardBike});
});

/* GET purchase basket with addition of new bicycle*/
router.post('/add-shop', function(req, res, next) {

  console.log(req.body);
  console.log(req.body.quantity);
  console.log(req.session.dataCardBike);
  req.session.dataCardBike.push(req.body);
  res.render('shop', {dataCardBike: req.session.dataCardBike});
});

/* Update quantity of bicycles in basket */
router.post('/user-update', function(req, res, next) {
  console.log(req.body);
  req.session.dataCardBike[req.body.position].quantity = req.body.quantity;
  res.render('shop', {dataCardBike: req.session.dataCardBike});
});

/* GET delete bicycle */
router.post('/delete-shop', function(req, res, next) {
  console.log("log de mon indice body ---->",req.body.k);
  req.session.dataCardBike.splice(req.body.k,1);
  res.render('shop', {dataCardBike: req.session.dataCardBike});
});

module.exports = router;
