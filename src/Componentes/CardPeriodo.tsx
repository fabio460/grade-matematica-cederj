import ContadorMaterias from "./contadorMaterias";
import type { Disciplina } from "./listaDeMaterias";
import QuadranteHorario from "./quadranteHorario";


interface CardPeriodoProps {
  periodo: number;
  tema: 'claro' | 'escuro';
  cores: any;
  materiasDoPeriodo: number;
  materiasSemHorario: Disciplina[];
  obterMateriasParaOQuadrante: (grupo: "G1" | "G2" | "SEM_GRUPO", dia?: 'sábado' | 'domingo', turno?: 'manhã' | 'tarde') => Disciplina[];
  toggleSelecao: (materia: Disciplina) => void;
  optativasAtuaisConcluidas: number; // Nova prop
  metaOptativas: number; // Nova prop
}

export default function CardPeriodo({
  periodo, tema, cores, materiasDoPeriodo, materiasSemHorario, obterMateriasParaOQuadrante, toggleSelecao, optativasAtuaisConcluidas, metaOptativas
}: CardPeriodoProps) {
  
  // Verifica se o aluno atingiu a cota máxima estipulada de optativas
  const atingiuMetaOptativas = optativasAtuaisConcluidas >= metaOptativas;

  // Função auxiliar para injetar estilo de marca d'água e travar clique em optativas excedentes
  const aplicarRegraBotaoOptativa = (m: Disciplina) => {
    const ehOptativa = m.tipo === "Optativa Matemática" || m.tipo === "Optativa Pedagógica";
    const deveBloquear = ehOptativa && atingiuMetaOptativas && !m.selecionado;

    return {
      deveBloquear,
      estiloMateria: deveBloquear ? {
        opacity: 0.35,
        cursor: 'not-allowed',
        pointerEvents: 'none' as const, // Remove fisicamente a capacidade de clique
        position: 'relative' as const,
        background: tema === 'escuro' ? '#22222a' : '#f5f5f5',
        border: '1px dashed #ff4d4f'
      } : {}
    };
  };

  return (
    <div style={{ backgroundColor: cores.bgCardPeriodo, borderRadius: '10px', padding: '12px', boxShadow: cores.boxShadow, transition: 'all 0.25s ease', width: '100%', boxSizing: 'border-box' }}>
      
      <div style={{ borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, paddingBottom: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '18px', color: cores.textoPrincipal, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {periodo}º Período
        </h2>
        <ContadorMaterias quantidade={materiasDoPeriodo} tema={tema} textoSecundario={cores.textoSecundario} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
        {/* COLUNA DO GRUPO 1 */}
        <div style={{ backgroundColor: cores.bgColunaGrupo, padding: '10px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1890ff', borderBottom: '2px solid #1890ff', paddingBottom: '3px', fontSize: '15px', textAlign: 'center' }}>G1</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Manhã" materias={obterMateriasParaOQuadrante('G1', 'sábado', 'manhã')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Tarde" materias={obterMateriasParaOQuadrante('G1', 'sábado', 'tarde')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Manhã" materias={obterMateriasParaOQuadrante('G1', 'domingo', 'manhã')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Tarde" materias={obterMateriasParaOQuadrante('G1', 'domingo', 'tarde')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
            </div>
          </div>
        </div>

        {/* COLUNA DO GRUPO 2 */}
        <div style={{ backgroundColor: cores.bgColunaGrupo, padding: '10px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#eb2f96', borderBottom: '2px solid #eb2f96', paddingBottom: '3px', fontSize: '15px', textAlign: 'center' }}>G2</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Manhã" materias={obterMateriasParaOQuadrante('G2', 'sábado', 'manhã')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Tarde" materias={obterMateriasParaOQuadrante('G2', 'sábado', 'tarde')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Manhã" materias={obterMateriasParaOQuadrante('G2', 'domingo', 'manhã')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Tarde" materias={obterMateriasParaOQuadrante('G2', 'domingo', 'tarde')} onToggle={toggleSelecao} regraOptativa={aplicarRegraBotaoOptativa} />
            </div>
          </div>
        </div>
      </div>

      {/* Bloco de Disciplinas EAD */}
      {materiasSemHorario.length > 0 && (
        <div style={{ marginTop: '15px', backgroundColor: cores.bgColunaGrupo, padding: '12px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#faad14', borderBottom: '2px solid #faad14', paddingBottom: '3px', fontSize: '14px', textAlign: 'center' }}>
            Sem provas presenciais
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {materiasSemHorario.map(m => {
              const rule = aplicarRegraBotaoOptativa(m);
              return (
                <button
                  key={m.codigo} onClick={() => toggleSelecao(m)} disabled={rule.deveBloquear}
                  style={{
                    padding: '10px', borderRadius: '4px', textAlign: 'left', cursor: rule.deveBloquear ? 'not-allowed' : 'pointer',
                    border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`,
                    backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria,
                    color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal, fontSize: '12px',
                    ...rule.estiloMateria
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{m.nome}</div>
                  <div style={{ fontSize: '10px', marginTop: '2px', color: rule.deveBloquear ? '#ff4d4f' : (m.selecionado ? (tema === 'escuro' ? '#a2e8a2' : '#0050b3') : cores.textoSecundario) }}>
                    {rule.deveBloquear ? '🔒 Meta Cumprida' :
                     <div style={{display:'flex' , justifyContent:'space-between'}}>
                        <div>{m.codigo}</div>
                        <div style={{
                          color:m.tipo === 'Obrigatória' ?
                          cores.borderMateriaSelecionada:
                          m.tipo === 'Optativa Matemática' ? cores.optativaPedagogica: cores.optativaMatemárica
                        }}>{m.tipo}</div>  
                     </div>
                    }
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
