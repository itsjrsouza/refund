import { RecoilRoot } from 'recoil'
import styled from 'styled-components'
import logo from './assets/logo.svg'
import Home from './pages/Home.jsx'

const Main = styled.main`
  @media (max-width: 1100px) {
    min-width: 100%;
  }
`

const Logo = styled.img`
  margin: 3rem 0 2rem;
`

function App() {
  return (
    <RecoilRoot>
      <Main>
        <Logo src={logo} alt="Convert logo" />
        <Home />
      </Main>
    </RecoilRoot>
  )
}

export default App
