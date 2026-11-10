import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030816",
          borderRadius: "36px",
          border: "4px solid #00e5ff",
          color: "#00e5ff",
          fontSize: 88,
          fontWeight: 700,
        }}
      >
        සැ
      </div>
    ),
    { ...size }
  );
}
