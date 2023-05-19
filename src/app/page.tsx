"use client";
import styles from './page.module.css'
import { useState } from 'react'
import {Button, Box, TextField} from '@mui/material';

 function Home() {
 const [term, setTerm] = useState('');
   const [paletteData, setpaletteData] = useState<JSX.Element[]>([]);

  const askForPalettes = (input: string): Promise<void> =>
  fetch('http://localhost:5001/data', {
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
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Palettes AI</h1>
      </div>
      <div className={styles.description}>
        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Enter your word to find color palettes that match" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTerm(event.target.value);
        }} />
        <div>
          <Button variant="contained"
            onClick={() => {
              askForPalettes(term);
            }}
          >GENERATE</Button>
        </div>
      </div>
      <div className={styles.grid}>
            {paletteData}
      </div>
    </main>
  )
}

export default Home;
