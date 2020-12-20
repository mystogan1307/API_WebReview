"use strict";
const bill = require("../models/bill.model");
const cart = require("../models/cart.model");
const product = require("../models/product.model");
const user = require("../models/user.model");

exports.addBill = async (req, res) => {
  if (
    typeof req.body.address === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.phone === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  const { userId, name, phone, address, email } = req.body;

  console.log(req.body);

  var cartFind = null;
  try {
    cartFind = await cart.findOne({ userId: userId });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "user not found" });
    return;
  }

  for (let i = 0; i < cartFind.products.length; i++) {

    let productFind=null;
    productFind = await product.findById(cartFind.products[i].productId)
    if (productFind.number < cartFind.products[i].count) {
    res.status(202).json ({name: productFind.name,number:productFind.number, checkNumber:false});
    return;
    }
  }

  try {
    for (let i = 0; i < cartFind.products.length; i++) {
      let productFind=null;
      productFind = await product.findById(cartFind.products[i].productId)
      productFind.number -= cartFind.products[i].count;
      await product.findByIdAndUpdate(productFind._id, productFind);
      }

  } catch (error) {
      res.status(500).json({ msg: err });
      console.log("sub number product fail");
    return;
  }
  const new_bill = new bill({
    userId: userId,
    products: cartFind.products,
    email: email,
    address: address,
    name: name,
    phone: phone,
    totalPrice: cartFind.totalPrice,
  });
  try {
    await cartFind.remove();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("cart remove fail");
    return;
  }
  try {
    new_bill.save();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("save bill fail");
    return;
  }
  res.status(201).json({ msg: "success" });
};

exports.getBillByIDUser = async (req, res) => {
  if (typeof req.params.userId === "undefined") {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let billFind = null;
  try {
    billFind = await bill
      .find({ userId: req.params.userId })
      .sort({ date: -1 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
    return;
  }
  res.status(200).json({ data: billFind });
};
exports.deleteBill = async (req, res) => {
  if (typeof req.params.id === "undefined") {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let billFind = null;
  try {
    billFind = await bill.findOne({ _id: req.params.id, issend: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server found" });
    return;
  }
  if (billFind === null) {
    res.status(400).json({ msg: "invalid" });
    return;
  }
  try {
    billFind.remove();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server found" });
    return;
  }
  res.status(200).json({ msg: "success" });
};

exports.statisticaRevenueMonth = async (req, res) => {

  let year=2020;
  let arr=[]
  for (let i = 1; i < 13; i ++) {
    let dateG,dateL
    dateG=setTimes(1,i,year)
    if(i==12){
      dateL=setTimes(1,i+1,year+1)
    } else {
      dateL=setTimes(1,i+1,year)
    }
    let billFind = null;
    try {
        billFind = await bill.find({
          date: {
            $gte: dateG,
            $lt: dateL,
          },
        }).count();
        console.log("count bill", billFind);
        arr.push(billFind)
      } catch (err) {
        console.log(err);
        res.status(500).msg({ msg: err });
        return;
      }
    }
    let totalUser=  await user.countDocuments() -1;
    let totalProduct=  await product.countDocuments();
    let totalBill=  await bill.countDocuments();
  res.status(200).json({ data: arr, totalUser : totalUser, totalBill : totalBill,totalProduct: totalProduct });


};
const setTimes= (day,month,year) =>{
  let date = new Date()
  date.setDate(day)
  date.setMonth(month-1)
  date.setFullYear(year)
  date.setHours(7)
  date.setMinutes(0)
  date.setSeconds(0)

  return date;
}

exports.getBill = async (req, res) => {
  let count = null;
  try {
    count = await bill.count();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  let totalPage = parseInt((count - 1) / 5 + 1);
  let { page } = req.query;
  if (parseInt(page) < 1 || parseInt(page) > totalPage) {
    res.status(200).json({ data: [], msg: "Invalid page", totalPage });
    return;
  }
  bill
    .find()
    .sort({date:-1})
    .skip(5 * (parseInt(page) - 1))
    .limit(5)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ data: docs, totalPage });
    });
};

exports.updateBill = async (req, res) => {
  if (typeof req.params.id === "undefined") {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { id } = req.params;
  var billFind = null;
  try {
    billFind = await bill.findOne({ _id: id });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (billFind === null) {
    res.status(404).json({ msg: "not found" });
    return;
  }

  billFind.status = true;
  try {
    await bill.findByIdAndUpdate(billFind._id, billFind);
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ msg: "success" });
};
