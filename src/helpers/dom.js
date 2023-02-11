export function setTheme(theme) {
  if (!theme) return
  const attr = document.createAttribute('data-theme')
  attr.value = theme
  document.body.setAttributeNode(attr)
}