import { useEffect, useState } from 'react';

const TARGETS = {
  solana: 495,
  ethereum: 8500,
};

export default function Home() {
  const [prices, setPrices] = useState({ solana: null, ethereum: null });

  const fetchPrices = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum&vs_currencies=usd');
    const data = await res.json();
    setPrices({
      solana: data.solana.usd,
      ethereum: data.ethereum.usd,
    });
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const calcMultiplier = (target, current) => {
    return (target / current).toFixed(2);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1>Crypto Target Multiplier</h1>
      {prices.solana && prices.ethereum ? (
        <div style={{ display: 'flex', gap: '3rem' }}>
          <div>
            <h2>Solana</h2>
            <p>Current: ${prices.solana}</p>
            <p>Target: ${TARGETS.solana}</p>
            <p>Needs to 𝘅{calcMultiplier(TARGETS.solana, prices.solana)} to reach target</p>
          </div>
          <div>
            <h2>Ethereum</h2>
            <p>Current: ${prices.ethereum}</p>
            <p>Target: ${TARGETS.ethereum}</p>
            <p>Needs to 𝘅{calcMultiplier(TARGETS.ethereum, prices.ethereum)} to reach target</p>
          </div>
        </div>
      ) : (
        <p>Loading prices...</p>
      )}
    </div>
  );
}
