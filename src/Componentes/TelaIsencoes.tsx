import React from 'react';
import { useOutletContext } from 'react-router';
import { type Disciplina } from './listaDeMaterias';

// Interface do Contexto compartilhado pelo LayoutBase
interface GradeContext {
  disciplinas: Disciplina[];
  setDisciplinas: React.Dispatch<React.SetStateAction<Disciplina[]>>;
  alocacaoMaterias: Record<string, number>;
  setAlocacaoMaterias: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  cores: any;
  tema: 'claro' | 'escuro';
}

export default function TelaIsencoes() {
  // Puxa todos os estados automaticamente do Layout pai
  const { disciplinas, setDisciplinas, setAlocacaoMaterias, cores, tema } = useOutletContext<GradeContext>();

  // Função recursiva que localiza todos os pré-requisitos históricos de uma matéria
  const coletarRequisitosCascata = (nomeMateria: string, lista: Disciplina[], acumulador: string[] = []): string[] => {
    const alvo = lista.find(d => d.nome === nomeMateria);
    if (!alvo || !alvo.preRequisito || alvo.preRequisito.toLowerCase() === 'não tem') return acumulador;

    const requisitos = alvo.preRequisito.split(',').map(r => r.trim());
    requisitos.forEach(req => {
      if (!acumulador.includes(req)) {
        acumulador.push(req);
        coletarRequisitosCascata(req, lista, acumulador); // Avança na árvore de requisitos
      }
    });
    return acumulador;
  };

  const handleIsencaoClick = (materia: Disciplina) => {
    const statusAlvo = !materia.selecionado;
    
    // Coleta a lista de nomes de todas as disciplinas mães afetadas pelo efeito cascata
    const nomesAfetados = statusAlvo 
      ? [materia.nome, ...coletarRequisitosCascata(materia.nome, disciplinas)]
      : [materia.nome]; // Se desmarcar, remove apenas a selecionada

    // 1. Atualiza o estado das disciplinas de forma imutável
    setDisciplinas(prev => prev.map(d => 
      nomesAfetados.includes(d.nome) ? { ...d, selecionado: statusAlvo } : d
    ));

    // 2. Registra as alocações no período base para o sincronismo da esteira principal
    setAlocacaoMaterias(ant => {
      const copia = { ...ant };
      disciplinas.forEach(d => {
        if (nomesAfetados.includes(d.nome)) {
          if (statusAlvo) {
            copia[d.codigo] = 1; // Insere as isenções como cumpridas na base do histórico
          } else {
            delete copia[d.codigo];
          }
        }
      });
      return copia;
    });
  };

  return (
    <div style={{ backgroundColor: cores.bgCardPeriodo, borderRadius: '10px', padding: '25px', boxShadow: cores.boxShadow, transition: 'all 0.25s ease' }}>
      <div style={{ borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, paddingBottom: '12px', marginBottom: '25px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: cores.textoPrincipal }}>🛡️ Central de Isenções Acadêmicas</h2>
        <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario, fontSize: '13px' }}>
          Marque as disciplinas que você já eliminou. Os pré-requisitos associados serão marcados automaticamente.
        </p>
      </div>

      {/* Grid contendo o mapa de todas as matérias organizadas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px' }}>
        {disciplinas.map(m => (
          <div 
            key={m.codigo}
            onClick={() => handleIsencaoClick(m)}
            style={{
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: m.selecionado ? '1px solid #52c41a' : `1px solid ${cores.borderMateria}`,
              backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria,
              color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal,
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{m.nome}</div>
            <div style={{ fontSize: '11px', color: m.selecionado ? (tema === 'escuro' ? '#a2e8a2' : '#0050b3') : cores.textoSecundario }}>
              Período Original: {m.periodo}º | Cód: {m.codigo}
            </div>
            {m.preRequisito && m.preRequisito !== 'não tem' && (
              <div style={{ fontSize: '10px', marginTop: '6px', fontStyle: 'italic', opacity: 0.8 }}>
                Depende de: {m.preRequisito}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
