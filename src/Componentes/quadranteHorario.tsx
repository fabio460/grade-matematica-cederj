import React from 'react';
import { type Disciplina } from './listaDeMaterias';

interface QuadranteProps {
  titulo: string;
  materias: Disciplina[];
  onToggle: (materia: Disciplina) => void;
  cores: any;
  tema: string;
  regraOptativa: (m: Disciplina) => { deveBloquear: boolean; estiloMateria: React.CSSProperties };
}

export default function QuadranteHorario({ titulo, materias, onToggle, cores, tema, regraOptativa }: QuadranteProps) {
  // Analisa se há alguma matéria ativa neste quadrante para destacar a borda
  const possuiMateriaSelecionada = materias.some(m => m.selecionado);

  // Descobre o grupo do bloco olhando a primeira matéria disponível
  const primeiroItem = materias[0];
  const grupoDoBloco = primeiroItem ? primeiroItem.grupo : null; 

  // Define a cor de destaque dinâmica baseada no grupo (G1 = Azul | G2 = Rosa)
  const corDestaqueGrupo = grupoDoBloco === 'G1' ? '#1890ff' : '#eb2f96';

  // Configura a borda externa inteligente do bloco todo
  const bordaFixoBloco = possuiMateriaSelecionada
    ? `2px solid ${corDestaqueGrupo}`
    : `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`;

  return (
    <div style={{ 
      backgroundColor: cores.bgQuadrante, 
      border: bordaFixoBloco, 
      borderRadius: '6px', 
      padding: '10px', 
      minHeight: '100px', 
      transition: 'all 0.25s ease',
      boxShadow: possuiMateriaSelecionada 
        ? `0 0 8px ${grupoDoBloco === 'G1' ? 'rgba(24,144,255,0.2)' : 'rgba(235,47,150,0.2)'}` 
        : 'none'
    }}>
      <h4 style={{ 
        margin: '0 0 10px 0', 
        color: possuiMateriaSelecionada ? corDestaqueGrupo : cores.textoSecundario, 
        fontSize: '12px', 
        textAlign: 'center', 
        borderBottom: `1px solid ${tema === 'escuro' ? '#444' : '#e8e8e8'}`, 
        paddingBottom: '4px',
        fontWeight: possuiMateriaSelecionada ? 'bold' : 'normal',
        transition: 'color 0.2s'
      }}>
        {titulo}
      </h4>
      
      {materias.length === 0 ? (
        <p style={{ margin: 0, fontSize: '11px', color: '#8c8c8c', fontStyle: 'italic', textAlign: 'center' }}>
          Não há materias disponíveis!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {materias.map(m => {
            const rule = regraOptativa(m);

            return (
              <button
                key={m.codigo}
                onClick={() => onToggle(m)}
                disabled={rule.deveBloquear}
                style={{
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  textAlign: 'left', 
                  transition: 'all 0.15s ease',
                  cursor: rule.deveBloquear ? 'not-allowed' : 'pointer',
                  border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`,
                  backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria,
                  color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal,
                  fontSize: '12px', 
                  fontWeight: m.selecionado ? 'bold' : 'normal',
                  ...rule.estiloMateria
                }}
              >
                {/* Nome do componente no topo da caixinha */}
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{m.nome}</div>
                
                {/* Rodapé da caixinha com a sua nova atualização de cores por tipo de matéria */}
                <div style={{
                  fontSize: '10px', 
                  color: rule.deveBloquear ? '#ff4d4f' : 
                    (m.selecionado ? (tema === 'escuro' ? '#a2e8a2' : '#0050b3') : cores.textoSecundario)
                }}>
                  {rule.deveBloquear ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>🔒 Optativas concluídas</div>
                      <div style={{
                        color: m.tipo === 'Obrigatória' ? 
                          cores.borderMateriaSelecionada : 
                          m.tipo === 'Optativa Matemática' ? 
                            cores.optativaPedagogica : 
                            cores.optativaMatemárica
                      }}>
                        {m.tipo}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>{m.codigo}- {m.periodo}° período </div>
                      <div style={{
                        color: m.tipo === 'Obrigatória' ? 
                          cores.borderMateriaSelecionada : 
                          m.tipo === 'Optativa Matemática' ? 
                            cores.optativaPedagogica : 
                            cores.optativaMatemárica
                      }}>
                        {m.tipo}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}











// import React from 'react';
// import { type Disciplina } from './listaDeMaterias';

// interface QuadranteProps {
//   titulo: string;
//   materias: Disciplina[];
//   onToggle: (materia: Disciplina) => void;
//   cores: any;
//   tema: string;
//   regraOptativa: (m: Disciplina) => { deveBloquear: boolean; estiloMateria: React.CSSProperties }; // Nova prop
// }

// export default function QuadranteHorario({ titulo, materias, onToggle, cores, tema, regraOptativa }: QuadranteProps) {
//   return (
//     <div style={{ backgroundColor: cores.bgQuadrante, border: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, borderRadius: '6px', padding: '10px', minHeight: '100px', transition: 'all 0.25s ease' }}>
//       <h4 style={{ margin: '0 0 10px 0', color: cores.textoSecundario, fontSize: '12px', textAlign: 'center', borderBottom: `1px solid ${tema === 'escuro' ? '#444' : '#e8e8e8'}`, paddingBottom: '4px' }}>
//         {titulo}
//       </h4>
//       {materias.length === 0 ? (
//         <p style={{ margin: 0, fontSize: '11px', color: '#8c8c8c', fontStyle: 'italic', textAlign: 'center' }}>Liberada em outro bloco</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//           {materias.map(m => {
//             // Executa a validação de bloqueio e estilo de marca d'água para esta matéria específica
//             const rule = regraOptativa(m);

//             return (
//               <button
//                 key={m.codigo}
//                 onClick={() => onToggle(m)}
//                 disabled={rule.deveBloquear}
//                 style={{
//                   width: '100%', padding: '8px', borderRadius: '4px', textAlign: 'left', transition: 'all 0.15s ease',
//                   cursor: rule.deveBloquear ? 'not-allowed' : 'pointer',
//                   border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`,
//                   backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria,
//                   color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal,
//                   fontSize: '12px', fontWeight: m.selecionado ? 'bold' : 'normal',
//                   ...rule.estiloMateria
//                 }}
//               >
//                 <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{m.nome}</div>
//                 <div style={{ 
//                      fontSize: '10px', color: rule.deveBloquear ? '#ff4d4f' :
//                      (m.selecionado ? (tema === 'escuro' ? '#a2e8a2' :
//                         '#0050b3') : cores.textoSecundario) 
//                      }}>
//                   {rule.deveBloquear ? 
                   
//                     <div style={{display:'flex' , justifyContent:'space-between'}}>
//                         <div> '🔒 Meta Cumprida'</div>
//                         <div>{m.tipo}</div>  
//                     </div>
//                    :
//                     <div style={{display:'flex' , justifyContent:'space-between'}}>
//                         <div>{m.codigo}</div>
//                        <div style={{
//                             color:m.tipo === 'Obrigatória' ?
//                             cores.borderMateriaSelecionada:
//                             m.tipo === 'Optativa Matemática' ? cores.optativaPedagogica: cores.optativaMatemárica
//                         }}>
//                             {m.tipo}
//                         </div>  
//                     </div>
//                   }
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }










// // import type { Disciplina } from "./listaDeMaterias";

// // interface QuadranteProps { titulo: string; materias: Disciplina[]; onToggle: (materia: Disciplina) => void; cores: any; tema: string; }
// // export default function QuadranteHorario({ titulo, materias, onToggle, cores, tema }: QuadranteProps) {
// //   return (
// //     <div style={{ backgroundColor: cores.bgQuadrante, border: `1px solid  ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, borderRadius: '6px', padding: '10px', minHeight: '100px', transition: 'all 0.25s ease' }}>
// //       <h4 style={{ margin: '0 0 10px 0', color: cores.textoSecundario, fontSize: '12px', textAlign: 'center', borderBottom: `1px solid ${tema === 'escuro' ? '#444' : '#e8e8e8'}`, paddingBottom: '4px' }}>
// //         {titulo}
// //       </h4>
// //       {materias.length === 0 ? (
// //         <p style={{ 
// //           margin: 0, fontSize: '11px', 
// //           color: '#8c8c8c', fontStyle: 'italic', textAlign: 'center' 
// //         }}>Não há matérias disponíveis</p>
// //       ) : (
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
// //           {materias.map(m => (
// //             <button key={m.codigo} onClick={() => onToggle(m)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`, backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria, color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal, fontSize: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease', fontWeight: m.selecionado ? 'bold' : 'normal' }}>
// //               <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{m.nome}</div>
// //               <div style={{ 
// //                   fontSize: '10px',
// //                   display:"flex",
// //                   justifyContent:'space-between',
// //                   color: m.selecionado ? (tema === 'escuro' ? '#a2e8a2' : '#0050b3') : cores.textoSecundario 
// //               }}>
// //                 <div>
// //                    {m.codigo} - <span>{m.periodo}° período</span>
// //                 </div>
// //                 <span>{m.tipo}</span>
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }