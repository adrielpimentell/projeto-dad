import type { Aluno } from '../types/aluno'

// A conversa com a rede mora AQUI, e só aqui. Nenhum componente dá fetch.
// O serviço promete um tipo (Promise<Aluno[]>) e traduz a falha tecnica
// numa frase que serve para uma PESSOA ler na tela.
export async function buscarTurma(): Promise<Aluno[]> {
  try {
    const resposta = await fetch(import.meta.env.VITE_API_URL, {
      headers: { Accept: 'application/json' },   // pedimos JSON: no servidor de dev, arquivo ausente vira 404
    })
    // fetch NAO falha em 404: ele devolve uma resposta com ok:false. Sem esta conferencia,
    // o 404 segue para o .json() e estoura como SyntaxError, em outro lugar.
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
    const dados: Aluno[] = await resposta.json()
    return dados
  } catch (falha) {
    console.error('[buscarTurma]', falha)   // o motivo tecnico fica no console, para quem programa
    throw new Error('Não foi possível carregar a turma. Recarregue a página.')
  }
}
