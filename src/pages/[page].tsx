import { Button, Typography } from "antd"

import { getAllPosts, getAllTags } from "../lib/api"
import Post from "../types/post"
import { withPageLayout } from "../components/layouts/PageLayout"
import PostList from "../components/PostList"
import Tag from "../components/Tag"
import Paper from "../components/Paper"
import { GetStaticProps } from "next"

type Props = {
  page: number
  pageCount: number
  allPosts: Post[]
  allTags: string[]
}

const Index = ({ page, pageCount, allPosts, allTags }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <PostList posts={allPosts} urlPrefix={`/posts`} />
        <div
          style={{
            margin: 16,
            marginBottom: 50,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button href={`/${page - 1}`} disabled={page <= 1}>
            &lt;&nbsp;PREV
          </Button>
          <Button href={`/${page + 1}`} disabled={page >= pageCount}>
            NEXT&nbsp;&gt;
          </Button>
        </div>
      </div>
      <Paper
        elevation={2}
        style={{
          alignSelf: "flex-start",
          width: 250,
          marginLeft: 16,
          padding: 16,
        }}
      >
        <Typography.Title level={5}>Tags</Typography.Title>
        {allTags.map((tag) => {
          return (
            <Tag
              key={tag}
              tag={tag}
              style={{ marginRight: 4, marginBottom: 4 }}
            />
          )
        })}
      </Paper>
    </div>
  )
}

export default withPageLayout({
  masthead: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 55,
      }}
    >
      <h1 style={{ color: "white" }}>POST</h1>
    </div>
  ),
})(Index)

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = Number(ctx.params?.page) || 1

  const allPosts = getAllPosts([
    "title",
    "subtitle",
    "date",
    "slug",
    "author",
    "background",
    "tags",
    "content",
  ]).map((post) => ({ ...post, content: (post.content || "").slice(0, 100) }))
  const postCount = allPosts.length
  const pageCount = Math.max(1, Math.ceil(postCount / 10))

  const allTags = getAllTags()

  return {
    props: {
      page,
      pageCount,
      backgroundImageSource: "/img/bg-post.jpg",
      allPosts: allPosts.slice((page - 1) * LIMIT, page * LIMIT),
      allTags,
    },
  }
}

const LIMIT = 10

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])
  const postCount = posts.length
  const pageCount = Math.max(1, Math.ceil(postCount / 10))
  return {
    paths: new Array(pageCount)
      .fill(true)
      .map((_, i) => ({ params: { page: String(i + 1) } })),
    fallback: false,
  }
}
