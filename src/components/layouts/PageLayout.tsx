import Head from "next/head"
import { FC, ReactNode } from "react"
import PostType from "../../types/post"
import Appbar from "../Appbar"
import { createHOC } from "../hoc"

const PageLayout: FC<{
  getPageTitle?: (props: {
    post?: PostType
  }) => number | string | undefined | null
  backgroundImageSource?: string
  post?: PostType
  masthead?: (props: {
    title?: string
    subtitle?: string
    date?: string
  }) => ReactNode
  maxWidth?: number
}> = (props) => {
  const {
    children,
    getPageTitle,
    backgroundImageSource,
    post,
    masthead,
    maxWidth,
  } = props

  const pageTitle = getPageTitle?.(props) || ""

  return (
    <>
      <Head>{pageTitle && <title>{pageTitle}</title>}</Head>
      <div style={{ position: "relative" }}>
        <img
          src={backgroundImageSource}
          style={{
            zIndex: -1,
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            zIndex: -1,
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#00000050",
          }}
        ></div>
        <Appbar />
        <div style={{ height: 350 - 74, color: "white" }}>
          {masthead && masthead({ ...post })}
        </div>
      </div>
      <div style={{ maxWidth: maxWidth || 960, margin: "16px auto" }}>
        {children}
      </div>
    </>
  )
}

export default PageLayout

export const withPageLayout = createHOC(PageLayout)
