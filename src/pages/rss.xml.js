import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
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
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/leaflet/${createSlug(post.data.title)}/`,
    })),
  });
}
