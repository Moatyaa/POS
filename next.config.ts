import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
    "compilerOptions": {
        "lib": ["dom", "esnext"],
        "strict": true
    },
    images: {
        domains: ['localhost'],
    }
};

export default withNextIntl(nextConfig);
