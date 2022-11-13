import React from "react";
import "./App.css"
import { Login } from "./Components/Authentication/Login/Login";
import { Superlogin } from "./Components/Authentication/Login/Superlogin";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Plumasidenav from "./Other Components/Plumasidenav";
import { Register } from "./Components/Authentication/Register/Register";
import { CreateAccount } from "./Components/Authentication/CreateAccount/CreateAccount";
import { Thankyou } from "./Components/Authentication/ThankYou/Thankyou";
import { Setpassword } from "./Components/Authentication/Setpassword/Setpassword";
import { Forgotpassword } from "./Components/Authentication/Forgotpassword/Forgotpassword";
import { Sentcode } from "./Components/Authentication/Sentcode/Sentcode";
import { TermsConditions } from "./Components/Authentication/TermsConditions/TermsConditions";
import { Mainhome } from "./Components/PagesAfterAuthentication/Mainhome/Mainhome";
import { Faq } from "./Components/PagesAfterAuthentication/Faq/Faq";
import { Information } from "./Components/PagesAfterAuthentication/Information/Information";
import { Myprofile } from "./Components/PagesAfterAuthentication/Myprofile/Myprofile";
import { Editprofile } from "./Components/PagesAfterAuthentication/Edit Profile/Editprofile";
import {Anoni} from "./Components/PagesAfterAuthentication/Anoni/Anoni";
import { Layout } from "antd";
import { Presentation } from "./Components/PagesAfterAuthentication/Presentation/Presentation";
import { Megascreen } from "./Components/PagesAfterAuthentication/Presentation/Megascreen";
import { Reflearn } from "./Components/PagesAfterAuthentication/Presentation/Reflearn";
import { Verify } from "./Components/PagesAfterAuthentication/Verification/Verify";
import { Newlogin } from "./Components/Authentication/Login/Newlogin";
import {Loading} from "./Other Components/Loading/Loading"
const { Footer, Content } = Layout;

//using routes with exact paths, later outlet and auth will be used for better accessibility,

function App() {






  return (<>
    <BrowserRouter>
      <div className="App">
        <Plumasidenav />
        <Routes>
          <Route exact path="/Login" element={<Login />} />
        </Routes>
        <Routes>
          <Route exact path="/Register" element={<Register />} />
        </Routes>
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
          <Route exact path="/TermsConditions" element={<TermsConditions />} />
        </Routes>
        <Routes>
          <Route exact path="/Home" element={<Mainhome />} />
        </Routes>
        {/* <Routes>
          <Route exact path="/Faq" element={<Faq />} />
        </Routes> */}
        <Routes>
          <Route exact path="/Information" element={<Information />} />
        </Routes>
        <Routes>
          <Route exact path="/Myprofile" element={<Myprofile/>} />
        </Routes>
        <Routes>
          <Route exact path="/Editprofile" element={<Editprofile/>} />
        </Routes>
        <Routes>
          <Route exact path="/anoni" element={<Anoni/>} />
        </Routes>
        <Routes>
          <Route exact path="/list" element={<Anoni/>} />
        </Routes>
        <Routes>
          <Route exact path="/faq" element={<Anoni/>} />
        </Routes>
        <Routes>
          <Route exact path="/presentation" element={<Presentation/>} />
        </Routes>
        <Routes>
          <Route exact path="/megascreen" element={<Megascreen/>} />
        </Routes>
        <Routes>
          <Route exact path="/super" element={<Superlogin/>} />
        </Routes>
        <Routes>
          <Route exact path="/ref" element={<Reflearn/>} />
        </Routes>
        <Routes>
          <Route exact path="/verify/:_id" element={<Verify/>} />
        </Routes>
        <Routes>
          <Route exact path="/newlogin" element={<Newlogin/>} />
        </Routes>
        <Routes>
          <Route exact path="/loading" element={<Loading/>} />
        </Routes>
        

<Footer className="footer">
            2022 pluma
          </Footer>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
