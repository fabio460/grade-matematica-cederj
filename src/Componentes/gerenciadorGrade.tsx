import React from 'react'; // ⚠️ Importação necessária
import { type Disciplina } from './listaDeMaterias';
import CardPeriodo from './CardPeriodo';
import { obterMateriasParaOQuadranteGeral } from '../metodosGerais';
import { useGradeLogica } from '../metodosGerais';
import { useOutletContext } from 'react-router';

// Tipagem do contexto compartilhado pelo pai
interface GradeContext {
  disciplinas: Disciplina[];
  setDisciplinas: React.Dispatch<React.SetStateAction<Disciplina[]>>;
  alocacaoMaterias: Record<string, number>;
  setAlocacaoMaterias: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  cores: any;
  tema: 'claro' | 'escuro';
}

export default function GerenciadorGrade() {
  // ⚠️ Puxa todos os estados automaticamente do pai de forma limpa
  const { disciplinas, setDisciplinas, alocacaoMaterias, setAlocacaoMaterias, cores, tema } = useOutletContext<GradeContext>();

  const { executarToggleSelecao } = useGradeLogica({ 
    disciplinas, 
    setDisciplinas, 
    alocacaoMaterias, 
    setAlocacaoMaterias 
  });

  const maxPeriodoCadastrado = Math.max(...disciplinas.map(d => d.periodo), 1);
  const periodosVisiveis: number[] = [];
  for (let p = 1; p <= maxPeriodoCadastrado + 1; p++) {
    if (Object.values(alocacaoMaterias).includes(p) || p === 1 || Object.values(alocacaoMaterias).includes(p - 1)) {
      periodosVisiveis.push(p);
    }
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {periodosVisiveis.map(periodo => (
        <CardPeriodo
          key={periodo}
          periodo={periodo}
          tema={tema}
          cores={cores}
          materiasDoPeriodo={Object.values(alocacaoMaterias).filter(p => p === periodo).length}
          materiasSemHorario={obterMateriasParaOQuadranteGeral(periodo, 'SEM_GRUPO', undefined, undefined, disciplinas, alocacaoMaterias)}
          obterMateriasParaOQuadrante={(g, d, t) => obterMateriasParaOQuadranteGeral(periodo, g, d, t, disciplinas, alocacaoMaterias)}
          toggleSelecao={(materia) => executarToggleSelecao(materia, periodo)}
        />
      ))}
    </main>
  );
}
