
import Product from "../models/product.model";

const productSku = async () => {
    const lastProduct =
      (await Product.findOne({}, { sku: 1 }).sort({ createdAt: -1 }))?.sku ?? "0";
  
    // NEW_CODE
    let lastProductSerial;
    if (lastProduct !== "0") {
      lastProductSerial = Number(lastProduct.split("BS")[1]);
    } else {
      lastProductSerial = 0;
    }
  
    let getSerialId;
    if (lastProductSerial < 1000) {
      getSerialId = String(lastProductSerial + 1);
      while (getSerialId.length < 4) getSerialId = `0${getSerialId}`;
      getSerialId = `BS${getSerialId}`;
    } else {
      getSerialId = `BS${lastProductSerial + 1}`;
    }
  
    return getSerialId;
  };

  module.exports = {
    productSku
  }