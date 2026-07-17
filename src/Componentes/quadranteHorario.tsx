import React from 'react';
import { type Disciplina } from './listaDeMaterias';

interface QuadranteProps {
  titulo: string;
  materias: Disciplina[];
  onToggle: (materia: Disciplina) => void;
  cores: any;
  tema: string;
  regraOptativa: (m: Disciplina) => { deveBloquear: boolean; estiloMateria: React.CSSProperties }; // Nova prop
}

export default function QuadranteHorario({ titulo, materias, onToggle, cores, tema, regraOptativa }: QuadranteProps) {
  return (
    <div style={{ backgroundColor: cores.bgQuadrante, border: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, borderRadius: '6px', padding: '10px', minHeight: '100px', transition: 'all 0.25s ease' }}>
      <h4 style={{ margin: '0 0 10px 0', color: cores.textoSecundario, fontSize: '12px', textAlign: 'center', borderBottom: `1px solid ${tema === 'escuro' ? '#444' : '#e8e8e8'}`, paddingBottom: '4px' }}>
        {titulo}
      </h4>
      {materias.length === 0 ? (
        <p style={{ margin: 0, fontSize: '11px', color: '#8c8c8c', fontStyle: 'italic', textAlign: 'center' }}>Liberada em outro bloco</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {materias.map(m => {
            // Executa a validação de bloqueio e estilo de marca d'água para esta matéria específica
            const rule = regraOptativa(m);

            return (
              <button
                key={m.codigo}
                onClick={() => onToggle(m)}
                disabled={rule.deveBloquear}
                style={{
                  width: '100%', padding: '8px', borderRadius: '4px', textAlign: 'left', transition: 'all 0.15s ease',
                  cursor: rule.deveBloquear ? 'not-allowed' : 'pointer',
                  border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`,
                  backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria,
                  color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal,
                  fontSize: '12px', fontWeight: m.selecionado ? 'bold' : 'normal',
                  ...rule.estiloMateria
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{m.nome}</div>
                <div style={{ 
                     fontSize: '10px', color: rule.deveBloquear ? '#ff4d4f' :
                     (m.selecionado ? (tema === 'escuro' ? '#a2e8a2' :
                        '#0050b3') : cores.textoSecundario) 
                     }}>
                  {rule.deveBloquear ? 
                   
                    <div style={{display:'flex' , justifyContent:'space-between'}}>
                        <div> '🔒 Meta Cumprida'</div>
                        <div>{m.tipo}</div>  
                    </div>
                   :
                    <div style={{display:'flex' , justifyContent:'space-between'}}>
                        <div>{m.codigo}</div>
                       <div style={{
                            color:m.tipo === 'Obrigatória' ?
                            cores.borderMateriaSelecionada:
                            m.tipo === 'Optativa Matemática' ? cores.optativaPedagogica: cores.optativaMatemárica
                        }}>
                            {m.tipo}
                        </div>  
                    </div>
                  }
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}










// import type { Disciplina } from "./listaDeMaterias";

// interface QuadranteProps { titulo: string; materias: Disciplina[]; onToggle: (materia: Disciplina) => void; cores: any; tema: string; }
// export default function QuadranteHorario({ titulo, materias, onToggle, cores, tema }: QuadranteProps) {
//   return (
//     <div style={{ backgroundColor: cores.bgQuadrante, border: `1px solid  ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, borderRadius: '6px', padding: '10px', minHeight: '100px', transition: 'all 0.25s ease' }}>
//       <h4 style={{ margin: '0 0 10px 0', color: cores.textoSecundario, fontSize: '12px', textAlign: 'center', borderBottom: `1px solid ${tema === 'escuro' ? '#444' : '#e8e8e8'}`, paddingBottom: '4px' }}>
//         {titulo}
//       </h4>
//       {materias.length === 0 ? (
//         <p style={{ 
//           margin: 0, fontSize: '11px', 
//           color: '#8c8c8c', fontStyle: 'italic', textAlign: 'center' 
//         }}>Não há matérias disponíveis</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {materias.map(m => (
//             <button key={m.codigo} onClick={() => onToggle(m)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`, backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria, color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal, fontSize: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease', fontWeight: m.selecionado ? 'bold' : 'normal' }}>
//               <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{m.nome}</div>
//               <div style={{ 
//                   fontSize: '10px',
//                   display:"flex",
//                   justifyContent:'space-between',
//                   color: m.selecionado ? (tema === 'escuro' ? '#a2e8a2' : '#0050b3') : cores.textoSecundario 
//               }}>
//                 <div>
//                    {m.codigo} - <span>{m.periodo}° período</span>
//                 </div>
//                 <span>{m.tipo}</span>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }