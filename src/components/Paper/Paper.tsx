import classNames from "classnames"
import { CSSProperties, FC } from "react"
import style from "./Paper.module.css"

type Elevation =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24

const Paper: FC<{
  className?: string
  elevation?: Elevation
  style?: CSSProperties
}> = (props) => {
  const { className, elevation, ...rest } = props
  return (
    <div
      className={classNames(
        className,
        elevation && style[`elevation-${elevation}`]
      )}
      {...rest}
    />
  )
}

export default Paper
