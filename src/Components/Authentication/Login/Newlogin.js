//import ant design elements
import { Alert, Checkbox, Input } from "antd";
import "../CreateAccount/CreateAccount.css";
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





export const Newlogin = () => 
{

  
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);


  const [validated, setValidated] = useState(false);
  const [Loader, setLoader] = useState(false);

  const Navigate=useNavigate();

  const handleSubmit = (event) => 
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
        fetchApi('api/token', 'POST', {'email': Email, 'password': Password},
        false).then((response) => {
 if (!response.ok) {

// console.log("bad request")
console.log("recieved with thanks");
// throw new Error('Unable to login');
window.location.reload();
alert("Email or password doesn't match!!!")
return;
 }
 return response.json();
}).then((data) => {
  
 onLogin(data.token, Email);
console.log("recieved success")
setLoader(false);
Navigate("/Anoni")
});


    }
   


    
  function onLogin(token, email) {
    // setLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    // setEmail(email);
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
  
 
  console.log(Email);
  console.log(Password);
  return (
    <>
    {Loader?<Loading/>:<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row
          className="container registerealContainer"
          style={{
         
            marginLeft: "6rem",
            scale: "55%",
          }}
        >
         <img
                style={{
                 
                
                  width: "22rem",
                  marginTop:"23rem"
                  
                }}
                src="/assets/images/Group.png"
                alt="error"
              />
          <div className="containerLogin createacc" style={{ height: "46rem" }}>
           
            <div className="backgroundBlue" />

            <div>
              <h1 className="heading">Login</h1>
            </div>

            <Col>
              

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
                  <Form.Control.Feedback style={{marginLeft:"-4rem"}}>Looks good!</Form.Control.Feedback>
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
                    style={{ width: "113%" }}
                  >
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

            </Col>

            <div style={{ marginTop: "24rem",marginLeft:"3rem" }}>
             
             

              <Button style={{height: "4rem",
    width: "13rem",fontSize:"1.5rem"}} type="submit">Get Started</Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "8.0rem"
                }}
              >
                <div
                  style={{
                    marginTop: "1.0rem",
                    font: "Prompt",
                    fontWeight: "400"
                  }}
                >
                  Don’t have an account ?
                </div>
                <Link to="/createAccount" style={{ color: '#000AFF', font: 'Prompt', fontWeight: '500' }}>
            Create account.
          </Link>
              </div>
            </div>
          </div>
        </Row>
      </Form>}
      
    </>
  );
};
