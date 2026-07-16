
import { createBrowserRouter } from 'react-router';
import LayoutBase from './LayoutBase';
import GerenciadorGrade from './gerenciadorGrade';
import TelaIsencoes from './TelaIsencoes';
import TelaInstrucoes from './TelaInstrucoes';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutBase />,
    children: [
      {
        index: true,
        element: <GerenciadorGrade />
      },
      {
        path: "isencoes",
        element: <TelaIsencoes />
      },
      {
        path: "instrucoes", // Nova Rota Cadastrada
        element: <TelaInstrucoes />
      }
    ]
  }
]);
