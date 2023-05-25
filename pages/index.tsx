import styles from '../styles/page.module.css';
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import APIInput from '../components/APIInput';
import ColorPaletteBox from '../components/ColorPaletteBox';
import { fetchRecipes } from './api/recipes';
import { fetchColors } from './api/colors';
import RecipeInput from '../interfaces/RecipeInput';
import RecipeBox from '@/components/RecipeBox';


function Home() {
  const [paletteData, setpaletteData] = useState({});
  const [recipeData, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    steps: []
  });
  const [view, setView] = useState('');

  const createPaletteElements = () => {
    let elements;
    let palletElements = Object.entries(paletteData as Record<string, string[][]>).map((pal: [string, string[][]]) => {
      return <ColorPaletteBox paletteItem={pal} />
    }) || [];

    if (palletElements.length) {
      elements = palletElements;
    } else {
      elements = <Typography>Search for results</Typography>
    }

    return elements
  }

  let palettes = createPaletteElements();

  const recipeElement = recipeData.ingredients.length ? <RecipeBox recipeInfo={recipeData} /> : <Typography>Search for results</Typography>;


  const askForRecipe = (input: RecipeInput): Promise<void> =>
    fetchRecipes(input)
      .then((res) => {
        console.log(res.recipe);
        setRecipe(res.recipe);
      })
      .catch((error) => {
        setView('error');
        console.error(error.error);
      })

  const askForPalettes = (input: string): Promise<void> =>
    fetchColors(input)
      .then((res) => {
          setpaletteData(res.palettes);
      })
      .catch((error) => {
        setView('error');
        console.error(error.error);
      })

  return (
    <Box className={styles.main}>
      {view === '' ? (
        <>
          <Box className={styles.center}>
            <Typography component="h1" sx={{fontFamily: 'Poppins', fontSize: '3rem'}}>Select Palette AI</Typography>
          </Box>
          <Box className={styles.input}>
            <Box>
              <Box sx={{
                '@media (min-width: 720px)': {
                  marginRight: '12px',
                }
              }}>
                <Button
                  sx={{ fontFamily: 'Poppins' }}
                  variant="contained"
                  onClick={() => {
                    setView('colors');
                  }}
                >
                  Color Palettes
                </Button>
              </Box>
            </Box>
            <Box sx={{
              '@media (min-width: 720px)': {
                marginLeft: '12px',
              }
            }}>
              <Button
                sx={{ fontFamily: 'Poppins' }}
                variant="contained"
                onClick={() => {
                  setView('recipes');
                }}
              >
                Food Palettes
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box className={styles.homeButtonContainer}>
            <Button
              sx={{ fontFamily: 'Poppins' }}
              variant="contained"
              onClick={() => {
                setView('');
              }}
            >
              Home
            </Button>
          </Box>
          <Box className={styles.center}>
              <Typography component="h1" sx={{ fontFamily: 'Poppins', fontSize: '3rem' }}>{view === 'colors' ? <span>Color</span> : <span>Food</span>} Palettes AI</Typography>
          </Box>
          <APIInput view={view} submitHandler={askForPalettes} formSubmitHandler={askForRecipe} />

          {
            view === 'error' ?
              <Box className={styles.recipe}>Something went wrong, please try again!</Box> :
            view === 'colors' ?
              <Box className={styles.grid}>{palettes}</Box> :
                  <Box className={styles.recipe}>{recipeElement}</Box>
          }
        </>
      )}
    </Box>
  );
}


export default Home;
