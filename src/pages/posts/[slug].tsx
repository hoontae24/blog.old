import { useRouter } from "next/router"
import ErrorPage from "next/error"
import { getPostBySlug, getAllPosts } from "../../lib/api"
import markdownToHtml from "../../lib/markdownToHtml"
import PostType from "../../types/post"
import { withPageLayout } from "../../components/layouts/PageLayout"
import moment from "moment"
import "github-markdown-css/github-markdown.css"
import Tag from "../../components/Tag"

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div style={{ paddingBottom: 120 }}>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div style={{ marginTop: 40 }}>
        {post.tags?.map?.((tag) => {
          return <Tag key={tag} tag={tag} />
        })}
      </div>
    </div>
  )
}

export default withPageLayout({
  maxWidth: 720,
  masthead: (props) => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          // backgroundColor: "#00000050",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 720,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <h1 style={{ color: "white", fontSize: 35 }}>{props.title}</h1>
            <h2 style={{ color: "white" }}>{props.subtitle}</h2>
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: 12,
              color: "white",
              fontWeight: 300,
            }}
          >
            {moment(props.date).format("YYYY.MM.DD")}
          </span>
        </div>
      </div>
    )
  },
})(Post)

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "subtitle",
    "date",
    "slug",
    "author",
    "content",
    "background",
    "tags",
  ])
  const content = await markdownToHtml(post.content || "")

  return {
    props: {
      backgroundImageSource: post.background,
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}
