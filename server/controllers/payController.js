const payModel = require("../models/payModel");
const razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new razorpay({
  key_id: process.env.PAY_KEY,
  key_secret: process.env.PAY_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      receipt: "receipt#1",
    };
    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).send({ success: false });
    }
    console.log(order);
    return res.status(201).send({ success: true, order });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(body);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.PAY_SECRET)
      .update(body.toString())
      .digest("hex");
      console.log(expectedSignature);
    const isauth = expectedSignature === razorpay_signature;
    console.log(isauth);
    if (isauth) {
      return res
        .status(201)
        .send({ success: true, refid: razorpay_payment_id });
    } else {
      return res.status(400).send({ success: false });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};

const getkey = async (req, res) => {
  try {
    return res.status(200).send({ key: process.env.PAY_KEY });
  } catch (error) {
    return res.status(401).send({ error });
  }
};

module.exports = { checkout, paymentVerification, getkey };
