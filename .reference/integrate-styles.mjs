import fs from 'node:fs'
import postcss from 'postcss'
const source = fs.readFileSync('C:/Users/lenovo/.codex/attachments/65bb1d7a-353f-472a-b16a-1989213338b3/pasted-text.txt', 'utf8')
const root = postcss.parse(source)
root.walkAtRules('import', rule => rule.remove())
root.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return
  rule.selectors = rule.selectors.map(selector => {
    if (/^(body|html|:root)$/.test(selector.trim())) return '.integrated-pages'
    return `.integrated-pages ${selector}`
  })
})
fs.writeFileSync('src/IntegratedPages.css', '/* Supplied page styles, scoped to the integrated pages. */\n' + root.toString())
