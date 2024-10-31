import React, { useState } from 'react';
import styles from './cep.module.css'

const DistanceCalculator = () => {
    const [userCep, setUserCep] = useState('');
    const [distance, setDistance] = useState(null);
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);

    const key = import.meta.env.VITE_GOOGLE_API_KEY;
    const restaurantCep = '06240080';
    const maxDeliveryDistance = 10001;

    const handleCalculateDistance = async () => {
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

            // Verificar se a resposta contém os dados de distância
            const distanceValue = data.rows[0]?.elements[0]?.distance?.value; // Valor da distância em metros

            if (distanceValue) {
                const distanceText = data.rows[0].elements[0].distance.text; // Texto da distância
                setDistance(distanceText);  // Armazena a distância
                setError(null);             // Remove qualquer erro anterior

                // Verificar se a distância está dentro do alcance
                if (distanceValue > maxDeliveryDistance) {
                    setPrice(null); // Zera o preço se fora da área de entrega
                    setError('A entrega está fora da área de alcance.'); // Mensagem de erro
                } else {
                    // Calcular o preço com base na distância
                    const calculatedPrice = calculatePrice(distanceValue);
                    setPrice(calculatedPrice);  // Armazena o preço calculado
                }

            } else {
                throw new Error('Dados de distância não encontrados');
            }

        } catch (err) {
            setError('Erro ao calcular a distância. Verifique os CEPs e tente novamente.');
            setDistance(null);  // Zera a distância se houver erro
            setPrice(null);     // Zera o preço se houver erro
        }
    };

    // Função para calcular o preço com base na distância
    const calculatePrice = (distance) => {
        const distanceInKm = distance / 1000; // Converter metros para quilômetros
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

        return price; // Retorna o preço calculado
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Calculador de Frete</h1>
            <input
                type="text"
                placeholder="Digite seu CEP"
                value={userCep}
                onChange={e => setUserCep(e.target.value)}
                className={styles.input_cep}
            />
            <button onClick={handleCalculateDistance}>Calcular Distância</button>
            {distance && <p>Distância: {distance}</p>}
            {price !== null && <p>Preço: R$ {price.toFixed(2)}</p>}
            {error && <p className={styles.p_error}>{error}</p>}
        </div>
    );
};

export default DistanceCalculator;
