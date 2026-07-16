import React from 'react';
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
  optativasConcluidas?:number
}

export default function Header({ 
  tema, setTema, materiasConcluidas, totalMaterias, onReset, cores, metaOptativas, setMetaOptativas, optativasConcluidas 
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header style={{ 
      display: 'flex', flexDirection: 'column', gap: '12px', padding: '15px', 
      backgroundColor: cores.bgCardHeader, boxShadow: cores.boxShadow,
      position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, transition: 'all 0.25s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px', color: tema === 'escuro' ? '#61dafb' : '#0050b3' }}>
            Simulador de Grade
          </h1>
          <p style={{ margin: '3px 0 0 0', color: cores.textoSecundario, fontSize: '13px' }}>            
           <p style={{ margin: '3px 0 0 0', color: cores.textoSecundario, fontSize: '13px' }}>
             Progresso:
           </p>
           <p style={{ margin: '3px 0 0 15px', color: cores.textoSecundario, fontSize: '13px' }}>
             <div>{materiasConcluidas} de {totalMaterias} obrigatórias</div> 
             <div>{optativasConcluidas} de {metaOptativas} optativas</div>
           </p>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setTema(t => t === 'escuro' ? 'claro' : 'escuro')} 
            style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: tema === 'escuro' ? '#ffffff' : '#333333', color: tema === 'escuro' ? '#000000' : '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {tema === 'escuro' ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={onReset} 
            style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'flex', gap: '10px', alignItems: 'center', overflowX: 'auto',
        whiteSpace: 'nowrap', width: '100%', paddingBottom: '5px',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', backgroundColor: location.pathname === '/' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📊 Grade Principal
        </button>
        <button 
          onClick={() => navigate('/isencoes')} 
          style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', backgroundColor: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🛡️ Isenções Acadêmicas
        </button>
        <button 
          onClick={() => navigate('/instrucoes')} 
          style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', backgroundColor: location.pathname === '/instrucoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/instrucoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📖 Instruções
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', paddingLeft: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '12px', color: cores.textoSecundario }}>Meta Optativas:</span>
          <input 
            type="number" min="0" max="20" value={metaOptativas}
            onChange={(e) => setMetaOptativas(Math.max(0, parseInt(e.target.value, 10) || 0))}
            style={{
              width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${cores.borderMateria}`,
              backgroundColor: cores.bgBotaoMateria, color: cores.textoPrincipal, textAlign: 'center', fontWeight: 'bold'
            }}
          />
        </div>
      </div>
    </header>
  );
}

















// import React from 'react';
// import { useNavigate, useLocation } from 'react-router';

// interface HeaderProps {
//   tema: 'claro' | 'escuro';
//   setTema: React.Dispatch<React.SetStateAction<'claro' | 'escuro'>>;
//   materiasConcluidas: number;
//   totalMaterias: number;
//   onReset: () => void;
//   cores: any;
//   metaOptativas: number;
//   setMetaOptativas: React.Dispatch<React.SetStateAction<number>>;
//   optativasConcluidas?:number
// }

// export default function Header({ 
//   tema, setTema, materiasConcluidas, totalMaterias, onReset, cores, metaOptativas, setMetaOptativas, optativasConcluidas 
// }: HeaderProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <header style={{ 
//       display: 'flex', 
//       flexDirection: 'column',
//       gap: '12px', 
//       padding: '15px', 
//       backgroundColor: cores.bgCardHeader, 
//       boxShadow: cores.boxShadow,
//       position: 'sticky',
//       top: 0,
//       zIndex: 1000,
//       backdropFilter: 'blur(8px)',
//       borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`,
//       transition: 'all 0.25s ease'
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//         <div>
//           <h1 style={{ margin: 0, fontSize: '18px', color: tema === 'escuro' ? '#61dafb' : '#0050b3' }}>
//             Simulador de Grade
//           </h1>
//           <p style={{ margin: '3px 0 0 0', color: cores.textoSecundario, fontSize: '13px' }}>
//             Progresso:
//           </p>
//           <p style={{ margin: '3px 0 0 15px', color: cores.textoSecundario, fontSize: '13px' }}>
//             <div>{materiasConcluidas} de {totalMaterias} obrigatórias</div> 
//             <div>{optativasConcluidas} de {metaOptativas} optativas</div>
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

//       {/* ⚠️ ESTEIRA ROLANTE HORIZONTAL PARA CELULAR (Rolar para esquerda/direita) */}
//       <div style={{ 
//         display: 'flex', 
//         gap: '10px', 
//         alignItems: 'center',
//         overflowX: 'auto',
//         whiteSpace: 'nowrap',
//         width: '100%',
//         paddingBottom: '5px',
//         WebkitOverflowScrolling: 'touch',
//         scrollbarWidth: 'none'
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

//         {/* Input de Meta de Optativas na mesma linha de rolagem */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', paddingLeft: '10px', flexShrink: 0 }}>
//           <span style={{ fontSize: '12px', color: cores.textoSecundario }}>Meta Optativas:</span>
//           <input 
//             type="number" 
//             min="0"
//             max="20"
//             value={metaOptativas}
//             onChange={(e) => setMetaOptativas(Math.max(0, parseInt(e.target.value, 10) || 0))}
//             style={{
//               width: '45px',
//               padding: '4px',
//               borderRadius: '4px',
//               border: `1px solid ${cores.borderMateria}`,
//               backgroundColor: cores.bgBotaoMateria,
//               color: cores.textoPrincipal,
//               textAlign: 'center',
//               fontWeight: 'bold'
//             }}
//           />
//         </div>
//       </div>
//     </header>
//   );
// }
