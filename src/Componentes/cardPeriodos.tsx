import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import type { Disciplina } from './listaDeMaterias';
import { handleHabilitado, preRequisito, trocaObjeto } from '../metodosGerais';
import { Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  
}));


export default function CardPeriodos({periodo,lista,grupo, horario, diaDaSemana}:{lista:Disciplina[],periodo:number, grupo?:'G1'|'G2',horario?:'manhã (9:30 até 12:00)'|'tarde (13:30 até 16:00)',diaDaSemana?:'sábado'|'domingo',}) {
      
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {          
        const objString = event.target.name;
        const objJson:Disciplina = JSON.parse(objString) as Disciplina;
        objJson.selecionado = event.target.checked;
        trocaObjeto(objJson,periodo)
      };
  return (
    <Item>
      <h3 style={{textAlign:'center'}}>{diaDaSemana} - {horario}</h3>
      {
          lista.map((disciplina, key)=>{
              if(disciplina.grupo===grupo
              && disciplina.horario===horario
              && disciplina.diaDaSemana===diaDaSemana 
             // && disciplina.habilitado             
              ) 
              return <div key={key}>
                <FormControlLabel disabled={
                   disciplina.habilitado ? false : true
                  } control={
                  <Checkbox 
                    defaultChecked={disciplina.selecionado} 
                    onChange={handleChange} 
                    name={JSON.stringify(disciplina)
                    
                  }/>
                } 
                  label={disciplina.habilitado ? '' : ''}
                 />
                  <Tooltip title={disciplina.habilitado ? '' : 
                    <div>
                      <h3 style={{textAlign:"center"}}>Pré-requisito</h3>
                      <div>{disciplina.preRequisito.split(',').map((e,key)=><div key={key}>{e}</div>)}</div>
                    </div>                    
                    } arrow placement="right">
                    <span> {disciplina.nome}</span>          
                  </Tooltip>                     
              </div>          
          })
      }     
    </Item>
  );
}
