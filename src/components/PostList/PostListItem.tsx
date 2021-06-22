import { Typography } from "antd"
import * as dateFns from "date-fns"
import PostType from "../../types/post"
import Paper from "../Paper"
import Tag from "../Tag"
import style from "./PostListItem.module.css"

interface Props {
  post: PostType
  urlPrefix?: string
}

const PostListItem = (props: Props) => {
  const { post, urlPrefix } = props
  return (
    <Paper className={style.root} elevation={2}>
      <div className={style.image}>
        <img src={post.background} />
      </div>
      <div className={style.content}>
        <a href={`${urlPrefix}/${post.slug}`}>
          <Typography.Title level={5}>{post.title}</Typography.Title>
        </a>
        <div className={style.subtitleArea}>
          <Typography.Text className={style.subtitle}>
            {(post.subtitle || post.content || "").slice(0, 100)}
          </Typography.Text>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div className={style.meta}>
          <Typography.Text type="secondary">
            {dateFns.format(new Date(post.date), "yyyy.MM.dd")}
          </Typography.Text>
          <div className={style.tags}>
            {post.tags?.map?.((tag) => {
              return <Tag key={tag} tag={tag} />
            })}
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default PostListItem
