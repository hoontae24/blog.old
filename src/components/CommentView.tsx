import { DiscussionEmbed } from "disqus-react"

type Props = {
  url: string
  id: string
  title: string
}

const CommentView = (props: Props) => {
  const { url, id, title } = props
  return (
    <>
      <DiscussionEmbed
        shortname="itsdone"
        config={{
          url: url,
          identifier: id,
          title: title,
        }}
      />
    </>
  )
}

export default CommentView
