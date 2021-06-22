import { FC, ReactNode } from "react"
import Appbar from "../Appbar"
import { createHOC } from "../hoc"

const PageLayout: FC<{
  backgroundImageSource?: string
  title?: string
  date?: string
  masthead?: (props: { title?: string; date?: string }) => ReactNode
}> = (props) => {
  const { children, backgroundImageSource, title, date, masthead } = props

  return (
    <>
      <div style={{ position: "relative" }}>
        <Appbar />
        <div style={{ height: 350 - 74 }}>
          {masthead && masthead({ title, date })}
        </div>
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
      </div>
      <div style={{ maxWidth: 960, margin: "16px auto" }}>{children}</div>
    </>
  )
}

export default PageLayout

export const withPageLayout = createHOC(PageLayout)
