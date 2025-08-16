import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import createSlug from "../lib/createSlug";


export async function GET(context) {
  const blog = await getCollection("leaflet");
  return rss({
    title: "coastweb.dev",
    description: "MCP for curious developers",
    site: import.meta.env.SITE,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/leaflet/${createSlug(post.data.title)}/`,
    })),
  });
}
