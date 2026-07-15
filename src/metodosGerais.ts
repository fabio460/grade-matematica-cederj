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

export function getDisciplina(nome:string, lista:Disciplina[]) {
    return lista.filter(e=>e.nome === nome)[0]
}
export function setNomeDaDisciplinaStorage(nome:string, nomeStorage:string) {
    localStorage.setItem(nomeStorage,nome)
}

export function getNomeDaDisciplinaStorage(nome:string) {
   return localStorage.getItem(nome)
}

export function removeNomeDaDisciplinaStorage(nome:string) {
    localStorage.removeItem(nome)
}




// Função que copia a lista e altera o atributo 'selecionado' de uma disciplina específica
export function alterarSelecaoDisciplina(
  listaOriginal: Disciplina[], 
  codigoDisciplina: string, 
  novoStatus: boolean
): Disciplina[] {
  
  // Cria uma nova lista mapeando e atualizando o objeto alvo
  return listaOriginal.map(disciplina => {
    if (disciplina.codigo === codigoDisciplina) {
      // Retorna uma cópia do objeto com o atributo alterado
      return { ...disciplina, selecionado: novoStatus };
    }
    // Retorna o objeto original se não for o que queremos alterar
    return disciplina;
  });
}

export const g1SabadoManha = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G1"  && e.diaDaSemana === "sábado" && e.horario === "manhã (9:30 até 12:00)") {
         return e
       }
     })
}
export const g1SabadoTarde = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G1"  && e.diaDaSemana === "sábado" && e.horario === "tarde (13:30 até 16:00)") {
         return e
       }
     })
}
export const g1DomingoManha = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G1"  && e.diaDaSemana === "domingo" && e.horario === "manhã (9:30 até 12:00)") {
         return e
       }
     })
}
export const g1DomingoTarde = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G1"  && e.diaDaSemana === "domingo" && e.horario === "tarde (13:30 até 16:00)") {
         return e
       }
     })
}
export const g2SabadoManha = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G2"  && e.diaDaSemana === "sábado" && e.horario === "manhã (9:30 até 12:00)") {
         return e
       }
     })
}
export const g2SabadoTarde = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G2"  && e.diaDaSemana === "sábado" && e.horario === "tarde (13:30 até 16:00)") {
         return e
       }
     })
}
export const g2DomingoManha = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G2"  && e.diaDaSemana === "domingo" && e.horario === "manhã (9:30 até 12:00)") {
         return e
       }
     })
}
export const g2DomingoTarde = (lista:Disciplina[])=>{
   return lista.filter(e=>{
       if (e.grupo === "G2"  && e.diaDaSemana === "domingo" && e.horario === "tarde (13:30 até 16:00)") {
         return e
       }
     })
}

export const getDisciplinaByCodigo = (codigo:string, lista:Disciplina[])=>{
    return lista.find(e=>e.codigo === codigo)
}


export function preRequisitosSatisfeitos(
  preRequisitoStr: string,
  periodoAtual: number,
  disciplinas: Disciplina[],
  alocacaoMaterias: Record<string, number>
): boolean {
  if (!preRequisitoStr || preRequisitoStr.toLowerCase() === "não tem") return true;
  
  return preRequisitoStr
    .split(',')
    .map(r => r.trim())
    .every(req => {
      const materiaReq = disciplinas.find(d => d.nome === req);
      if (!materiaReq) return false;
      
      const periodoOndeFoiCursada = alocacaoMaterias[materiaReq.codigo];
      return (
        materiaReq.selecionado &&
        periodoOndeFoiCursada !== undefined &&
        periodoOndeFoiCursada < periodoAtual
      );
    });
}

/**
 * Filtra e retorna as matérias elegíveis para preencher um quadrante/bloco específico de horários
 */
export function obterMateriasParaOQuadranteGeral(
  periodoAtual: number,
  grupo: "G1" | "G2" | "SEM_GRUPO",
  dia: 'sábado' | 'domingo' | undefined,
  turno: 'manhã' | 'tarde' | undefined,
  disciplinas: Disciplina[],
  alocacaoMaterias: Record<string, number>
): Disciplina[] {
  return disciplinas.filter(d => {
    // Tratamento para matérias EAD / Sem Horário Fixo
    if (grupo === "SEM_GRUPO") {
      if (d.diaDaSemana || d.horario) return false;
    } else {
      // Tratamento para blocos com turnos e dias presenciais regulares
      if (d.grupo !== grupo || d.diaDaSemana !== dia) return false;
      if (!d.horario?.includes(turno || '')) return false;
    }

    const periodoOndeFoiCursada = alocacaoMaterias[d.codigo];
    const cursadaAntes = periodoOndeFoiCursada !== undefined && periodoOndeFoiCursada < periodoAtual;

    // Se já foi concluída no passado, some da lista de opções de baixo
    if (d.selecionado && cursadaAntes) return false;
    
    // Se foi selecionada neste período específico, mantém visível para permitir desmarcar
    if (d.selecionado && periodoOndeFoiCursada === periodoAtual) return true;
    
    // Valida os pré-requisitos usando a função irmã do arquivo
    return preRequisitosSatisfeitos(d.preRequisito, periodoAtual, disciplinas, alocacaoMaterias);
  });
}


interface UseGradeParams {
  disciplinas: Disciplina[];
  setDisciplinas: React.Dispatch<React.SetStateAction<Disciplina[]>>;
  alocacaoMaterias: Record<string, number>;
  setAlocacaoMaterias: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

/**
 * Hook customizado para isolar a regra de negócio de seleção de matérias
 */
export function useGradeLogica({
  disciplinas,
  setDisciplinas,
  alocacaoMaterias,
  setAlocacaoMaterias
}: UseGradeParams) {
  
  const executarToggleSelecao = (materiaClicada: Disciplina, periodoAtual: number) => {
    const codigo = materiaClicada.codigo;
    const jaSelecionada = materiaClicada.selecionado;

    // 1. Atualiza o estado das disciplinas tratando substituições automáticas
    setDisciplinas(prev => prev.map(d => {
      if (!jaSelecionada) {
        const choque = 
          alocacaoMaterias[d.codigo] === periodoAtual && 
          d.diaDaSemana === materiaClicada.diaDaSemana && 
          d.horario === materiaClicada.horario && 
          d.grupo === materiaClicada.grupo && 
          materiaClicada.diaDaSemana;

        if (d.selecionado && choque) {
          return { ...d, selecionado: false };
        }
      }
      return d.codigo === codigo ? { ...d, selecionado: !d.selecionado } : d;
    }));

    // 2. Sincroniza o dicionário de alocações de períodos removendo choques
    setAlocacaoMaterias(ant => {
      const copia = { ...ant };
      if (!jaSelecionada) {
        disciplinas.forEach(d => {
          const choque = 
            ant[d.codigo] === periodoAtual && 
            d.diaDaSemana === materiaClicada.diaDaSemana && 
            d.horario === materiaClicada.horario && 
            d.grupo === materiaClicada.grupo && 
            materiaClicada.diaDaSemana;

          if (d.selecionado && choque) {
            delete copia[d.codigo];
          }
        });
        copia[codigo] = periodoAtual;
      } else {
        delete copia[codigo];
      }
      return copia;
    });
  };

  return { executarToggleSelecao };
}
