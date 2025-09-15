import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { listaDisciplinas, type Disciplina } from './listaDeMaterias';
import CardPeriodos from './cardPeriodos';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '',
  }),
}));

export default function BasicGrid({periodo,lista=listaDisciplinas}: {periodo:number,lista: Disciplina[]}) {
    
  return (
    <Box sx={{ flexGrow: 5 , padding:"1%", backgroundColor:""}}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Item style={{textAlign:'center',background:'', marginTop:"60px"}}>{periodo}° período</Item>
        </Grid>
        <Grid size={6}>
          <Item>Grupo 1</Item>
        </Grid>
        <Grid size={6}>
          <Item>Grupo 2</Item>
        </Grid>
        <Grid size={3}>
           <CardPeriodos periodo={periodo} lista={lista} grupo='G1' horario='manhã (9:30 até 12:00)' diaDaSemana='sábado'/> 
        </Grid>
        <Grid size={3}>
          <CardPeriodos periodo={periodo} lista={lista} grupo='G1' horario='manhã (9:30 até 12:00)' diaDaSemana='domingo'/> 
        </Grid>
        <Grid size={3}>
          <CardPeriodos periodo={periodo} lista={lista} grupo='G2' horario='manhã (9:30 até 12:00)' diaDaSemana='sábado'/> 
        </Grid>
        <Grid size={3}>
          <CardPeriodos periodo={periodo} lista={lista} grupo='G2' horario='manhã (9:30 até 12:00)' diaDaSemana='domingo'/> 
        </Grid>
        <Grid size={3}>
          <CardPeriodos periodo={periodo} lista={lista} grupo='G1' horario='tarde (13:30 até 16:00)' diaDaSemana='sábado'/> 
        </Grid>
        <Grid size={3}>
          <Item>
            <CardPeriodos periodo={periodo} lista={lista} grupo='G1' horario='tarde (13:30 até 16:00)' diaDaSemana='domingo'/> 
          </Item>
        </Grid>
        <Grid size={3}>
          <Item>
            <CardPeriodos periodo={periodo} lista={lista} grupo='G2' horario='tarde (13:30 até 16:00)' diaDaSemana='sábado'/> 
          </Item>
        </Grid>
        <Grid size={3}>
          <Item>
            <CardPeriodos periodo={periodo} lista={lista} grupo='G2' horario='tarde (13:30 até 16:00)' diaDaSemana='domingo'/> 
          </Item>
        </Grid>
        <Grid size={12}>
            <CardPeriodos periodo={periodo} lista={lista}/> 
        </Grid>
      </Grid>
    </Box>
  );
}
