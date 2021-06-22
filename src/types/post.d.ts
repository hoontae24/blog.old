interface PostType {
  slug: string
  title: string
  subtitle: string
  author: string
  date: string
  category: string
  tags: string[]
  background: string
  content: string
  hidden: boolean
  seriesId: number
}

export default PostType
