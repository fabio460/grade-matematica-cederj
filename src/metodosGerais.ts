import { listaDisciplinas, type Disciplina } from "./Componentes/listaDeMaterias";

export function trocaObjeto(obj: Disciplina, periodo:number) {

        if (localStorage.getItem("listaStorage")) {
        const listaString = localStorage.getItem("listaStorage");
        const listJson = listaString ? JSON.parse(listaString) as Disciplina[] : [];
        listJson.filter((disciplina)=>{
            if(disciplina.nome===obj.nome){
                disciplina.selecionado = obj.selecionado;
                disciplina.indicadorPeriodo=periodo
            }
        })
        localStorage.setItem("listaStorage", JSON.stringify(listJson))
    } else {
            listaDisciplinas.filter((disciplina)=>{
            if(disciplina.nome===obj.nome){
                disciplina.selecionado = obj.selecionado;
                disciplina.indicadorPeriodo=periodo
            }
        })
        
        localStorage.setItem("listaStorage", JSON.stringify(listaDisciplinas))
    }
    window.location.reload()
}

export function limpaStorage() {
    localStorage.removeItem("listaStorage");
    localStorage.removeItem("listaStorage2");
    window.location.reload();
}

export function preRequisito(lista: Disciplina[], requisito: string) {
  const requisitoUm = requisito.split(',')[0];
  const requisitoDois = requisito.split(',')[1];
  const requisitoTres = requisito.split(',')[2];
  const requisitoQuatro = requisito.split(',')[3];

    if (requisitoUm) {
        if (lista.some((disciplina) => disciplina.nome === requisitoUm && disciplina.selecionado)) {
            return true;
        }
    }

    if (requisitoDois) { 
       if (
        (lista.some((disciplina) => disciplina.nome === requisito.split(',')[0] && disciplina.selecionado)) &&
         (lista.some((disciplina) => disciplina.nome === requisito.split(',')[1] && disciplina.selecionado)) 
       ) {
        return true;
       }
    } 

    if (requisitoTres) { 
        if (
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[0] && disciplina.selecionado)) &&
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[1] && disciplina.selecionado)) &&
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[2] && disciplina.selecionado))
        ) {
          return true;
        }
    } 
    if (requisitoQuatro) { 
        if (
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[0] && disciplina.selecionado)) &&  
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[1] && disciplina.selecionado)) &&
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[2] && disciplina.selecionado)) &&
            (lista.some((disciplina) => disciplina.nome === requisito.split(',')[3] && disciplina.selecionado)) 
        ) {
          return true;
        }
    }
    return false;
}

export function handleHabilitado(lista: Disciplina[]) {
  lista.map((disciplina) => {
      const listaDePreRequisito = disciplina.preRequisito.split(',')
      const disciplinasDoRequisito = lista.filter((item) => {
          if (listaDePreRequisito.includes(item.nome)) {
            return item
          }
      })
      const condicao = disciplinasDoRequisito.every((item) => item.selecionado === true)
      if (condicao) {
        disciplina.habilitado = true
      }
  }
) 
}

