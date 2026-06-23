import React from 'react'
import PrimeiroPeriodo from './Componentes/primeiroPeriodo'
import { getUsuarioApi } from './api/usuarioApi'

export default function TelaInicial() {
  async function getUsuario() {
    const r = await getUsuarioApi()
    console.log(r)
  }
  getUsuario()
  return (
    <div>
        <PrimeiroPeriodo/>
    </div>
  )
}
