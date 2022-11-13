//import ant design elements
import "../CreateAccount/CreateAccount.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { fetchApi } from "../../PagesAfterAuthentication/FetchApi/utils";
import { Loading } from "../../../Other Components/Loading/Loading";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");


  const [validated, setValidated] = useState(false);
  const [Loader, setLoader] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("inside if handlesubmit");
    } else {
      setLoader(true);
      fetchApi("api/token", "POST", { email: Email, password: Password }, false)
        .then((response) => {
          if (!response.ok) {
            window.location.reload();
            alert("Email or password doesn't match!!!");
            return;
          }
          return response.json();
        })
        .then((data) => {
          onLogin(data.token, Email);
          console.log("recieved success");
          setLoader(false);
          Navigate("/home");
        });
    }

    function onLogin(token, email) {
     
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
     
    }


    setValidated(true);
  };

  


  return (
    <>
      {Loader ? (
        <Loading />
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row
            className="container registerealContainer"
            style={{
              marginLeft: "6rem",
              scale: "55%"
            }}
          >
            <img
              style={{
                width: "22rem",
                marginTop: "23rem"
              }}
              src="/assets/images/Group.png"
              alt="error"
            />
            <div
              className="containerLogin createacc"
              style={{ height: "46rem" }}
            >
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    <Form.Control.Feedback style={{ marginLeft: "-4rem" }}>
                      Looks good!
                    </Form.Control.Feedback>
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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

              <div style={{ marginTop: "24rem", marginLeft: "3rem" }}>
                <Button
                  style={{ height: "4rem", width: "13rem", fontSize: "1.5rem" }}
                  type="submit"
                >
                  Get Started
                </Button>
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
                  <Link
                    to="/createAccount"
                    style={{
                      color: "#000AFF",
                      font: "Prompt",
                      fontWeight: "500"
                    }}
                  >
                    Create account.
                  </Link>
                </div>
              </div>
            </div>
          </Row>
        </Form>
      )}
    </>
  );
};
