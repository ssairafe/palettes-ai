import React from 'react';
import { Box, Typography } from '@mui/material';

interface ColorPaletteBoxProps {
  paletteItem: [string, string[][]];
}

const ColorPaletteBox: React.FC<ColorPaletteBoxProps> = ({paletteItem}) => {
  let paletteTitle = paletteItem[0];
  let paletteColors = paletteItem[1].map((hex: string[], i) => {
    return (
      <Box sx={{ alignItems: 'center', backgroundColor: hex[0], display: 'flex', height: '6rem', width: '4rem' }} key={`${paletteTitle}${i}`}>
        <Typography sx={{ color: hex[1], transform: 'rotate(90deg)' }}>{hex[0]}</Typography>
      </Box>
    )
  })

  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 'auto',
      maxWidth: '15rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    }}
    >
      <Typography component="h3"
      sx={{
        marginBottom: '0.5rem'
      }}
      >{paletteTitle}</Typography>
      <Box sx={{ display: 'flex' }}>{paletteColors}</Box>
    </Box>
  )

};

export default ColorPaletteBox;
