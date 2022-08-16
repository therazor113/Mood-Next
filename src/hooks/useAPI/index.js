const useAPI = async (path, method, body) => {
  const url = 'http://localhost:3000/api'
  let data = []

  if (method === 'GET') {
    const res = await fetch(`${url}${path}`)
    data = await res.json()
  }
  if (method === 'POST') {
    const res = await fetch(`${url}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    data = await res.json()
  }
  if (method === 'PUT') {
    const res = await fetch(`${url}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    data = await res.json()
  }
  return data
}

export default useAPI
