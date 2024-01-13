/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        // this recognises the web address for the hosted images
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'upcdn.io',
            port: '',
            pathname: '/kW15b2z/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dejhaiho2/**',
          },
        ],
      },
};

export default config;
