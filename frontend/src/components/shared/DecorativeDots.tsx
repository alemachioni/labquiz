import React from "react";

const DOTS: {
  size: number;
  top: string;
  left?: string;
  right?: string;
  opacity?: number;
}[] = [
  { size: 80, top: "8%",  left:  "2%"  },
  { size: 50, top: "25%", left:  "6%"  },
  { size: 30, top: "50%", left:  "1%"  },
  { size: 20, top: "68%", left:  "9%"  },
  { size: 15, top: "80%", left:  "3%"  },
  { size: 56, top: "10%", right: "3%"  },
  { size: 22, top: "35%", right: "2%"  },
  { size: 14, top: "55%", right: "7%"  },
  { size: 10, top: "72%", right: "12%" },
  { size: 36, top: "42%", right: "12%", opacity: 0.4 },
];

export default function DecorativeDots() {
  return (
    <>
      {DOTS.map((dot, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position:        "fixed",
            width:           dot.size,
            height:          dot.size,
            top:             dot.top,
            left:            dot.left,
            right:           dot.right,
            borderRadius:    "50%",
            backgroundColor: "#c6273f",
            opacity:         dot.opacity ?? 0.9,
            pointerEvents:   "none",
            zIndex:          0,
          }}
        />
      ))}
    </>
  );
}
