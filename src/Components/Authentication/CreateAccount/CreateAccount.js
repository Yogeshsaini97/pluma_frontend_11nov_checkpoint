//import ant design elements
import { Checkbox, Input } from "antd";
import "./CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { fetchApi } from "../../PagesAfterAuthentication/Presentation/utils";
import { Loading } from "../../../Other Components/Loading/Loading";





export const CreateAccount = () => 
{

  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [Loader, setLoader] = useState(false);

  // const [bool, setbool] = useState(false);
  // const [emptyName, setemptyName] = useState(false);
  // const [emptyemail, setemptyemail] = useState(false);
  // const [emptypassword, setemptypassword] = useState(false);
  // const [checkbox, setcheckbox] = useState(false);

  const [validated, setValidated] = useState(false);

  const Navigate=useNavigate();

  const handleSubmit =  (event) => 
  {

    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false)
     {
      event.preventDefault();
      event.stopPropagation();
      console.log("inside if handlesubmit")
      
    }
    else{
      setLoader(true);
      // console.log("outer else handlesubmit")
       fetchApi('/api/user', 'POST', {'email': Email, 'password': Password}, false).then(async (response) => {
         setLoader(false)
      if (!response.ok) 
      {
        // throw new Error ('Unable to register');
      console.log("bad request");
        window.location.reload();
      alert("Email already exists!!! please try with new email")
      }
      else
      {
        console.log("good request");
        Navigate("/Thankyou");
        localStorage.setItem('FullName', FullName);
  
      }
   
   
      // setRegistered(true);
    });


    // if (false) 
    // {
    //   // throw new Error ('Unable to register');
    // console.log("bad request");
    // }
    // else{
    //   console.log("good request")
    //   Navigate("/Thankyou");
    // }
    
 
 


    }
   


    

    // fetchApi('https://app.pluma.in/api/user', 'POST', {'email': Email, 'password': Password}, false).then((response) => {
    //   if (!response.ok) 
    //   {
    //     // throw new Error ('Unable to register');
    //   console.log("bad request")
    //   }
   
    //   console.log("good request")
    //   Navigate("/Thankyou");

    //   // setRegistered(true);
    // });


    // if (true) 
    // {
    //   // throw new Error ('Unable to register');
    // console.log("bad request")
    // }
 
    // console.log("good request")
    // Navigate("/Thankyou");

    // setRegistered(true);
  

    setValidated(true);
  };

  // //for navigation inside funtipn
  // const Navigate = useNavigate();

  // //function to handle create account onclick

  // const loginfunc = (e) => {
  //   e.preventDefault();
  //   let namearray = Name.split("");
  //   let emailarray = Email.split("");
  //   let passarray = password.split("");

  //   if (emailarray.length === 0) {
  //     setemptyemail(true);
  //   }

  //   if (passarray.length === 0) {
  //     setemptypassword(true);
  //   }

  //   if (namearray.length === 0) {
  //     setemptyName(true);
  //   }

  //   // if(checkbox===false)
  //   // {

  //   //   return;
  //   // }

  //   if (emailarray.length > 0 && passarray.length > 0 && namearray.length > 0) {
  //     if (
  //       emailarray.includes("@") === false ||
  //       emailarray.includes(".") === false
  //     ) {
  //       setbool(true);
  //       return;
  //     } else {
  //       setbool(false);
  //       Navigate("/home");

  //       return;
  //     }
  //   }

  //   return;
  // };
  
  console.log(FullName);
  console.log(Email);
  console.log(Password);
  return (
    <>
    {Loader?<Loading/>:

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row
          className="container registerealContainer"
          style={{
            marginTop: "4rem",
            marginLeft: "10rem",
            scale: "55%",
          }}
        >
          <div className="containerLogin createacc" style={{ height: "56rem" }}>
            <img
              style={{
                position: "absolute",
                zIndex: "4",
                width: "17.0rem",
                right: "-16.0rem",
                top: "5.0rem",
              }}
              src="/assets/images/GirlRegistr.png"
              alt="error"
            />
            <div className="backgroundBlue" />

            <div>
              <h1 className="heading">Register</h1>
            </div>

            <Col>
              <Form.Group
                as={Col}
                className="formgroupstart"
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label style={{ marginRight: "3rem" }}>
                  Full name
                </Form.Label>
                <Form.Control
                  style={{ marginLeft: "0.9rem" }}
                  required
                  type="text"
                  placeholder="Full Name"
                  value={FullName}
                  onChange={(e)=>{setFullName(e.target.value)}}
                  prefix={<UserOutlined />}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Col>
                <Form.Group
                  as={Col}
                  className="formgroupstart"
                  md="6"
                  controlId="validationCustom03"
                >
                  <Form.Label style={{ marginRight: "33rem" }}>
                    Email
                  </Form.Label>
                  <Form.Control
                   type="Email"
                   placeholder="Email" 
                   value={Email}
                   onChange={(e)=>{setEmail(e.target.value)}}
                   required />
                  <Form.Control.Feedback style={{marginLeft:"-3.5rem"}}>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  as={Col}
                  className="formgroupstart"
                  md="6"
                  controlId="validationCustom03"
                >
                  <Form.Label style={{ marginRight: "33rem" }}>
                    password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ width: "117%" }}
                  >
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col
                className="policyContainer"
                style={{ position: "relative", top: "-9%" }}
              >
                {/* <Checkbox
                 onClick={(e) => {
                   e.target.checked ? setcheckbox(false) : setcheckbox(true);
                 }}
                 style={{ padding: "0.5rem", fontFamily: "Poppins" }}
               />
               <span>I agree to the </span>
               <Link to="/TermsConditions" style={{ color: "#000AFF" }}>
                 Terms and conditions
               </Link> */}
                {/* {checkbox &&  <div style={{color:"red",position:"absolute",top:"63%",marginLeft:"5%"}}>Please accept the Terms&conditions!</div>} */}

                <Form.Group
                  className="mb-3 formgroupstart"
                  style={{ marginTop: "5rem" }}
                >
                  <Form.Check
                    required
                    label="Agree to Terms & Conditions"
                    
                    feedbackType="invalid"
                  />
                </Form.Group>
              </Col>
            </Col>

            <div style={{ marginTop: "10%",marginLeft:"2rem" }}>
              {/* <Button
               type="primary"
               onClick={loginfunc}
               className="acceptButton"
             >
               Get Started
             </Button> */}
              <div className="my-5">
                {" "}
                <Link
                  style={{ color: "#000AFF", paddingTop: "5rem" }}
                  to="/TermsConditions"
                >
                  Terms and conditions
                </Link>
              </div>

              <Button style={{height: "4rem",
    width: "13rem",fontSize:"1.5rem"}} type="submit">Get Started</Button>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginBottom: ".0rem",
                }}
              >
                <div className="haveAccount my-2">
                  <span>Already have a account ? </span>
                  <Link style={{ color: "#000AFF" }} to="/newLogin">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Form>
      }
      
    </>
  );
};
