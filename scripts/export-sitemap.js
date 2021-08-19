const fs = require("fs/promises")
;(async () => {
  const ROOT = "./out"
  const nodes = []
  const traverse = async (path) => {
    const children = await fs.readdir(`${ROOT}/` + path)
    for (const child of children) {
      const childPath = `${path}/${child}`
      if (childPath.match(/index\.html$/)) {
        nodes.push(`${path}/`)
      }
      if (childPath.match(/\.html$/)) {
        nodes.push(childPath)
      }
      if ((await fs.stat(`${ROOT}/` + childPath)).isDirectory()) {
        await traverse(childPath)
      }
    }
  }
  await traverse("")
  await fs.writeFile(
    ROOT + "/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nodes
  .map((path) => {
    const url = "https://hoontae24.github.io" + path
    return `  <url>
    <loc>${url}</loc>
    </url>`
  })
  .join("\n")}
</urlset>
`
  )
  await fs.readFile(ROOT + "/sitemap.xml", "utf8").then(console.log)
})().catch(console.error)
