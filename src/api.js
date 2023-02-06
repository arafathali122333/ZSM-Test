let tamilObj = {
  "contact_names" : ["சரவணா","வசந்த்","ஆறுமுகம்","கிருத்திக்","நிகிலன்","வருண்","கிரிஷ்","மித்ரன்","கவின்","அஸ்வின்","உதய்","அர்ஜுன்"],
  "product" : ["சபா அடுக்குமாடி இல்லங்கள்","ஆதவன் உடற்பயிற்சி கூடம்","ஆகாஷ் விளையாட்டு மைதானம்","ஹோட்டல் ராஜா","சூர்யா பேக்கரி"],
  "plan" : ["வார சந்தா","மாத சந்தா","ஆண்டு சந்தா"],
  "coupon": ["தள்ளுபடி"]
};
let obj = {
  "contact_names" : ["Jacob","Michael","Matthew","Joshua","Joseph","Daniel","Alexander","Jonathan","Christian","Austin","Dylan","Ethan","Benjamin","Noah","Samuel"],
  "product" : ["Netflix","Hotstar","Sun NXT","Jio TV","Hungama","Pogo","Gym","Surya Apartment"],
  "plan" : ["Super","Premium","Ultra","Mini"],
  "coupon": ["coupon"]
}

const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express. Router ();
//contacts
router.get('/contacts', (req, res) => {
  let name;
  if(req.query.language == "tamil"){
      if(req.query.index != undefined){
        name = tamilObj.contact_names[parseInt(req.query.index)];
      }
      else{
        name = tamilObj.contact_names[Math.floor(Math.random() * 100000) % tamilObj.contact_names.length];
      }
  }
  else{
      if(req.query.index != undefined){
        name = obj.contact_names[parseInt(req.query.index)];
      }
      else{
        name = obj.contact_names[Math.floor(Math.random() * 100000) % obj.contact_names.length];
      }
  }
  let data = {
    "message" : "The random contact has been created!",
    "contact" : {
      "contact_name" : (req.query.emoji != undefined) ? name+req.query.emoji : name,
      "contact_persons" : [
        {
          "email" : name+"@example.com"
        }
      ]
    }
  }
  res.json(data);
});

//products
router.get('/products', (req, res) => {
    let product;
    if(req.query.language == "tamil"){
        if(req.query.index != undefined){
          product = tamilObj.product[parseInt(req.query.index)];
        }
        else{
          product = tamilObj.product[Math.floor(Math.random() * 100000) % tamilObj.product.length];
        }
    }
    else{
        if(req.query.index != undefined){
          product = obj.product[parseInt(req.query.index)];
        }
        else{
          product = obj.product[Math.floor(Math.random() * 100000) % obj.product.length];
        }
    }
    let data = {
      "message" : "The random product has been created!",
      "product" : {
        "name" : product
      }
    }
    res.json(data);
});

router.get('/plans', (req, res) => {
  let plan;
  if(req.query.language == "tamil"){
      if(req.query.index != undefined){
        plan = tamilObj.plan[parseInt(req.query.index)];
      }
      else{
        plan = tamilObj.plan[Math.floor(Math.random() * 100000) % tamilObj.plan.length];
      }
  }
  else{
      if(req.query.index != undefined){
        plan = obj.plan[parseInt(req.query.index)];
      }
      else{
        plan = obj.plan[Math.floor(Math.random() * 100000) % obj.plan.length];
      }
  }
  let planCode = Math.random().toString(36).slice(2),
      recurringPrice = Math.floor(Math.random()*1000),
      interval = (req.query.interval != undefined) ? parseInt(req.query.interval) : 1,
      intervalUnit = (req.query.interval_unit != undefined) ? req.query.interval_unit : "months",
      productId = (req.query.product_id != undefined) ? req.query.product_id : "";

  let data = {
    "message" : "The random plan has been created!",
    "plan" : {
      "name" : plan,
      "plan_code" : planCode,
      "recurring_price" : recurringPrice,
      "interval" : interval,
      "interval_unit" : intervalUnit,
      "product_id" : productId
    }
  }
  res.json(data);
});


router.get('/addons', (req, res) => {
  let addonCode = Math.random().toString(36).slice(2),
      price = Math.floor(Math.random()*100),
      intervalUnit = (req.query.interval_unit != undefined) ? req.query.interval_unit : "monthly",
      productId = (req.query.product_id != undefined) ? req.query.product_id : "",
      name = "addon-"+addonCode;

  let data = {
    "message" : "The random addon has been created!",
    "addon" : {
      "name" : name,
      "addon_code" : addonCode,
      "price_brackets":[
        {
          "price": price
        }
      ],
      "unit_name" : "box",
      "interval_unit" : intervalUnit,
      "product_id" : productId
    }
  }
  res.json(data);
});

router.get('/coupons', (req, res) => {  
  let couponCode = Math.random().toString(36).slice(2),
      percent = Math.floor(Math.random()*100),
      productId = (req.query.product_id != undefined) ? req.query.product_id : "",
      type = (req.query.type != undefined) ? req.query.type : "forever",
      name = (req.query.language == "tamil") ? percent + "% தள்ளுபடி" : percent + "% Discount";

  let data = {
    "message" : "The random coupon has been created!",
    "coupon" : {
      "name" : name,
      "coupon_code" : couponCode,
      "product_id" : productId,
      "discount_by" : "percentage",
      "discount_value" : percent,
      "type" : type
    }
  }
  res.json(data);
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless (app);