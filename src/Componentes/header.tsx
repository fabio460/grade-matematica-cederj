import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

interface HeaderProps {
  tema: 'claro' | 'escuro';
  setTema: React.Dispatch<React.SetStateAction<'claro' | 'escuro'>>;
  materiasConcluidas: number;
  totalMaterias: number;
  onReset: () => void;
  cores: any;
  metaOptativas: number;
  setMetaOptativas: React.Dispatch<React.SetStateAction<number>>;
  disciplinas: any[];
  optativasConcluidas:number
}

export default function Header({ 
  tema, setTema, materiasConcluidas, onReset, cores, metaOptativas, setMetaOptativas, disciplinas 
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const posicaoAtual = window.scrollY;
      
      // ⚠️ SOLUÇÃO DO BUG: Se descer passa de 80px, se subir precisa voltar acima de 20px. 
      // Essa janela impede que o encolhimento do layout cause o loop de vai e vem.
      if (!scrolled && posicaoAtual > 80) {
        setScrolled(true);
      } else if (scrolled && posicaoAtual < 20) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const totalObrigatorias = disciplinas.filter(d => d.tipo === "Obrigatória").length;
  const totalMateriasReal = totalObrigatorias + metaOptativas;
  const porcentagem = totalMateriasReal > 0 ? Math.round((materiasConcluidas / totalMateriasReal) * 100) : 0;
  return (
    <header style={{ 
      display: 'flex', flexDirection: 'column', 
      gap: scrolled ? '6px' : '12px', 
      padding: scrolled ? '8px 15px' : '15px', 
      backgroundColor: cores.bgCardHeader, boxShadow: cores.boxShadow,
      position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, 
      transition: 'all 0.25s ease-in-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
        
        {/* ⚠️ NOVO LAYOUT COMPACTO: Título e progresso alinhados horizontalmente se houver scroll */}
        <div style={{ 
          display: 'flex', 
          alignItems: scrolled ? 'center' : 'flex-start', 
          flexDirection: scrolled ? 'row' : 'column',
          gap: scrolled ? '10px' : '0px'
        }}>
          <h1 style={{ margin: 0, fontSize: scrolled ? '15px' : '18px', color: tema === 'escuro' ? '#61dafb' : '#0050b3', transition: 'all 0.2s' }}>
            Simulador de Grade
          </h1>
          
          {/* Se encolhido, vira um badge pequeno ao lado do título. Se expandido, volta a ser o texto explicativo de baixo */}
          <span style={{ 
            fontSize: scrolled ? '11px' : '13px', 
            fontWeight: '600',
            color: scrolled ? (tema === 'escuro' ? '#52c41a' : '#1890ff') : cores.textoSecundario,
            backgroundColor: scrolled ? (tema === 'escuro' ? 'rgba(82,196,26,0.15)' : '#e6f7ff') : 'transparent',
            padding: scrolled ? '2px 8px' : '0px',
            borderRadius: scrolled ? '12px' : '0px',
            border: scrolled ? `1px solid ${tema === 'escuro' ? 'rgba(82,196,26,0.3)' : '#bae7ff'}` : 'none',
            marginTop: scrolled ? '0px' : '3px',
            transition: 'all 0.2s'
          }}>
            {scrolled ? `${materiasConcluidas}/${totalMateriasReal} (${porcentagem}%)` : `Matérias cursadas: ${materiasConcluidas} de ${totalMateriasReal} (${porcentagem}%)`}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setTema(t => t === 'escuro' ? 'claro' : 'escuro')} 
            style={{ padding: scrolled ? '5px 10px' : '8px 12px', fontSize: '12px', backgroundColor: tema === 'escuro' ? '#ffffff' : '#333333', color: tema === 'escuro' ? '#000000' : '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {tema === 'escuro' ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={onReset} 
            style={{ padding: scrolled ? '5px 10px' : '8px 12px', fontSize: '12px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ width: '100%', backgroundColor: tema === 'escuro' ? '#333340' : '#e8e8e8', borderRadius: '10px', height: scrolled ? '4px' : '8px', overflow: 'hidden', transition: 'height 0.2s' }}>
        <div style={{ 
          width: `${porcentagem > 100 ? 100 : porcentagem}%`, 
          backgroundColor: materiasConcluidas >= totalMateriasReal ? '#52c41a' : (tema === 'escuro' ? '#61dafb' : '#1890ff'), 
          height: '100%', borderRadius: '10px', transition: 'width 0.4s ease-in-out' 
        }} />
      </div>

      <div style={{ 
        display: 'flex', gap: '10px', alignItems: 'center', overflowX: 'auto',
        whiteSpace: 'nowrap', width: '100%', paddingBottom: scrolled ? '0px' : '4px',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ flexShrink: 0, padding: scrolled ? '5px 12px' : '8px 14px', fontSize: '12px', backgroundColor: location.pathname === '/' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📊 Grade Principal
        </button>
        <button 
          onClick={() => navigate('/isencoes')} 
          style={{ flexShrink: 0, padding: scrolled ? '5px 12px' : '8px 14px', fontSize: '12px', backgroundColor: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🛡️ Isenções Acadêmicas
        </button>
        <button 
          onClick={() => navigate('/instrucoes')} 
          style={{ flexShrink: 0, padding: scrolled ? '5px 12px' : '8px 14px', fontSize: '12px', backgroundColor: location.pathname === '/instrucoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/instrucoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📖 Instruções
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', paddingLeft: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', color: cores.textoSecundario, display: scrolled ? 'none' : 'inline' }}>Meta Optativas:</span>
          <input 
            type="number" min="0" max="20" value={metaOptativas}
            onChange={(e) => setMetaOptativas(Math.max(0, parseInt(e.target.value, 10) || 0))}
            style={{
              width: '38px', padding: scrolled ? '2px' : '4px', borderRadius: '4px', border: `1px solid ${cores.borderMateria}`,
              backgroundColor: cores.bgBotaoMateria, color: cores.textoPrincipal, textAlign: 'center', fontWeight: 'bold', fontSize: '11px'
            }}
          />
        </div>
      </div>
    </header>
  );
}
















// import React from 'react';
// import { useNavigate, useLocation } from 'react-router';
// import type { Disciplina } from './listaDeMaterias';


// interface HeaderProps {
//   tema: 'claro' | 'escuro';
//   setTema: React.Dispatch<React.SetStateAction<'claro' | 'escuro'>>;
//   materiasConcluidas: number;
//   totalMaterias: number;
//   onReset: () => void;
//   cores: any;
//   metaOptativas: number;
//   setMetaOptativas: React.Dispatch<React.SetStateAction<number>>;
//   optativasConcluidas?: number;
//   disciplinas:Disciplina[]
// }

// export default function Header({ 
//   tema, setTema, materiasConcluidas, disciplinas,onReset, cores, metaOptativas, setMetaOptativas 
// }: HeaderProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- CÁLCULO DINÂMICO REAL CONSIDERANDO AS OPTATIVAS ---
  
//   // 1. Conta apenas as obrigatórias que estão de fato na lista
//   const totalObrigatorias = disciplinas.filter(d => d.tipo === "Obrigatória").length;
  
//   // 2. O total real do curso passa a ser as Obrigatórias + a Meta de Optativas digitada pelo usuário
//   const totalMateriasReal = totalObrigatorias + metaOptativas;

//   // 3. Calcula a porcentagem em cima desse novo total flutuante
//   const porcentagem = totalMateriasReal > 0 ? Math.round((materiasConcluidas / totalMateriasReal) * 100) : 0;


//   return (
//     <header style={{ 
//       display: 'flex', flexDirection: 'column', gap: '12px', padding: '15px', 
//       backgroundColor: cores.bgCardHeader, boxShadow: cores.boxShadow,
//       position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(8px)',
//       borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, transition: 'all 0.25s ease'
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
//         <div>
//           <h1 style={{ margin: 0, fontSize: '18px', color: tema === 'escuro' ? '#61dafb' : '#0050b3' }}>
//             Simulador de Grade
//           </h1>
//           <p style={{ margin: '3px 0 0 0', color: cores.textoSecundario, fontSize: '13px' }}>
//             Matérias cursadas: <strong>{materiasConcluidas} de {totalMateriasReal}</strong> ({porcentagem}%)
//           </p>
//         </div>

//         <div style={{ display: 'flex', gap: '8px' }}>
//           <button 
//             onClick={() => setTema(t => t === 'escuro' ? 'claro' : 'escuro')} 
//             style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: tema === 'escuro' ? '#ffffff' : '#333333', color: tema === 'escuro' ? '#000000' : '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             {tema === 'escuro' ? '☀️' : '🌙'}
//           </button>
//           <button 
//             onClick={onReset} 
//             style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             Reset
//           </button>
//         </div>
//       </div>

//       {/* ⚠️ NOVA SEÇÃO: BARRA DE PROGRESSO FLUIDA */}
//       <div style={{ width: '100%', backgroundColor: tema === 'escuro' ? '#333340' : '#e8e8e8', borderRadius: '10px', height: '10px', overflow: 'hidden', position: 'relative' }}>
//       <div style={{ 
//         width: `${porcentagem > 100 ? 100 : porcentagem}%`, 
//         backgroundColor: materiasConcluidas >= totalMateriasReal ? '#52c41a' : (tema === 'escuro' ? '#61dafb' : '#1890ff'), 
//         height: '100%', 
//         borderRadius: '10px', 
//         transition: 'width 0.4s ease-in-out, background-color 0.3s' 
//       }} />

//       </div>

//       {/* Esteira de navegação horizontal para celular */}
//       <div style={{ 
//         display: 'flex', gap: '10px', alignItems: 'center', overflowX: 'auto',
//         whiteSpace: 'nowrap', width: '100%', paddingBottom: '5px',
//         WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'
//       }}>
//         <button 
//           onClick={() => navigate('/')} 
//           style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', backgroundColor: location.pathname === '/' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
//         >
//           📊 Grade Principal
//         </button>
//         <button 
//           onClick={() => navigate('/isencoes')} 
//           style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', backgroundColor: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
//         >
//           🛡️ Isenções Acadêmicas
//         </button>
//         <button 
//           onClick={() => navigate('/instrucoes')} 
//           style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', backgroundColor: location.pathname === '/instrucoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/instrucoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
//         >
//           📖 Instruções
//         </button>

//         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', paddingLeft: '10px', flexShrink: 0 }}>
//           <span style={{ fontSize: '12px', color: cores.textoSecundario }}>Meta Optativas:</span>
//           <input 
//             type="number" min="0" max="20" value={metaOptativas}
//             onChange={(e) => setMetaOptativas(Math.max(0, parseInt(e.target.value, 10) || 0))}
//             style={{
//               width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${cores.borderMateria}`,
//               backgroundColor: cores.bgBotaoMateria, color: cores.textoPrincipal, textAlign: 'center', fontWeight: 'bold'
//             }}
//           />
//         </div>
//       </div>
//     </header>
//   );
// }
