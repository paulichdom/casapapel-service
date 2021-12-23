import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./views/Home";
import MemberList from "./views/MemberList";

import "./App.css";
import NewMember from "./views/NewMember";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/member/new" element={<NewMember />} />
          <Route path="/member/all" element={<MemberList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
