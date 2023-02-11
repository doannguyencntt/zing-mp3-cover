export function saveObject(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function getObject(key) {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data) || false
  } catch {
    return false
  }
}