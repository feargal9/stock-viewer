const fetchConfig = {
  method: 'GET',
  cors: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

function api<T>(url: string): Promise<T> {
  return fetch(url, fetchConfig)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
    .catch((error: Error) => {
      throw error
    })
}

export default api;