import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { listaDisciplinas as listaInicial, type Disciplina } from './listaDeMaterias';
import { obterMapaCores } from './cores';
import Header from './header';

export default function LayoutBase() {
  // Gerencia o tema diretamente dentro do Layout Base
  const [tema, setTema] = useState<'claro' | 'escuro'>(() => {
    return localStorage.getItem('grade_tema') === 'claro' ? 'claro' : 'escuro';
  });

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(() => {
    const salvas = localStorage.getItem('grade_disciplinas');
    return salvas ? JSON.parse(salvas) : listaInicial;
  });

  const [alocacaoMaterias, setAlocacaoMaterias] = useState<Record<string, number>>(() => {
    const salvas = localStorage.getItem('grade_alocacoes');
    if (salvas) return JSON.parse(salvas);
    const iniciais: Record<string, number> = {};
    listaInicial.forEach(d => { if (d.selecionado) iniciais[d.codigo] = d.periodo; });
    return iniciais;
  });

  useEffect(() => { localStorage.setItem('grade_tema', tema); }, [tema]);
  useEffect(() => { localStorage.setItem('grade_disciplinas', JSON.stringify(disciplinas)); }, [disciplinas]);
  useEffect(() => { localStorage.setItem('grade_alocacoes', JSON.stringify(alocacaoMaterias)); }, [alocacaoMaterias]);

  const handleReset = () => {
    if (window.confirm("Deseja resetar todos os dados?")) {
      setDisciplinas(listaInicial);
      const iniciais: Record<string, number> = {};
      listaInicial.forEach(d => { if (d.selecionado) iniciais[d.codigo] = d.periodo; });
      setAlocacaoMaterias(iniciais);
    }
  };

  // Calcula as cores aqui dentro de forma segura
  const cores = obterMapaCores(tema);

  return (
    <div style={{ backgroundColor: cores.bgPagina, minHeight: '100vh', transition: 'all 0.25s ease' }}>
      <Header 
        tema={tema}
        setTema={setTema}
        materiasConcluidas={disciplinas.filter(d => d.selecionado).length}
        totalMaterias={disciplinas.length}
        onReset={handleReset}
        cores={cores}
      />
      
      <div style={{ padding: '12px 10px', boxSizing: 'border-box' }}>
        {/* Repassa os dados para as páginas filhas via context do React Router */}
        <Outlet context={{ disciplinas, setDisciplinas, alocacaoMaterias, setAlocacaoMaterias, cores, tema }} />
      </div>
    </div>
  );
}
