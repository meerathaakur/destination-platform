import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import AppRoutes from './AppRoutes.jsx';
import Navbar from "./components/common/Navbar.jsx"
import Footer from './components/common/Footer';
import { ThemeProvider } from './components/context/ThemeProvider.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider>
      <Router>
        <div className="transition-bg-color duration-300 dark:bg-gray-900">
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <main className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;