const calculateFrete = async (userCep) => {
  const restaurantCep = '06240080';
  const maxDeliveryDistance = 10001;
  const key = import.meta.env.VITE_GOOGLE_API_KEY;

  try {
      const apiUrl = `/maps/api/distancematrix/json?origins=${restaurantCep}&destinations=${userCep}&key=${key}`;
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Erro na resposta da API');
      }

      const data = await response.json();
      const distanceValue = data.rows[0]?.elements[0]?.distance?.value;

      if (distanceValue) {
          if (distanceValue > maxDeliveryDistance) {
              return { price: null, error: 'A entrega está fora da área de alcance.' };
          } else {
              const price = calcularPreco(distanceValue);
              return { price, error: null };
          }
      } else {
          throw new Error('Dados de distância não encontrados');
      }
  } catch (error) {
      return { price: null, error: 'Erro ao calcular a distância. Verifique os CEPs e tente novamente.' };
  }
};

const calcularPreco = (distance) => {
  const distanceInKm = distance / 1000;
  let price = 0;

  if (distanceInKm <= 2) {
      price = 5;
  } else if (distanceInKm <= 5) {
      price = 8;
  } else if (distanceInKm <= 7) {
      price = 10;
  } else if (distanceInKm <= 10) {
      price = 14;
  }

  return price;
};

export default calculateFrete;
