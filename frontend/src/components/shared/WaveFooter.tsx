import React from "react";
import etecLogo from "../../assets/etec_logo.png";

export default function WaveFooter() {
  return (
    <div
      style={{
        marginTop: "auto",
        position: "relative",
        zIndex: 1,
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      <svg
        viewBox="0 0 900 80"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "70px" }}
        aria-hidden="true"
      >
        <path
          d="M0,60 C200,0 400,80 600,30 C750,0 850,50 900,40 L900,80 L0,80 Z"
          fill="#c6273f"
        />
      </svg>
      <div
        style={{
          backgroundColor: "#c6273f",
          textAlign: "center",
          padding: "0 0 20px",
        }}
      >
        <img
          src={etecLogo}
          alt="Etec — Escola Técnica Estadual"
          style={{ height: "44px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
