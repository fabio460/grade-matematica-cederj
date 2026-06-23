import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import type { Disciplina } from './listaDeMaterias';
import { getDisciplina, getNomeDaDisciplinaStorage, removeNomeDaDisciplinaStorage, setNomeDaDisciplinaStorage } from '../metodosGerais';

export default function SelectMaterias({handleChange2,lista, diaDaSemana, grupo, horario}: {handleChange2:any,lista:Disciplina[], grupo:string,horario:string,diaDaSemana:string}) {
  const nomeStorage = diaDaSemana + grupo + horario
  const [age, setAge] = React.useState<string>(getNomeDaDisciplinaStorage(nomeStorage)?getNomeDaDisciplinaStorage(nomeStorage) as string:'' as string);
  const handleChange = (event: SelectChangeEvent) => {
    const nomeDaDisciplina = event.target.value
    setAge(nomeDaDisciplina);
    setNomeDaDisciplinaStorage(nomeDaDisciplina, nomeStorage)
    handleChange2(JSON.stringify(getDisciplina(nomeDaDisciplina, lista as Disciplina[])));
  };

  const removerSelecao = (nome:string)=> {
    // const listaFiltrada = lista.filter(e=>{
    //   if (e.diaDaSemana === diaDaSemana && e.horario === horario && e.grupo === grupo) {
    //     e.selecionado = false
    //   }
    // })
    // console.log(listaFiltrada)
    // removeNomeDaDisciplinaStorage(nome)
    // window.location.reload()
    console.log(2)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="demo-simple-select-label">Agesss</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          size='small'

        >
          <MenuItem onChange={()=> removerSelecao(nomeStorage)}>---</MenuItem>
          {
            lista?.map((disciplina  ,key)=>{ 
              if(disciplina.grupo===grupo
                && disciplina.horario===horario
                && disciplina.diaDaSemana===diaDaSemana 
                && disciplina.habilitado
                //&& disciplina.selecionado === false             
              ) {
                  return <MenuItem
                            defaultValue={disciplina.nome} 
                            key={key} 
                            value={disciplina.nome as string}
                            aria-valuetext='dd'
                            selected={disciplina.selecionado}
                          >
                                {disciplina.nome}
                        </MenuItem>
              }   
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
