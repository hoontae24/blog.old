import { GithubOutlined } from "@ant-design/icons"
import { Button, PageHeader, Typography } from "antd"
import { VFC } from "react"

import config from "../../../_data/config.json"
import style from "./Appbar.module.css"

const Appbar: VFC = () => {
  const titleElement = (
    <Button type="link" href="/">
      <Typography.Title level={4} style={{ color: "white" }}>
        {config.title}
      </Typography.Title>
    </Button>
  )

  const extraElement = (
    <div className={style["extra"]}>
      <Button type="link" href={config.github} target="_blank">
        <Typography.Title level={3}>
          <GithubOutlined />
        </Typography.Title>
      </Button>
    </div>
  )

  return (
    <PageHeader
      className={style["appbar-root"]}
      title={titleElement}
      extra={extraElement}
    />
  )
}

export default Appbar
