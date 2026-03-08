import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BTCD Analytics Dashboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #030712 0%, #1e3a5f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#3b82f6",
            marginBottom: 8,
            display: "flex",
          }}
        >
          BTCD
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Analytics Dashboard
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#9ca3af",
            display: "flex",
          }}
        >
          Bitcoin-backed stablecoin on Elastos Smart Chain
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
          }}
        >
          {["Supply", "Peg Health", "Chain Stats", "BTCFi Yields"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: 12,
                  padding: "12px 24px",
                  color: "#93c5fd",
                  fontSize: 18,
                  display: "flex",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
