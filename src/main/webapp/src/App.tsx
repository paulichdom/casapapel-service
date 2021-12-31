import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./views/Home";
import MemberList from "./views/MemberList";

import NewMember from "./views/NewMember";
import MemberDetails from "./views/MemberDetails";
import MemberSkills from "./views/MemberSkills";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./views/PageNotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member">
            <Route path="new" element={<NewMember />} />
            <Route path="all" element={<MemberList />} />
            <Route path=":memberId">
              <Route path="" element={<MemberDetails />} />
              <Route path="skills" element={<MemberSkills />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <ToastContainer transition={Flip} theme="light" position="top-center" />
      </Layout>
    </Router>
  );
}

export default App;
