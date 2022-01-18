import axios from 'axios';

export const convertCoin = async (quoteTo: string, currentCoin: string) => {
  const response = await axios.get(
    `https://economia.awesomeapi.com.br/json/last/${currentCoin}-${quoteTo}`,
  );

  return response.data[currentCoin + quoteTo];
};
