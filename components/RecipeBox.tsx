import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

interface RecipeBoxProps {
  recipeInfo: {
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
  };
}

const RecipeBox: React.FC<RecipeBoxProps> = ({ recipeInfo }) => {
  const { name, description, ingredients, steps } = recipeInfo;

  let stepElements = steps.map((step: string, i) => {
    return (
      <ListItem
        key={`steps${i}`}
      >
        <ListItemText primary={step} />
      </ListItem>
    )
  })

  let ingredientsElements = ingredients.map((ingredient: string, i) => {
    return (
      <ListItem
        key={`ingredient${i}`}
      >
        <ListItemText primary={ingredient} />
      </ListItem>
    )
  })

  return (
    <Box sx={{
    }}
    >
      <Typography component="h2"
        sx={{
          marginBottom: '0.5rem',
          fontSize: '2.5rem'
        }}
      >{name}</Typography>
      <Typography component="h2"
        sx={{
          marginBottom: '0.25rem',
          fontSize: '1.5rem'
        }}
      >{description}</Typography>
      <List>{ingredientsElements}</List>
      <List>{stepElements}</List>
    </Box>
  )

};

export default RecipeBox;
