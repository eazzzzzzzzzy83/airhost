import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Make a static export so Netlify can serve pages like /calendar
  output: "export",
};

export default nextConfig;
