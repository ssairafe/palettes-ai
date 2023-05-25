export const fetchColors = (input: string) => {
  return fetch('http://localhost:5000/colors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input })
  })
    .then((response) => response.json())
};
