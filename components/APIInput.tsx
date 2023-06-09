import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import styles from '../styles/page.module.css'
import RecipeInput from '../interfaces/RecipeInput';

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
    <Box className={styles.input}>
      <Box sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id="outlined-basic"
          label="Enter your word to find color palettes that match" variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTerm(event.target.value); }}
        />
      </Box>
      <Box sx={{ padding: '0 0.5rem'}}>
        <Button
          variant="contained"
          sx={{ fontFamily: 'Poppins' }}
          onClick={(e: { preventDefault: () => void; }) => {
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
    <Box className={styles.form}>
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
        sx={{ fontFamily: 'Poppins' }}
        onClick={(e: { preventDefault: () => void; }) => {
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

  let content: React.ReactNode | undefined = undefined;

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
