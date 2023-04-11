import CryptoJS from "crypto-js";

const code = (text: string) => {
  let res = CryptoJS.AES.encrypt(text, "lz2023").toString();
  res = res.replaceAll("/", "_");
  res = res.replaceAll("+", "4dd1t10n");
  return res;
};

export default code