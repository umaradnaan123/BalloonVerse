import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/temp/", "/_next/static/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Yandex", "Applebot"],
        allow: "/",
      }
    ],
    sitemap: "https://balloon-verse.vercel.app/sitemap.xml",
  };
}
