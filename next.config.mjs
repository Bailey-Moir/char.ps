/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/",
                    destination: "https://publish.obsidian.md/serve?url=www.vlt.char.ps/",
                    has: [
                        {
                            type: "host",
                            value: "www.vlt.char.ps"
                        }
                    ]
                },
                {
                    source: "/:path*",
                    destination: "https://publish.obsidian.md/serve?url=www.vlt.char.ps/:path*",
                    has: [
                        {
                            type: "host",
                            value: "www.vlt.char.ps"
                        }
                    ]
                }
            ],
            
        }
    },
};

export default nextConfig;


