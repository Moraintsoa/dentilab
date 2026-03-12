import React from 'react';
import teeth from './Toutlesdents';
import { useState } from 'react';

function Tooth({ number, selected, onClick }) {
  return (
    <div
      onClick={() => onClick(number)}
      style={{
        cursor: "pointer",
        opacity: selected ? 1 : 0.75,
        outline: selected ? "2px solid #4A90D9" : "none",
        borderRadius: 4,
        transition: "opacity 0.2s",
      }}
      dangerouslySetInnerHTML={{ __html: teeth[number] }}
    />
  );
}

function Row({ numbers, flip, selected, toggle }) {
  return (
    <div style={{ display: "flex", transform: flip ? "scaleY(1)" : "scaleY(-1)", }}>
      {numbers.map((n) => (
        <Tooth key={n} number={n} selected={selected === n} onClick={toggle} />
      ))}
    </div>
  );
}

export default function DentalChart() {
  
  const [selected, setSelected] = useState(null);
  const toggle = (n) => setSelected(selected === n ? null : n);

  const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const upperLeft  = [21, 22, 23, 24, 25, 26, 27, 28];
  const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];
  const lowerLeft  = [31, 32, 33, 34, 35, 36, 37, 38];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {/* Mâchoire supérieure */}
      <div style={{ display: "flex"}}>
        <Row numbers={upperRight} selected={selected} toggle={toggle} />
        <Row numbers={upperLeft} selected={selected} toggle={toggle} />
      </div>

      {/* Séparateur */}
      <div style={{ width: "100%", height: 2, background: "#E8A0A0", borderRadius: 2 }} />

      {/* Mâchoire inférieure (retournée) */}
      <div style={{ display: "flex" }}>
        <Row numbers={lowerRight} flip selected={selected} toggle={toggle} />
        <Row numbers={lowerLeft} flip selected={selected} toggle={toggle} />
      </div>

      {selected && (
        <p style={{ marginTop: 12, color: "#555" }}>
          Dent sélectionnée : <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
}
