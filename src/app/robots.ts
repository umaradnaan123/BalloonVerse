import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/temp/"],
      },
    ],
    sitemap: "https://balloon-verse.vercel.app/sitemap.xml",
  };
}
