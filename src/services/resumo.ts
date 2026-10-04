import type { DadosResumo } from '../types/resumo'

// MESMA regra da turma: quem fala com a rede e' o servico, nunca o componente.
export async function buscarResumo(): Promise<DadosResumo> {
  try {
    const resposta = await fetch(import.meta.env.VITE_RESUMO_URL, {
      headers: { Accept: 'application/json' },
    })
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
    const dados: DadosResumo = await resposta.json()
    return dados
  } catch (falha) {
    console.error('[buscarResumo]', falha)
    throw new Error('Não foi possível carregar o resumo. Recarregue a página.')
  }
}
