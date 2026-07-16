import React from 'react';
import { useOutletContext } from 'react-router';

interface GradeContext {
  cores: any;
}

export default function TelaInstrucoes() {
  const { cores } = useOutletContext<GradeContext>();

  return (
    <div style={{ backgroundColor: cores.bgCardPeriodo, borderRadius: '10px', padding: '25px', boxShadow: cores.boxShadow, transition: 'all 0.25s ease', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ borderBottom: `1px solid ${cores.borderMateria}`, paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', color: cores.textoPrincipal }}>📖 Guia de Uso do Simulador</h2>
        <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario, fontSize: '14px' }}>
          Aprenda a extrair o máximo de fidelidade no planejamento do seu curso.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', lineHeight: '1.6' }}>
        <div>
          <strong style={{ color: '#1890ff', fontSize: '16px' }}>1. Dinâmica dos Períodos</strong>
          <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario }}>
            O simulador gera novos períodos automaticamente conforme você avança. Se você empurrar matérias para frente devido a dependências ou choques de horário, novos cards de períodos surgirão indefinidamente na tela até que sua grade seja concluída.
          </p>
        </div>

        <div>
          <strong style={{ color: '#faad14', fontSize: '16px' }}>2. Liberação por Pré-Requisitos</strong>
          <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario }}>
            Uma matéria de qualquer período só aparecerá disponível para seleção se **todos** os pré-requisitos descritos nela tiverem sido selecionados em cartões de períodos numericamente anteriores.
          </p>
        </div>

        <div>
          <strong style={{ color: '#eb2f96', fontSize: '16px' }}>3. Choque de Horários e Substituição</strong>
          <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario }}>
            O sistema impede que você puxe duas matérias presenciais no mesmo bloco (ex: Sábado Tarde no G1). Ao clicar em uma nova opção, a matéria que estava ativa naquele mesmo horário e período será desmarcada automaticamente.
          </p>
        </div>

        <div>
          <strong style={{ color: '#52c41a', fontSize: '16px' }}>4. Meta de Optativas e Bloqueio</strong>
          <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario }}>
            Você pode customizar quantas optativas deseja fazer usando o campo <strong>"Meta Optativas"</strong> no topo da tela. Assim que você atingir essa quantidade, todas as outras optativas livres do painel serão desativadas e exibirão uma etiqueta de meta cumprida.
          </p>
        </div>

        <div>
          <strong style={{ color: '#61dafb', fontSize: '16px' }}>5. Central de Isenções</strong>
          <p style={{ margin: '5px 0 0 0', color: cores.textoSecundario }}>
            Acesse a aba de Isenções para eliminar matérias já cursadas ou equivalentes. Marcar uma matéria avançada como isenta gerará um efeito cascata que aprovará automaticamente todos os pré-requisitos históricos ligados a ela.
          </p>
        </div>
      </div>
    </div>
  );
}
