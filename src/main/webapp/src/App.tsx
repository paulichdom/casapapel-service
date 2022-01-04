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
import HeistList from "./views/HeistList";
import NewHeist from "./views/NewHeist";
import HeistDetails from "./views/HeistDetails";

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
          </Route>
          <Route path="/heist">
            <Route path="new" element={<NewHeist />} />
            <Route path="all" element={<HeistList />} />
            <Route path=":heistId">
              <Route path="" element={<HeistDetails />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer transition={Flip} theme="light" position="top-center" />
      </Layout>
    </Router>
  );
}

export default App;
