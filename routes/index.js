var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_igkSgmeuQg7NcVTHS3gP6mlO");


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



/* POST purchase basket with addition of new bicycle*/
router.post('/add-shop', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.quantity);
  console.log(req.session.dataCardBike);
var statusLog = false;

for(var i=0; i<req.session.dataCardBike.length; i++) {
  if(req.session.dataCardBike[i].nom == req.body.nom) {
    req.session.dataCardBike[i].quantity++;
    statusLog = true;
  }
}
if(statusLog == false) {
  req.session.dataCardBike.push(req.body);
}

res.render('shop', {dataCardBike: req.session.dataCardBike});
});

/* Update quantity of bicycles in basket */
router.post('/user-update', function(req, res, next) {
  console.log(req.body);
  req.session.dataCardBike[req.body.position].quantity = req.body.quantity;
  res.render('shop', {dataCardBike: req.session.dataCardBike});
});

/* POST delete bicycle */
router.post('/delete-shop', function(req, res, next) {
  console.log("log de mon indice body ---->",req.body.k);
  req.session.dataCardBike.splice(req.body.k,1);
  res.render('shop', {dataCardBike: req.session.dataCardBike});
});

/* POST checkout process */
router.post('/checkout', function(req, res, next) {
  console.log(req.body);
  var totalAmount = 0;
  var desc = '';
  for (var p=0; p<req.session.dataCardBike.length; p++) {
    desc = desc + req.session.dataCardBike[p].quantity+req.session.dataCardBike[p].nom;
    totalAmount += (req.session.dataCardBike[p].quantity*req.session.dataCardBike[p].prix*100);
  }
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express

  const charge = stripe.charges.create({
    amount: totalAmount,
    currency: 'eur',
    description: desc,
    source: token,
  });

  res.render('confirmationCommande', {});
});

module.exports = router;
