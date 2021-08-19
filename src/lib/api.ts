import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import * as dateFns from "date-fns"

import PostType from "../types/post"

const postsDirectory = join(process.cwd(), "_posts")

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(
  slug: string,
  fields: string[] = []
): Partial<PostType> {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  } & {
    tags?: string | string[]
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug
    }
    if (field === "content") {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }

    if (field === "tags") {
      const tags = items[field] || []
      if (typeof tags === "string") {
        items[field] = (tags || "").split(" ")
      }
    }
  })

  const result = {
    ...items,
    tags: typeof items.tags === "string" ? items.tags.split(" ") : items.tags,
  }

  return result
}

export function getAllPosts(fields: (keyof PostType)[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => ((post1.date || "") > (post2.date || "") ? -1 : 1))
    .sort((post1, post2) => (Number(post1.slug) > Number(post2.slug) ? -1 : 1))
  return posts
}

export function getAllTags() {
  const posts = getAllPosts(["slug", "tags"])
  const tags = posts
    .reduce((acc, { tags }) => acc.concat(tags || ""), [] as string[])
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
    .sort()
  return tags
}
