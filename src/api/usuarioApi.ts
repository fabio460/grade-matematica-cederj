import { link } from "."

export const getUsuarioApi = async() => {
   const res = await fetch(link+'usuario',{
    method:"GET"
   }).then(r=>r.json()) 
   return res   
}