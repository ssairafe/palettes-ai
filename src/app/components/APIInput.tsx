import React, { FormEventHandler } from 'react';
import { useState } from 'react'
import { Button, Box, TextField } from '@mui/material';
import styles from '../page.module.css'

interface RecipeInput {
  country: string | null;
  dish: string | null;
  foodRestrictions: string | null;
}

interface MyComponentProps {
  formSubmitHandler: (input: RecipeInput) => Promise<void>;
  submitHandler: (input: string) => Promise<void>;
  view: string;
}

const APIInput: React.FC<MyComponentProps> = ({ formSubmitHandler, submitHandler, view }) => {
  const [term, setTerm] = useState('');
  const [recipeRequest, setRecipeRequest] = useState({
    country: '',
    dish: '',
    foodRestrictions: ''
  });



  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeRequest({
      ...recipeRequest,
      [event.target.name]: event.target.value,
    });
  };

  const colorsInputElement = (
    <Box className={styles.description}>
      <Box sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id="outlined-basic"
          label="Enter your word to find color palettes that match" variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTerm(event.target.value); }}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            submitHandler(term);
          }}
        >
          GENERATE
        </Button>
      </Box>
    </Box>
  );

  const recipeFormElement = (
    <Box>
      <TextField
        label="Dish name"
        name="dish"
        value={recipeRequest.dish}
        onChange={handleFormChange}
        fullWidth
      />
      <TextField
        label="Dish country of origin or style"
        name="country"
        value={recipeRequest.country}
        onChange={handleFormChange}
        fullWidth
      />
      <TextField
        label="Comma separated food restrictions"
        name="foodRestrictions"
        value={recipeRequest.foodRestrictions}
        onChange={handleFormChange}
        fullWidth
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          formSubmitHandler(recipeRequest);
        }}
        variant="contained"
        color="primary"
        >
        Submit
      </Button>
    </Box>
  );

  let content: React.JSX.Element | undefined = undefined;

  switch (view) {
    case 'colors':
      content = colorsInputElement;
      break;
    case 'recipes':
      content = recipeFormElement;
      break;
  }

  return <>{content}</>;

};

export default APIInput;
