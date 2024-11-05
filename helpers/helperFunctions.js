
const Product = require("../models/product.model");

const productSku = async () => {
  const lastProduct =
    (await Product.findOne({}, { sku: 1 }).sort({ createdAt: -1 }))?.sku ?? "0";

  let lastProductSerial;
  if (lastProduct !== "0") {
    lastProductSerial = Number(lastProduct.split("TEST")[1]);
  } else {
    lastProductSerial = 0;
  }

  let getSerialId;
  if (lastProductSerial < 1000) {
    getSerialId = String(lastProductSerial + 1);
    while (getSerialId.length < 4) getSerialId = `0${getSerialId}`;
    getSerialId = `TEST${getSerialId}`;
  } else {
    getSerialId = `TEST${lastProductSerial + 1}`;
  }

  return getSerialId;
};

const createSlug = (text)=> {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = {
  productSku,
  createSlug
}