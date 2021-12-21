import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Monsters from "./pages/Monsters";

import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
