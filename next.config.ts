import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: false, /* dev-only: disables double-render, halves React overhead in dev */
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
