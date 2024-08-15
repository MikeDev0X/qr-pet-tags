/** @type {import('next').NextConfig} */
const nextConfig = {
env: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'petqr'
    }
};

export default nextConfig;
