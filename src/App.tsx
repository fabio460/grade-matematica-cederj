import './App.css'
import { listaDisciplinas, type Disciplina } from './Componentes/listaDeMaterias'
import GradeResponsiva from './Componentes/gradeResponsiva';
import { Fab } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { handleHabilitado, limpaStorage } from './metodosGerais';

function App() {
  
  const lista:Disciplina[] = JSON.parse(localStorage.getItem("listaStorage") as string) ? JSON.parse(localStorage.getItem("listaStorage") as string) : listaDisciplinas
  const listaDoisFiltrada = lista.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 2);
  const listaTresFiltrada = listaDoisFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 3);
  const listaQuatroFiltrada = listaTresFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 4);
  const listaCincoFiltrada = listaQuatroFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 5);
  const listaSeisFiltrada = listaCincoFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 6);
  const listaSeteFiltrada = listaSeisFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 7);
  const listaOitoFiltrada = listaSeteFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 8);
  const listaNoveFiltrada = listaOitoFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 9);
  const listaDezFiltrada = listaNoveFiltrada.filter((disciplina) => disciplina.selecionado === false || disciplina.indicadorPeriodo >= 10);
  

  handleHabilitado(lista) 

  return (
    <div style={{width:"100%", height:"100vh", backgroundColor:""}}>
      <Fab variant="extended" onClick={()=> limpaStorage()} style={{position:"fixed", right:"2%", top:"2%", zIndex:1000, backgroundColor:"#1976d2", color:"#fff"}}>
        <CleaningServicesIcon sx={{ mr: 1 }} />
        Limpar
      </Fab>
      <GradeResponsiva periodo={1} lista={lista}/>
      <GradeResponsiva periodo={2} lista={listaDoisFiltrada}/>
      <GradeResponsiva periodo={3} lista={listaTresFiltrada}/>
      <GradeResponsiva periodo={4} lista={listaQuatroFiltrada}/>
      <GradeResponsiva periodo={5} lista={listaCincoFiltrada}/>
      <GradeResponsiva periodo={6} lista={listaSeisFiltrada}/>
      <GradeResponsiva periodo={7} lista={listaSeteFiltrada}/>
      <GradeResponsiva periodo={8} lista={listaOitoFiltrada}/>
      <GradeResponsiva periodo={9} lista={listaNoveFiltrada}/>
      <GradeResponsiva periodo={10} lista={listaDezFiltrada}/>
    </div>
  )
}

export default App
