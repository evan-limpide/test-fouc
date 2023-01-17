import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Link from '@mui/material/Link';
import { makeStyles } from "tss-react/mui";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles()((theme) => ({
    box: {
      margin: '20px'
    }
  })
)

export default function App() {
  const {classes} = useStyles();
  return (
    <Container maxWidth="sm">
      <Box className={classes.box}>
        <Typography variant="h4" component="h1" gutterBottom>
          Server-side rendering example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
