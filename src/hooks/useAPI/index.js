const useAPI = () => {
  const url = '/api'

  return [
    async (path, method, body) => {
      try {
        let data = []
        if (method === 'GET') {
          const res = await fetch(`${url}${path}`)
          data = await res.json()
          return data
        }
        if (method === 'POST') {
          const res = await fetch(`${url}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
          data = await res.json()
          return data
        }
        if (method === 'PUT') {
          const res = await fetch(`${url}${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
          data = await res.json()
          return data
        }
      } catch (err) {
        console.error(err.message)
      }
    }
  ]
}

export default useAPI
