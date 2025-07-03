/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
  webpack: (config) => {
    config.resolve.alias.three = false;
    return config;
  }
}