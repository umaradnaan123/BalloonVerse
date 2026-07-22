import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://balloon-verse.vercel.app";
  const routes = [
    "",
    "/addition-balloon-game",
    "/subtraction-balloon-game",
    "/multiplication-balloon-game",
    "/division-balloon-game",
    "/math-worksheets",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.9,
  }));
}
