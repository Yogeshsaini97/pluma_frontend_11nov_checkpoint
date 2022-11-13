import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Plumasidenav from "./Other Components/Plumasidenav";
import { CreateAccount } from "./Components/Authentication/CreateAccount/CreateAccount";
import { Thankyou } from "./Components/Authentication/ThankYou/Thankyou";
import { Setpassword } from "./Components/Authentication/Setpassword/Setpassword";
import { Forgotpassword } from "./Components/Authentication/Forgotpassword/Forgotpassword";
import { Sentcode } from "./Components/Authentication/Sentcode/Sentcode";
import { TermsConditions } from "./Components/Authentication/TermsConditions/TermsConditions";
import { Home } from "./Components/PagesAfterAuthentication/Anoni/Home";
import { Layout } from "antd";
import { Verify } from "./Components/PagesAfterAuthentication/Verification/Verify";
import { Login } from "./Components/Authentication/Login/Login";
import { Loading } from "./Other Components/Loading/Loading";
const { Footer, Content } = Layout;

//using routes with exact paths, later outlet and auth will be used for better accessibility,

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Plumasidenav />

          <Routes>
            <Route exact path="/CreateAccount" element={<CreateAccount />} />
          </Routes>
          <Routes>
            <Route exact path="/thankyou" element={<Thankyou />} />
          </Routes>
          <Routes>
            <Route exact path="/Setpassword" element={<Setpassword />} />
          </Routes>
          <Routes>
            <Route exact path="/Forgotpassword" element={<Forgotpassword />} />
          </Routes>
          <Routes>
            <Route exact path="/Sentcode" element={<Sentcode />} />
          </Routes>
          <Routes>
            <Route
              exact
              path="/TermsConditions"
              element={<TermsConditions />}
            />
          </Routes>

          <Routes>
            <Route exact path="/home" element={<Home />} />
          </Routes>
          <Routes>
            <Route exact path="/list" element={<Home />} />
          </Routes>
          <Routes>
            <Route exact path="/faq" element={<Home />} />
          </Routes>

          <Routes>
            <Route exact path="/verify/:_id" element={<Verify />} />
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route exact path="/loading" element={<Loading />} />
          </Routes>

          <Footer className="footer">2022 pluma</Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
