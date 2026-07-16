
import { type Disciplina } from './listaDeMaterias';
import ContadorMaterias from './contadorMaterias';
import QuadranteHorario from './quadranteHorario';

interface CardPeriodoProps {
  periodo: number;
  tema: 'claro' | 'escuro';
  cores: any;
  materiasDoPeriodo: number;
  materiasSemHorario: Disciplina[];
  obterMateriasParaOQuadrante: (grupo: "G1" | "G2" | "SEM_GRUPO", dia?: 'sábado' | 'domingo', turno?: 'manhã' | 'tarde') => Disciplina[];
  toggleSelecao: (materia: Disciplina) => void;
}

export default function CardPeriodo({
  periodo, tema, cores, materiasDoPeriodo, materiasSemHorario, obterMateriasParaOQuadrante, toggleSelecao
}: CardPeriodoProps) {
  return (
    <div style={{ 
      backgroundColor: cores.bgCardPeriodo, 
      borderRadius: '10px', 
      padding: '12px', // Reduzido um pouco para dar mais espaço em mobile
      boxShadow: cores.boxShadow, 
      transition: 'all 0.25s ease',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      <div style={{ borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`, paddingBottom: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '18px', color: cores.textoPrincipal, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {periodo}º Período
        </h2>
        <ContadorMaterias quantidade={materiasDoPeriodo} tema={tema} textoSecundario={cores.textoSecundario} />
      </div>

      {/* GRID DOS GRUPOS: Se ajusta dinamicamente mudando de 2 para 1 coluna se a tela encolher */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '15px' 
      }}>
        
        {/* COLUNA DO GRUPO 1 */}
        <div style={{ backgroundColor: cores.bgColunaGrupo, padding: '10px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1890ff', borderBottom: '2px solid #1890ff', paddingBottom: '3px', fontSize: '15px', textAlign: 'center' }}>G1</h3>
          
          {/* Ajustado minmax para 120px para não esmagar sábado/domingo lado a lado */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Manhã" materias={obterMateriasParaOQuadrante('G1', 'sábado', 'manhã')} onToggle={toggleSelecao} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Tarde" materias={obterMateriasParaOQuadrante('G1', 'sábado', 'tarde')} onToggle={toggleSelecao} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Manhã" materias={obterMateriasParaOQuadrante('G1', 'domingo', 'manhã')} onToggle={toggleSelecao} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Tarde" materias={obterMateriasParaOQuadrante('G1', 'domingo', 'tarde')} onToggle={toggleSelecao} />
            </div>
          </div>
        </div>

        {/* COLUNA DO GRUPO 2 */}
        <div style={{ backgroundColor: cores.bgColunaGrupo, padding: '10px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#eb2f96', borderBottom: '2px solid #eb2f96', paddingBottom: '3px', fontSize: '15px', textAlign: 'center' }}>G2</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Manhã" materias={obterMateriasParaOQuadrante('G2', 'sábado', 'manhã')} onToggle={toggleSelecao} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Sábado Tarde" materias={obterMateriasParaOQuadrante('G2', 'sábado', 'tarde')} onToggle={toggleSelecao} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Manhã" materias={obterMateriasParaOQuadrante('G2', 'domingo', 'manhã')} onToggle={toggleSelecao} />
              <QuadranteHorario tema={tema} cores={cores} titulo="Domingo Tarde" materias={obterMateriasParaOQuadrante('G2', 'domingo', 'tarde')} onToggle={toggleSelecao} />
            </div>
          </div>
        </div>

      </div>

      {/* Bloco de Disciplinas EAD */}
      {materiasSemHorario.length > 0 && (
        <div style={{ marginTop: '15px', backgroundColor: cores.bgColunaGrupo, padding: '12px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#faad14', borderBottom: '2px solid #faad14', paddingBottom: '3px', fontSize: '14px', textAlign: 'center' }}>
            Matérias EAD / Sem Horário Fixo
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {materiasSemHorario.map(m => (
              <button
                key={m.codigo}
                onClick={() => toggleSelecao(m)}
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: m.selecionado ? `1px solid ${cores.borderMateriaSelecionada}` : `1px solid ${cores.borderMateria}`,
                  backgroundColor: m.selecionado ? cores.bgMateriaSelecionada : cores.bgBotaoMateria,
                  color: m.selecionado ? cores.textoMateriaSelecionada : cores.textoPrincipal,
                  fontSize: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{m.nome}</div>
                <div style={{ 
                  fontSize: '10px', 
                  color: m.selecionado ? (tema === 'escuro' ? '#a2e8a2' : '#0050b3') : cores.textoSecundario,
                  marginTop: '2px',
                  display:"flex",
                  justifyContent:'space-between', 
                }}>
                    <div>
                      {m.codigo} - <span>{m.periodo}° período</span>
                    </div>
                    <span>{m.tipo}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
