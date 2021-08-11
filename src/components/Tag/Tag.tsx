import { Tag as AntdTag } from "antd"
import { CSSProperties } from "react"
import style from "./Tag.module.css"

const Tag = ({
  tag,
  ...props
}: {
  tag: string
  className?: string
  style?: CSSProperties
}) => {
  return (
    // <a href={`/tags#${encodeURIComponent(tag)}`}>
      <AntdTag className={style.tag} color="blue" {...props}>
        {tag}
      </AntdTag>
    // </a>
  )
}

export default Tag
