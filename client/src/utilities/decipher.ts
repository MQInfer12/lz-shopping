import CryptoJS from "crypto-js";

const decipher = (txt: string) => {
  const res = txt.replaceAll("4dd1t10n", "+");
  const replaced = res.replaceAll("_", "/");
  const coded = CryptoJS.AES.decrypt(replaced, "lz2023");
  const txtDescifrado = coded.toString(CryptoJS.enc.Utf8);
  return txtDescifrado;
};

export default decipher;
