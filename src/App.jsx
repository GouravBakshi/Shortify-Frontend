import './App.css'
import AppRouter from './AppRouter';
import { getApps } from './utils/helper'
import { BrowserRouter as Router} from 'react-router-dom'

function App() {
  const CurrentApp = getApps();
  return (
    <>
      <Router>
        {/* <CurrentApp /> */}
        <AppRouter />
      </Router>
    </>
  )
}

export default App
