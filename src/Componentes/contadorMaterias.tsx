import React from 'react';

// Tipagem das propriedades (Props) aceitas pelo componente
interface ContadorMateriasProps {
  quantidade: number;
  tema: 'claro' | 'escuro';
  textoSecundario: string; // Nome exato esperado
}

export default function ContadorMaterias({ quantidade, tema, textoSecundario }: ContadorMateriasProps) {
  // Define dinamicamente o fundo e as bordas de acordo com a seleção e o tema
  const bgBadge = quantidade > 0 
    ? (tema === 'escuro' ? 'rgba(82, 196, 26, 0.15)' : '#e6f7ff') 
    : (tema === 'escuro' ? '#333340' : '#f0f0f0');

  const corTexto = quantidade > 0 
    ? (tema === 'escuro' ? '#52c41a' : '#1890ff') 
    : textoSecundario;

  const bordaBadge = quantidade > 0
    ? `1px solid ${tema === 'escuro' ? 'rgba(82, 196, 26, 0.3)' : '#bae7ff'}`
    : `1px solid ${tema === 'escuro' ? '#444' : '#d9d9d9'}`;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      backgroundColor: bgBadge,
      color: corTexto,
      border: bordaBadge,
      transition: 'all 0.2s ease',
      width: 'fit-content',
      marginBottom: '10px'
    }}>
      {/* Pequeno círculo indicador de status */}
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: quantidade > 0 ? '#52c41a' : '#8c8c8c',
        marginRight: '8px',
        display: 'inline-block'
      }} />
      
      {quantidade} {quantidade === 1 ? 'matéria puxada' : 'matérias puxadas'}
    </div>
  );
}
