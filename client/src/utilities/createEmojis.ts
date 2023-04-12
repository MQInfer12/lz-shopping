import { Product } from "../interfaces/product";

export const createEmojis = (selected: Product | null) => {
  let emojis: string = "";

  if(selected?.name?.toLowerCase().includes('vestido')) {
    emojis += '%F0%9F%91%97';
  }
  if(selected?.name?.toLowerCase().includes('polera') || selected?.name?.toLowerCase().includes('camisa')) {
    emojis += '%F0%9F%91%9A';
  }
  if(selected?.name?.toLowerCase().includes('jean') || selected?.name?.toLowerCase().includes('pantalón')) {
    emojis += '%F0%9F%91%96';
  }
  if(selected?.name?.toLowerCase().includes('rojo') || selected?.name?.toLowerCase().includes('roja')) {
    emojis += '%E2%9D%A4';
  }
  if(selected?.name?.toLowerCase().includes('negro') || selected?.name?.toLowerCase().includes('negra')) {
    emojis += '%F0%9F%96%A4';
  }
  if(selected?.name?.toLowerCase().includes('ivana') || selected?.name?.toLowerCase().includes('gato')) {
    emojis += '%F0%9F%90%88';
  }
  if(selected?.name?.toLowerCase().includes('rosa')) {
    emojis += '%F0%9F%8C%B9';
  }
  if(selected?.name?.toLowerCase().includes('flor')) {
    const rnd = Math.floor(Math.random() * 6);
    switch(rnd) {
      case 0:
        emojis += '%F0%9F%8C%BB';
        break;
      case 1:
        emojis += '%F0%9F%8C%B7';
        break;
      case 2:
        emojis += '%F0%9F%8C%BC';
        break;
      case 3:
        emojis += '%F0%9F%8C%B8';
        break;
      case 4:
        emojis += '%F0%9F%8C%BA';
        break;
      case 5:
        emojis += '%F0%9F%92%90';
        break;
    }
  }
  return emojis;
}