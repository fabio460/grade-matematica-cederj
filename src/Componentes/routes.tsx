import { createBrowserRouter } from "react-router";
import LayoutBase from "./LayoutBase";
import GerenciadorGrade from "./gerenciadorGrade";
import TelaIsencoes from "./TelaIsencoes";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutBase />, // O Header fica fixo aqui
    children: [
      {
        index: true, // Caminho padrão "/"
        element: <GerenciadorGrade />
      },
      {
        path: "isencoes", // Caminho "/isencoes"
        element: <TelaIsencoes  />
      }
    ]
  }
]);
