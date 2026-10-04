import { useEffect, useState } from 'react'
import { buscarResumo } from '../../services/resumo'

// Tela nova (Desafio N3): um numero que chega de fora, com os tres estados.
function Resumo() {
  const [total, setTotal] = useState<number | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      setErro('')
      try {
        const dados = await buscarResumo()   // nenhum fetch aqui: o servico fala com a rede
        setTotal(dados.totalEntregas)
      } catch (falha) {
        setTotal(null)   // o numero nao trava num valor antigo
        setErro(falha instanceof Error ? falha.message : 'Não foi possível carregar o resumo.')
      } finally {
        setCarregando(false)   // deu certo ou errado, a espera acabou
      }
    }

    carregar()
  }, [])

  return (
    <section className="quadro">
      <h2>Resumo da turma</h2>

      {/* as regioes vivas ficam sempre montadas: o leitor de tela anuncia a MUDANCA */}
      <p className="aviso" role="status" aria-live="polite">
        {carregando && <span>carregando o resumo...</span>}
      </p>
      <p className="erro" role="alert" aria-live="assertive">{erro}</p>

      {total !== null && <p className="placar">Total de entregas: {total}</p>}
    </section>
  )
}

export default Resumo
