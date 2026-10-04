import type { Aluno } from '../../types/aluno'

interface CartaoEntregaProps {
  aluno: Aluno
  onEntrega: (id: number) => void
}

function CartaoEntrega({ aluno, onEntrega }: CartaoEntregaProps) {
  return (
    <li className="cartao">
      <span className="nome">{aluno.nome}</span>
      <span className="contagem">{aluno.entregas}</span>
      <button onClick={() => onEntrega(aluno.id)}>+1 entrega</button>
    </li>
  )
}

export default CartaoEntrega
