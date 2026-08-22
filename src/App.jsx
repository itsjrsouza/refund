import { RecoilRoot } from 'recoil'
import logo from './assets/logo.svg'
import Home from './pages/Home.jsx'

function App() {
  return (
    <RecoilRoot>
      <main>
        <img src={logo} alt="Convert logo" className="logo" />
        <Home />
      </main>
    </RecoilRoot>
  )
}

export default App
