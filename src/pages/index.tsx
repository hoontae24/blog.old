import { Button, Typography } from "antd"

import { getAllPosts, getAllTags } from "../lib/api"
import Post from "../types/post"
import { withPageLayout } from "../components/layouts/PageLayout"
import PostList from "../components/PostList"
import Tag from "../components/Tag"
import Paper from "../components/Paper"
import { GetStaticProps } from "next"

type Props = {}

const Index = ({}: Props) => {


  return null
}

export default withPageLayout()(Index)
