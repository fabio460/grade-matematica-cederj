import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { listaDisciplinas as listaInicial, type Disciplina } from './listaDeMaterias';
import { obterMapaCores } from './cores';
import Header from './header';

export default function LayoutBase() {
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

  // Estado para a quantidade personalizada de optativas que o usuário quer concluir
  const [metaOptativas, setMetaOptativas] = useState<number>(() => {
    const salva = localStorage.getItem('grade_meta_optativas');
    return salva ? parseInt(salva, 10) : 2;
  });

  useEffect(() => { localStorage.setItem('grade_tema', tema); }, [tema]);
  useEffect(() => { localStorage.setItem('grade_disciplinas', JSON.stringify(disciplinas)); }, [disciplinas]);
  useEffect(() => { localStorage.setItem('grade_alocacoes', JSON.stringify(alocacaoMaterias)); }, [alocacaoMaterias]);
  useEffect(() => { localStorage.setItem('grade_meta_optativas', metaOptativas.toString()); }, [metaOptativas]);

  const handleReset = () => {
    if (window.confirm("Deseja resetar todos os dados?")) {
      setDisciplinas(listaInicial);
      const iniciais: Record<string, number> = {};
      listaInicial.forEach(d => { if (d.selecionado) iniciais[d.codigo] = d.periodo; });
      setAlocacaoMaterias(iniciais);
      setMetaOptativas(2);
    }
  };

  // --- LÓGICA DA REGRA DE FORMATURA ---
  const materiasObrigatorias = disciplinas.filter(d => d.tipo === "Obrigatória");
  const todasObrigatoriasConcluidas = materiasObrigatorias.length > 0 && materiasObrigatorias.every(d => d.selecionado);

  const optativasConcluidas = disciplinas.filter(
    d => d.selecionado && (d.tipo === "Optativa Matemática" || d.tipo === "Optativa Pedagógica")
  ).length;

  const alunoFormado = todasObrigatoriasConcluidas && optativasConcluidas >= metaOptativas;

  const cores = obterMapaCores(tema);
  const totalMateriasObrigatorias = disciplinas.filter(e=>e.tipo === 'Obrigatória')
  return (
    <div style={{ backgroundColor: cores.bgPagina, minHeight: '100vh', transition: 'all 0.25s ease' }}>
      <Header 
        tema={tema}
        setTema={setTema}
        materiasConcluidas={disciplinas.filter(d => d.selecionado && d.tipo === 'Obrigatória').length}
        totalMaterias={totalMateriasObrigatorias.length}
        onReset={handleReset}
        cores={cores}
        metaOptativas={metaOptativas}
        setMetaOptativas={setMetaOptativas}
        optativasConcluidas={optativasConcluidas}
      />
      <div style={{ padding: '12px 10px', boxSizing: 'border-box' }}>
        <Outlet context={{ 
          disciplinas, 
          setDisciplinas, 
          alocacaoMaterias, 
          setAlocacaoMaterias, 
          cores, 
          tema,
          alunoFormado,
          metaOptativas
        }} />
      </div>
    </div>
  );
}
