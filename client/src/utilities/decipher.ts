import CryptoJS from "crypto-js";

const decipher = (txt: string) => {
  const replaced = txt.replaceAll("_", "/");
  const coded = CryptoJS.AES.decrypt(replaced, "lz2023");
  const txtDescifrado = coded.toString(CryptoJS.enc.Utf8);
  return txtDescifrado;
};

export default decipher;
