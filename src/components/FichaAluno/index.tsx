import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import type { Aluno } from '../../types/aluno'

interface FichaAlunoProps {
  alunos: Aluno[]
  carregando?: boolean
}

function FichaAluno({ alunos, carregando = false }: FichaAlunoProps) {
  // para o useParams, todo parametro pode faltar: o tipo de `id` e' `string | undefined`
  const { id } = useParams()
  const navigate = useNavigate()

  // a guarda do undefined: Number(undefined) compila e vira NaN, calado.
  // Ela e' um VALOR (nao um return), para o useEffect de baixo rodar em todo render.
  const procurado = id === undefined ? undefined : Number(id)
  const aluno = procurado === undefined ? undefined : alunos.find(item => item.id === procurado)

  useEffect(() => {
    // ninguem clicou: o CODIGO leva a pessoa embora, porque este id nao existe na turma.
    // Espera a turma chegar antes de decidir.
    if (!carregando && alunos.length > 0 && aluno === undefined) {
      // replace: true tira a URL ruim do historico (o Voltar nao cai nela de novo)
      navigate('/', { replace: true })
    }
  }, [carregando, alunos.length, aluno, navigate])

  if (carregando) return null
  if (aluno === undefined) return null

  return (
    <section className="quadro">
      <h2>{aluno.nome}</h2>
      <p className="placar"><span className={aluno.presente ? 'badge ok' : 'badge nope'}>{aluno.presente ? 'presente hoje' : 'ausente hoje'}</span></p>
      <ul>
        <li className="cartao">
          <span className="nome">entregas</span>
          <span className="contagem">{aluno.entregas}</span>
        </li>
        <li className="cartao">
          <span className="nome">id na turma</span>
          <span className="contagem">{aluno.id}</span>
        </li>
      </ul>
      <Link to="/" className="voltar">voltar para a chamada</Link>
    </section>
  )
}

export default FichaAluno
