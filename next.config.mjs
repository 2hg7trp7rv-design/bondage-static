/** @type {import('next').NextConfig} */
const nextConfig = {
  // React の厳格モード
  reactStrictMode: true,

  // Cloudflare Pages で配信するための静的エクスポート
  output: "export",

  // 静的ホスティング用に、next/image の最適化を無効化
  images: {
    // これを true にしないと、/_next/image を叩きに行って 404 になります
    unoptimized: true,
  },
};

export default nextConfig;
