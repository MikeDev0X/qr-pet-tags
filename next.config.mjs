/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
    appDir: true,
},
env: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'petQR_database'
    }
};

export default nextConfig;
