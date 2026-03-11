import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, icon.png (browser icons)
         * - public assets
         */
        "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|Assets/).*)",
    ],
};

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get("host") || "";

    // Extract subdomain: e.g. "stores24.bluevolt.group" -> "stores24"
    // Handle both production and local development
    const productionDomains = ["bluevolt.group", "bluevolt.in"];
    const localDomain = "localhost:3000";

    let subdomain: string | null = null;

    for (const domain of productionDomains) {
        if (hostname.endsWith(`.${domain}`)) {
            subdomain = hostname.replace(`.${domain}`, "");
            break;
        }
    }

    if (!subdomain && hostname.endsWith(`.${localDomain}`)) {
        // Local dev: stores24.localhost:3000
        subdomain = hostname.replace(`.${localDomain}`, "");
    }

    // If the subdomain is "stores24", rewrite to /stores24 path
    if (subdomain === "stores24") {
        // Prevent double-prefixing: if the URL already starts with /stores24, don't add it again
        if (!url.pathname.startsWith("/stores24")) {
            url.pathname = `/stores24${url.pathname}`;
        }
        return NextResponse.rewrite(url);
    }

    // Route lifeos subdomain to locally hosted static app in /public/lifeos
    if (subdomain === "lifeos") {
        if (url.pathname.startsWith("/lifeos/")) {
            return NextResponse.rewrite(url);
        }

        if (url.pathname === "/") {
            url.pathname = "/lifeos/index.html";
            return NextResponse.rewrite(url);
        }

        if (url.pathname.startsWith("/assets/") || url.pathname === "/favicon.ico") {
            url.pathname = `/lifeos${url.pathname}`;
            return NextResponse.rewrite(url);
        }

        // SPA fallback
        url.pathname = "/lifeos/index.html";
        return NextResponse.rewrite(url);
    }

    // Route vmart/vemgalmart subdomain to locally hosted static app in /public/vmart
    if (subdomain === "vmart" || subdomain === "vemgalmart") {
        if (url.pathname.startsWith("/vmart/")) {
            return NextResponse.rewrite(url);
        }

        if (url.pathname === "/") {
            url.pathname = "/vmart/index.html";
            return NextResponse.rewrite(url);
        }

        const vmartRootFiles = new Set([
            "/vite.svg",
            "/manifest.webmanifest",
            "/sw.js",
            "/firebase-messaging-sw.js",
        ]);

        if (
            url.pathname.startsWith("/assets/") ||
            vmartRootFiles.has(url.pathname) ||
            /^\/workbox-[^/]+\.js$/.test(url.pathname)
        ) {
            url.pathname = `/vmart${url.pathname}`;
            return NextResponse.rewrite(url);
        }

        // SPA fallback
        url.pathname = "/vmart/index.html";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}
