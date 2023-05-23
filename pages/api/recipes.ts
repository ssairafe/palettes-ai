import RecipeInput from '../../interfaces/RecipeInput';

export const fetchRecipes = (input: RecipeInput) => {
  return fetch('http://localhost:5000/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input })
  })
    .then((response) => response.json());
};
