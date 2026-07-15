export function obterMapaCores(tema: 'claro' | 'escuro') {
  return {
    bgPagina: tema === 'escuro' ? '#1e1e24' : '#f4f5f7',
    bgCardHeader: tema === 'escuro' ? '#2a2a35' : '#ffffff',
    bgCardPeriodo: tema === 'escuro' ? '#25252f' : '#ffffff',
    bgColunaGrupo: tema === 'escuro' ? '#1c1c24' : '#fafafa',
    bgQuadrante: tema === 'escuro' ? '#2a2a35' : '#f0f2f5',
    bgBotaoMateria: tema === 'escuro' ? '#333340' : '#ffffff',
    bgMateriaSelecionada: tema === 'escuro' ? '#1c3d1c' : '#e6f7ff',
    borderMateria: tema === 'escuro' ? '#555' : '#d9d9d9',
    borderMateriaSelecionada: tema === 'escuro' ? '#52c41a' : '#1890ff',
    textoPrincipal: tema === 'escuro' ? '#ffffff' : '#000000',
    textoSecundario: tema === 'escuro' ? '#bbb' : '#555',
    textoMateriaSelecionada: tema === 'escuro' ? '#52c41a' : '#1890ff',
    boxShadow: tema === 'escuro' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.05)',
  };
}
