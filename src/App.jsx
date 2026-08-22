import logo from './assets/logo.svg'
import Home from './pages/Home.jsx'
import { ExpensesProvider } from './context/ExpensesContext.jsx'

function App() {
  return (
    <ExpensesProvider>
      <main>
        <img src={logo} alt="Convert logo" className="logo" />
        <Home />
      </main>
    </ExpensesProvider>
  )
}

export default App
