/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ytimg.com', 'api.dicebear.com'],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    }, 
};

export default nextConfig;
