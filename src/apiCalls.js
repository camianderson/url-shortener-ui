export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrls = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newUrl)
  })
      .then(response => response.json())
}

export const deleteUrl = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/${id}`, { method: 'DELETE' })
}
