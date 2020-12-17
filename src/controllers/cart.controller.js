const cart = require("../models/cart.model");

exports.addToCart = async (req, res) => {
  if (typeof req.body.products === "undefined") {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { userId, products } = req.body;
  console.log("+++++++++++++++++++++", userId, products);
  // const userId = req.user._id;
  // const { products } = req.body;

  var cartFind;
  // try {
  cartFind = await cart.findOne({ userId: userId });
  // } catch (err) {

  //   const cart_new = new cart({
  //     userId: userId,
  //     products: products
  //   });
  //   let cartsave;
  //   try {
  //     cartsave = await cart_new.save();
  //   } catch (err) {
  //     res.status(500).json({ msg: err });
  //     return;
  //   }
  //   return;
  // }
  if (cartFind === null) {
    const cart_new = new cart({
      userId: userId,
      products: products,
    });

    let cartsave;
    try {
      cartsave = await cart_new.save();
    } catch (err) {
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json({ msg: "success" });
    return;
  }
  console.log("------", products);
  for (let i = 0; i < products.length; i++) {
    let index = cartFind.products.findIndex(
      (element) => products[i].productId === element.productId
    );
    if (index === -1) {
      cartFind.products.push(products[i]);
    } else {
      cartFind.products[index].count += Number(products[i].count);
    }
  }

  console.log(cartFind);

  try {
    await cart.findByIdAndUpdate(cartFind._id, {
      $set: { products: cartFind.products },
    });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ msg: "success" });
};
exports.getByUserId = async (req, res) => {
  // if (typeof req.params.userId === "undefined") {
  if (typeof req.params.userId === "undefined") {
    console.log(req.params);
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  cart.findOne({ userId: req.params.userId }, (err, docs) => {
    if (err) {
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json({ data: docs });
  });
};
exports.update = async (req, res) => {
  if (typeof req.body.product === "undefined") {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { userId, product } = req.body;
  // const userId = req.user._id;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ userId: userId });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "not found" });
    return;
  }
  let index = cartFind.products.findIndex(
    (element) => element.productId === product.productId
  );
  if (index === -1) {
    res.status(404).json({ msg: "product not found in list" });
    return;
  }
  cartFind.products[index].count = Number(product.count);
  try {
    await cart.findByIdAndUpdate(cartFind._id, {
      $set: { products: cartFind.products },
    });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ msg: "success" });
};
exports.delete = async (req, res) => {
  if (typeof req.body.productId === "undefined") {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { userId, productId } = req.body;
  // const userId = req.user._id;
  // const { productId } = req.body;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ userId: userId });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "not found" });
    return;
  }
  let index = cartFind.products.findIndex(
    (element) => element.productId === productId
  );
  if (index === -1) {
    res.status(404).json({ msg: "product not found in list" });
    return;
  }
  cartFind.products.splice(index, 1);
  try {
    await cart.findByIdAndUpdate(cartFind._id, {
      $set: { products: cartFind.products },
    });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ msg: "success" });
};
exports.removeCartByIDUser = async (userId) => {
  try {
    cartFind = await cart.findOne({ userId: userId });
  } catch (err) {
    console.log(err);
    return false;
  }
  try {
    await cartFind.remove();
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

exports.getTotalPrice = async (req, res) => {
  // if (typeof req.params.userId === "undefined") {
  //   res.status(422).json({ msg: "invalid data" });
  //   return;
  // }
  // cart.findOne({ userId: req.params.userId }, (err, docs) => {
  //   if (err) {
  //     res.status(500).json({ msg: err });
  //     return;
  //   }
  //   res.status(200).json({ data: docs });
  // });

  if (typeof req.params.userId === "undefined") {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { userId } = req.params.userId;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ userId: req.params.userId });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "not found" });
    return;
  }

  var tempPrice = 0;
  for (let i = 0; i < cartFind.products.length; i++) {
    tempPrice += cartFind.products[i].count * cartFind.products[i].price;
  }
  cartFind.totalPrice = tempPrice;
  console.log(cartFind.totalPrice);
  try {
    await cart.findByIdAndUpdate(cartFind._id, cartFind);
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ tempPrice });
};
