import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://balloonverse.vercel.app";
  const routes = [
    "",
    "/addition-balloon-game",
    "/subtraction-balloon-game",
    "/multiplication-balloon-game",
    "/division-balloon-game",
    "/kindergarten-math-games",
    "/grade-1-math-games",
    "/grade-2-math-games",
    "/grade-3-math-games",
    "/grade-4-math-games",
    "/math-games-for-kids",
    "/educational-games",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
