import { NextResponse } from "next/server";

export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://balloon-verse.vercel.app/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    },
  });
}
