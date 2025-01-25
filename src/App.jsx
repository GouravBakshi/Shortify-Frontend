import './App.css'
import { getApps } from './utils/helper'
import { BrowserRouter as Router} from 'react-router-dom'

function App() {
  const CurrentApp = getApps();
  return (
    <>
      <Router>
        <CurrentApp />
      </Router>
    </>
  )
}

export default App
