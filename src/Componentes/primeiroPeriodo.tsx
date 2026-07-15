import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { listaDisciplinas } from './listaDeMaterias';
import { alterarSelecaoDisciplina, g1DomingoManha, g1DomingoTarde, g1SabadoManha, g1SabadoTarde, g2DomingoManha, g2DomingoTarde, g2SabadoManha, g2SabadoTarde, getDisciplinaByCodigo } from '../metodosGerais';

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

let listaAlterada = [...listaDisciplinas];



const handleSelecionado = (codigo:string)=>{
  if(getDisciplinaByCodigo(codigo, listaAlterada)?.selecionado){
    listaAlterada = alterarSelecaoDisciplina(listaAlterada, codigo, false);
    console.log(g1SabadoManha(listaAlterada));
    return null
  }
  listaAlterada = alterarSelecaoDisciplina(listaAlterada, codigo, true);
  console.log(g1SabadoManha(listaAlterada));
  return null
}
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
                <Grid size={6}>
                    <Item>G1</Item>
                </Grid>
                  <Grid size={6}>
                    <Item>G2</Item>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ flexGrow: 2, marginTop:"15px" }}>
            <Grid container spacing={2}>
                <Grid size={3}>
                  <Item>
                    <h3>Sabado Manha</h3>
                    {
                      g1SabadoManha(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
                <Grid size={3}>
                  <Item>
                    <h3>Domingo Manha</h3>
                    {
                      g1DomingoManha(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
                <Grid size={3}>
                  <Item>
                    
                    <h3>Sabado Manha</h3>
                    {
                      g2SabadoManha(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
                <Grid size={3}>
                  <Item>
                    
                    <h3>Domingo Manha</h3>
                    {
                      g2DomingoManha(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ flexGrow: 2, marginTop:"15px" }}>
            <Grid container spacing={2}>
                <Grid size={3}>
                  <Item>
                    <h3>Sabado Tarde</h3>
                    {
                      g1SabadoTarde(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
                <Grid size={3}>
                  <Item>
                    <h3>Domingo Tarde</h3>
                    {
                      g1DomingoTarde(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
                <Grid size={3}>
                  <Item>
                    
                    <h3>Sabado Tarde</h3>
                    {
                      g2SabadoTarde(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
                <Grid size={3}>
                  <Item>
                    
                    <h3>Domingo Tarde</h3>
                    {
                      g2DomingoTarde(listaAlterada).map(e=>{
                        return <div onClick={()=> handleSelecionado(e.codigo)}>{e.nome}</div>
                      })
                    }
                  </Item>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}
