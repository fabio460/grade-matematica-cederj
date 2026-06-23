import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function PrimeiroPeriodo() {
  return (
    <div>
        <Card>
            <CardHeader title="titulo" sx={{color:"Highlight", textDecorationColor:"GrayText"}}>
                header ssss
            </CardHeader>
            
            <CardContent>constens</CardContent>
            <CardActions>actions</CardActions>
        </Card>
        <Box sx={{ flexGrow: 2, marginTop:"15px" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Item>Primeiro período</Item>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ flexGrow: 2, marginTop:"15px" }}>
            <Grid container spacing={2}>
                <Grid size={3}>
                  <Item>size=8</Item>
                </Grid>
                <Grid size={3}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={3}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={3}>
                  <Item>size=8</Item>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ flexGrow: 2, marginTop:"15px" }}>
            <Grid container spacing={2}>
                <Grid size={3}>
                  <Item>size=8</Item>
                </Grid>
                <Grid size={3}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={3}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={3}>
                  <Item>size=8</Item>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}
