import React, { useState, useMemo } from "react";
import "./MortgageCalculator.css";

function formatARS(n) { return Math.round(n).toLocaleString("es-AR"); }
function formatUSD(n) { return Math.round(n).toLocaleString("es-AR"); }

export default function MortgageCalculator({ defaultPrice = 150000 }) {
  const [price,  setPrice]  = useState(defaultPrice);
  const [down,   setDown]   = useState(30);    // % de entrada
  const [years,  setYears]  = useState(20);
  const [rate,   setRate]   = useState(8.5);   // tasa anual %
  const [usdArs, setUsdArs] = useState(1050);  // tipo de cambio

  const loan = useMemo(() => price * (1 - down / 100), [price, down]);
  const monthlyRate = rate / 100 / 12;
  const months      = years * 12;

  const monthlyUSD = useMemo(() => {
    if (monthlyRate === 0) return loan / months;
    return loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }, [loan, monthlyRate, months]);

  const monthlyARS = monthlyUSD * usdArs;
  const totalPaid  = monthlyUSD * months;
  const totalInt   = totalPaid - loan;
  const downUSD    = price * down / 100;

  return (
    <div className="calc">
      <div className="calc__header">
        <div className="calc__header-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="2" y="3" width="20" height="18" rx="2"/>
            <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01M8 8h8"/>
          </svg>
        </div>
        <div>
          <h3 className="calc__title">Calculadora de crédito</h3>
          <p className="calc__subtitle">Estimación orientativa · Consultá tu banco</p>
        </div>
      </div>

      <div className="calc__body">
        {/* Sliders */}
        <div className="calc__sliders">
          <SliderField
            label="Precio de la propiedad"
            value={price}
            min={20000} max={1000000} step={5000}
            display={`USD ${formatUSD(price)}`}
            onChange={setPrice}
          />
          <SliderField
            label="Entrada / anticipo"
            value={down}
            min={10} max={80} step={5}
            display={`${down}% — USD ${formatUSD(downUSD)}`}
            onChange={setDown}
          />
          <SliderField
            label="Plazo del crédito"
            value={years}
            min={5} max={30} step={5}
            display={`${years} años`}
            onChange={setYears}
          />
          <SliderField
            label="Tasa anual estimada"
            value={rate}
            min={3} max={20} step={0.5}
            display={`${rate}% TNA`}
            onChange={setRate}
          />
          <SliderField
            label="Tipo de cambio USD → ARS"
            value={usdArs}
            min={500} max={2500} step={50}
            display={`$${formatARS(usdArs)}`}
            onChange={setUsdArs}
          />
        </div>

        {/* Results */}
        <div className="calc__results">
          <div className="calc__result calc__result--main">
            <p className="calc__result-label">Cuota mensual estimada</p>
            <p className="calc__result-value">USD {formatUSD(monthlyUSD)}</p>
            <p className="calc__result-sub">≈ ${formatARS(monthlyARS)} al cambio actual</p>
          </div>
          <div className="calc__result-grid">
            <div className="calc__result-item">
              <p className="calc__result-item-label">Monto a financiar</p>
              <p className="calc__result-item-value">USD {formatUSD(loan)}</p>
            </div>
            <div className="calc__result-item">
              <p className="calc__result-item-label">Total a pagar</p>
              <p className="calc__result-item-value">USD {formatUSD(totalPaid)}</p>
            </div>
            <div className="calc__result-item">
              <p className="calc__result-item-label">Intereses totales</p>
              <p className="calc__result-item-value">USD {formatUSD(totalInt)}</p>
            </div>
            <div className="calc__result-item">
              <p className="calc__result-item-label">Entrada requerida</p>
              <p className="calc__result-item-value">USD {formatUSD(downUSD)}</p>
            </div>
          </div>
          <p className="calc__disclaimer">
            * Calculadora orientativa. Las cuotas reales dependen del banco, tus ingresos y condiciones del mercado. Consultá a tu asesor financiero.
          </p>
        </div>
      </div>
    </div>
  );
}

function SliderField({ label, value, min, max, step, display, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="calc__field">
      <div className="calc__field-header">
        <label className="calc__field-label">{label}</label>
        <span className="calc__field-value font-data">{display}</span>
      </div>
      <div className="calc__slider-wrap">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="calc__slider"
          style={{ "--pct": `${pct}%` }}
        />
      </div>
    </div>
  );
}
