import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import Navbar from "./components/Navbar.jsx"
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';
// import './styles/global.scss';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Header /> */}
        <Navbar/>
        <main className="main-content">
          <AppRoutes />
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;