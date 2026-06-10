import React from "react";
import etecLogo from "../../assets/etec_logo.png";

export default function WaveFooter() {
  return (
    <div
      className="mt-auto relative z-10"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <svg
        viewBox="0 0 900 80"
        preserveAspectRatio="none"
        className="block w-full h-[70px]"
        aria-hidden="true"
      >
        <path
          d="M0,60 C200,0 400,80 600,30 C750,0 850,50 900,40 L900,80 L0,80 Z"
          fill="#c6273f"
        />
      </svg>
      <div className="bg-red-primary text-center pb-5">
        <img
          src={etecLogo}
          alt="Etec — Escola Técnica Estadual"
          className="h-11 object-contain"
        />
      </div>
    </div>
  );
}
