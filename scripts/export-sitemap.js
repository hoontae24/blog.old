const fs = require('fs/promise')

(async () => {
  const ROOT = './out'
  const nodes = []
  const traverse = async (path) => {
    const children = await fs.readdir(`${ROOT}/` + path)
    for (const child of children) {
      const childPath = `${path}/${child}`
      if (childPath.match(/\.html$/)) {
        nodes.push(childPath)
      }
      if ((await fs.stat(`${ROOT}/` + childPath)).isDirectory()) {
        await traverse(childPath)
      }
    }
  }
  await traverse('')
  await fs.writeFile(ROOT + '/sitemap.txt', nodes.map((path) => 'https://hoontae24.github.io' + path).join('\n'))
  await fs.readFile(ROOT + '/sitemap.txt', 'utf8').then(console.log)
})().catch(console.error)
