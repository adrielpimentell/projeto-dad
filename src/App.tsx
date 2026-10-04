import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import { useEffect, useState } from 'react'
import type { Aluno } from './types/aluno'
import { buscarTurma } from './services/turma'
import Cabecalho from './components/Cabecalho'
import Chamada from './components/Chamada'
import Entregas from './components/Entregas'
import FichaAluno from './components/FichaAluno'
import NaoEncontrado from './components/NaoEncontrado'
import Resumo from './components/Resumo'

function App() {
  // a turma nao mora mais no codigo: ela CHEGA pela rede
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      // a espera comeca e o erro velho e' limpo ANTES de pedir
      setCarregando(true)
      setErro('')
      try {
        const dados = await buscarTurma()   // nenhum fetch aqui: quem fala com a rede e' o servico
        setAlunos(dados)
      } catch (falha) {
        // a frase que a pessoa le' foi escrita pelo SERVICO; aqui so' vira estado
        setErro(falha instanceof Error ? falha.message : 'Não foi possível carregar a turma.')
      } finally {
        setCarregando(false)   // deu certo ou errado, a espera acabou
      }
    }

    carregar()
  }, [])

  function marcarPresenca(id: number) {
    setAlunos(anteriores => anteriores.map(aluno =>
      aluno.id === id ? { ...aluno, presente: !aluno.presente } : aluno
    ))
  }

  function registrarEntrega(id: number) {
    setAlunos(anteriores => anteriores.map(aluno =>
      aluno.id === id ? { ...aluno, entregas: aluno.entregas + 1 } : aluno
    ))
  }

  return (
    <BrowserRouter>
      <div className="painel">
        <Cabecalho />

        {/* as abas viraram LINKS: cada tela tem uma URL, e a URL sobrevive ao F5 */}
        <nav className="abas" aria-label="Telas do painel">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'aba ativa' : 'aba')}>Chamada</NavLink>
          <NavLink to="/entregas" className={({ isActive }) => (isActive ? 'aba ativa' : 'aba')}>Entregas</NavLink>
          <NavLink to="/resumo" className={({ isActive }) => (isActive ? 'aba ativa' : 'aba')}>Resumo</NavLink>
        </nav>

        <main>
          {/* regioes vivas sempre montadas: anunciam a espera e o erro da rede */}
          <p className="aviso" role="status" aria-live="polite">
            {carregando && <span>carregando a turma...</span>}
          </p>
          <p className="erro" role="alert" aria-live="assertive">{erro}</p>

          <Routes>
            <Route path="/" element={<Chamada alunos={alunos} onPresenca={marcarPresenca} />} />
            <Route path="/entregas" element={<Entregas alunos={alunos} onEntrega={registrarEntrega} />} />
            <Route path="/resumo" element={<Resumo />} />
            {/* a URL carrega um DADO: o :id diz de quem e' a ficha */}
            <Route path="/aluno/:id" element={<FichaAluno alunos={alunos} carregando={carregando} />} />
            {/* qualquer outro endereco: a pagina de erro. Fica por ultimo por leitura (e' o "senao") */}
            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
