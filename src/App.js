import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import Home from './Home';
import Products from './Products';

function App() {
  const toggleMenu = (e) => {
    const menu = document.querySelector('.navbar');
    menu.classList.toggle('open');
  };

  return (
    <div className="App">
      <Router basename="/">
        <nav>
          <button className="menu-button" onClick={(e) => toggleMenu(e)}>☰</button>
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
