import React from 'react';
import { useOutletContext } from 'react-router';
import { type Disciplina } from './listaDeMaterias';
import CardPeriodo from './CardPeriodo';
import { obterMateriasParaOQuadranteGeral } from '../metodosGerais';
import { useGradeLogica } from '../metodosGerais';

interface GradeContext {
  disciplinas: Disciplina[];
  setDisciplinas: React.Dispatch<React.SetStateAction<Disciplina[]>>;
  alocacaoMaterias: Record<string, number>;
  setAlocacaoMaterias: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  cores: any;
  tema: 'claro' | 'escuro';
  alunoFormado: boolean;
  metaOptativas: number;
  optativasConcluidas:number
}

export default function GerenciadorGrade() {
  const { 
    disciplinas, setDisciplinas, alocacaoMaterias, setAlocacaoMaterias, cores, tema, alunoFormado, metaOptativas 
  } = useOutletContext<GradeContext>();

  const { executarToggleSelecao } = useGradeLogica({ 
    disciplinas, setDisciplinas, alocacaoMaterias, setAlocacaoMaterias 
  });

  // Calcula globalmente quantas optativas já foram selecionadas no momento
  const optativasAtuaisConcluidas = disciplinas.filter(
    d => d.selecionado && (d.tipo === "Optativa Pedagógica" || d.tipo === "Optativa Matemática" || d.tipo === "Atividade Complementar")
  ).length;

  const maxPeriodoCadastrado = Math.max(...disciplinas.map(d => d.periodo), 1);
  const periodosVisiveis: number[] = [];
  let p = 1;

  while (p === 1 || Object.values(alocacaoMaterias).includes(p) || Object.values(alocacaoMaterias).includes(p - 1)) {
    if (alunoFormado && p > 1 && !Object.values(alocacaoMaterias).includes(p)) break;
    if (p > maxPeriodoCadastrado + 5) break;
    periodosVisiveis.push(p);
    p++;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {alunoFormado && (
        <div style={{ backgroundColor: '#52c41a', color: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 15px rgba(82,196,26,0.3)', border: '2px solid #b7eb8f' }}>
          🎉 PARABÉNS! Você concluiu 100% das matérias obrigatórias e atingiu a meta de {metaOptativas} optativas selecionadas. Você se formou com sucesso! 🎓
        </div>
      )}

      <main style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
        {periodosVisiveis.map(periodo => (
          <CardPeriodo
            key={periodo} periodo={periodo} tema={tema} cores={cores}
            materiasDoPeriodo={Object.values(alocacaoMaterias).filter(val => val === periodo).length}
            materiasSemHorario={obterMateriasParaOQuadranteGeral(periodo, 'SEM_GRUPO', undefined, undefined, disciplinas, alocacaoMaterias)}
            obterMateriasParaOQuadrante={(g, d, t) => obterMateriasParaOQuadranteGeral(periodo, g, d, t, disciplinas, alocacaoMaterias)}
            toggleSelecao={(materia) => executarToggleSelecao(materia, periodo)}
            // Passando os novos seletores para controle de marca d'água das optativas
            optativasAtuaisConcluidas={optativasAtuaisConcluidas}
            metaOptativas={metaOptativas}
          />
        ))}
      </main>
    </div>
  );
}











// import React from 'react';
// import { useOutletContext } from 'react-router';
// import { type Disciplina } from './listaDeMaterias';
// import CardPeriodo from './CardPeriodo';
// import { obterMateriasParaOQuadranteGeral } from '../metodosGerais';
// import { useGradeLogica } from '../metodosGerais';

// interface GradeContext {
//   disciplinas: Disciplina[];
//   setDisciplinas: React.Dispatch<React.SetStateAction<Disciplina[]>>;
//   alocacaoMaterias: Record<string, number>;
//   setAlocacaoMaterias: React.Dispatch<React.SetStateAction<Record<string, number>>>;
//   cores: any;
//   tema: 'claro' | 'escuro';
//   alunoFormado: boolean;
//   metaOptativas: number;
// }

// export default function GerenciadorGrade() {
//   const { 
//     disciplinas, setDisciplinas, alocacaoMaterias, setAlocacaoMaterias, cores, tema, alunoFormado, metaOptativas 
//   } = useOutletContext<GradeContext>();

//   const { executarToggleSelecao } = useGradeLogica({ 
//     disciplinas, 
//     setDisciplinas, 
//     alocacaoMaterias, 
//     setAlocacaoMaterias 
//   });

//   // --- LÓGICA DE GERAÇÃO CONTÍNUA/INFINITA DE PERÍODOS ---
//   const maxPeriodoCadastrado = Math.max(...disciplinas.map(d => d.periodo), 1);
//   const periodosVisiveis: number[] = [];
//   let p = 1;

//   // O loop gera cartões enquanto houver matérias alocadas ou até liberar o próximo período
//   while (p === 1 || Object.values(alocacaoMaterias).includes(p) || Object.values(alocacaoMaterias).includes(p - 1)) {
//     // Interrompe a criação de novos blocos vazios se o usuário já preencheu os requisitos de formatura
//     if (alunoFormado && p > 1 && !Object.values(alocacaoMaterias).includes(p)) {
//       break;
//     }
//     // Prevenção de loop infinito de segurança caso a grade ultrapasse o limite teórico
//     if (p > maxPeriodoCadastrado + 5) {
//       break;
//     }
//     periodosVisiveis.push(p);
//     p++;
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      
//       {/* BANNER DE FORMATURA COMPLETA */}
//       {alunoFormado && (
//         <div style={{
//           backgroundColor: '#52c41a',
//           color: '#fff',
//           padding: '20px',
//           borderRadius: '8px',
//           textAlign: 'center',
//           fontWeight: 'bold',
//           fontSize: '18px',
//           boxShadow: '0 4px 15px rgba(82,196,26,0.3)',
//           border: '2px solid #b7eb8f',
//           position:'fixed',
//           right:0,
//           left:10
//         }}>
//           🎉 PARABÉNS! Você concluiu 100% das matérias obrigatórias e atingiu a meta de {metaOptativas} optativas selecionadas. Você se formou com sucesso! 🎓
//         </div>
//       )}

//       <main style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
//         {periodosVisiveis.map(periodo => (
//           <CardPeriodo
//             key={periodo}
//             periodo={periodo}
//             tema={tema}
//             cores={cores}
//             materiasDoPeriodo={Object.values(alocacaoMaterias).filter(val => val === periodo).length}
//             materiasSemHorario={obterMateriasParaOQuadranteGeral(periodo, 'SEM_GRUPO', undefined, undefined, disciplinas, alocacaoMaterias)}
//             obterMateriasParaOQuadrante={(g, d, t) => obterMateriasParaOQuadranteGeral(periodo, g, d, t, disciplinas, alocacaoMaterias)}
//             toggleSelecao={(materia) => executarToggleSelecao(materia, periodo)}
//           />
//         ))}
//       </main>
//     </div>
//   );
// }
