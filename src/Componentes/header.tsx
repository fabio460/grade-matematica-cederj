import React from 'react';
import { useNavigate, useLocation } from 'react-router';

interface HeaderProps {
  tema: 'claro' | 'escuro';
  setTema: React.Dispatch<React.SetStateAction<'claro' | 'escuro'>>;
  materiasConcluidas: number;
  totalMaterias: number;
  onReset: () => void;
  cores: any;
}

export default function Header({ tema, setTema, materiasConcluidas, totalMaterias, onReset, cores }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header style={{ 
      display: 'flex', 
      flexDirection: 'row',
      flexWrap: 'wrap', // Permite quebrar linha em telas pequenas
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: '15px', 
      padding: '15px', 
      backgroundColor: cores.bgCardHeader, 
      boxShadow: cores.boxShadow,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${tema === 'escuro' ? '#3e3e4f' : '#e8e8e8'}`,
      transition: 'all 0.25s ease'
    }}>
      <div style={{ minWidth: '200px' }}>
        <h1 style={{ margin: 0, fontSize: '18px', color: tema === 'escuro' ? '#61dafb' : '#0050b3' }}>
          Simulador de Grade
        </h1>
        <p style={{ margin: '3px 0 0 0', color: cores.textoSecundario, fontSize: '13px' }}>
          Progresso: <strong>{materiasConcluidas} de {totalMaterias}</strong>
        </p>
      </div>

      {/* Container de botões flexível para mobile */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: location.pathname === '/' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📊 Grade
        </button>
        <button 
          onClick={() => navigate('/isencoes')} 
          style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#333340' : '#e6f7ff') : 'transparent', color: location.pathname === '/isencoes' ? (tema === 'escuro' ? '#61dafb' : '#1890ff') : cores.textoPrincipal, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🛡️ Isenções
        </button>

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
    </header>
  );
}
