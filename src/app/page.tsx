"use client";
import styles from './page.module.css'
import { useState } from 'react'
import {Button, Box, TextField} from '@mui/material';
import APIInput from './components/APIInput';

interface RecipeInput {
  country: string | null;
  dish: string | null;
  foodRestrictions: string | null;
}

function Home() {
  const [paletteData, setpaletteData] = useState<JSX.Element[]>([]);
  const [recipe, setrecipe] = useState('');
  const [view, setView] = useState('');

  const askForRecipe = (input: RecipeInput): Promise<void> =>
    fetch('http://localhost:5000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.recipe);
        setrecipe(res.recipe);
      })
      .catch((error) => {
        console.error(error);
      })

  const askForPalettes = (input: string): Promise<void> =>
    fetch('http://localhost:5000/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.palettes);
        const tempPalettes = Object.entries(res.palettes as Record<string, string[]>).map((pal: [string, string[]]) => {
          let paletteTitle = pal[0];
          let paletteColors = pal[1].map((hex: string) => {
            return <Box sx={{backgroundColor: hex, width: '2rem', height: '4rem'}}></Box>
          })
          return (
          <Box>
            <h3>{paletteTitle}</h3>
            <Box sx={{display: 'flex'}}>{paletteColors}</Box>
          </Box>
          )
        });
        setpaletteData(tempPalettes);
      })
      .catch((error) => {
        console.error(error);
      })

  return (
    <Box className={styles.main}>
      {view === '' ? (
        <>
          <Box className={styles.center}>
            <h1>Select Palette AI</h1>
          </Box>
          <Box className={styles.description}>
            <Box>
              <Box sx={{
                  '@media (min-width: 720px)': {
                    marginRight: '12px',
                  }
                }}>
                <Button
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
                variant="contained"
                onClick={() => {
                  setView('recipes');
                }}
              >
                Food Palettes
              </Button>
            </Box>
          </Box>
          <Box className={styles.grid}>{paletteData}</Box>
        </>
      ) : (
        <>
            <Box className={styles.homeButtonContainer}>
              <Button
                variant="contained"
                onClick={() => {
                  setView('');
                }}
              >
                Home
              </Button>
          </Box>
          <Box className={styles.center}>
              <h1>{view === 'colors' ? <span>Color</span> : <span>Food</span>} Palettes AI</h1>
          </Box>
          <APIInput view={view} submitHandler={askForPalettes} formSubmitHandler={askForRecipe} />

          {
            view === 'colors' ?
            <Box className={styles.grid}>{paletteData}</Box> :
            <Box className={styles.recipe}>{recipe}</Box>
          }
        </>
      )}
    </Box>
  );
}

export default Home;
