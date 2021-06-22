import PostType from "../../types/post"
import PostListItem from "./PostListItem"

interface Props {
  posts: PostType[]
  urlPrefix?: string
}

const PostList = (props: Props) => {
  return (
    <div>
      {props.posts.map((post) => (
        <PostListItem key={post.slug} post={post} urlPrefix={props.urlPrefix} />
      ))}
    </div>
  )
}

export default PostList
