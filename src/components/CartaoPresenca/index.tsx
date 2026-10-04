import { Link } from 'react-router'
import type { Aluno } from '../../types/aluno'

interface CartaoPresencaProps {
  aluno: Aluno
  onPresenca: (id: number) => void
}

function CartaoPresenca({ aluno, onPresenca }: CartaoPresencaProps) {
  return (
    <li className="cartao">
      {/* o nome vira LINK para a ficha; o <span> fica porque o CSS espera o link dentro dele */}
      <span className="nome"><Link to={`/aluno/${aluno.id}`}>{aluno.nome}</Link></span>
      <span className={aluno.presente ? 'badge ok' : 'badge nope'}>
        {aluno.presente ? 'presente' : 'ausente'}
      </span>
      <button onClick={() => onPresenca(aluno.id)}>
        {aluno.presente ? 'marcar falta' : 'marcar presença'}
      </button>
    </li>
  )
}

export default CartaoPresenca
