//import ant design elements
import "./CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { fetchApi } from "../../PagesAfterAuthentication/FetchApi/utils";
import { Loading } from "../../../Other Components/Loading/Loading";

export const CreateAccount = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loader, setLoader] = useState(false);

  const [validated, setValidated] = useState(false);

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
      fetchApi(
        "/api/user",
        "POST",
        { email: Email, password: Password },
        false
      ).then(async (response) => {
        setLoader(false);
        if (!response.ok) {
          console.log("bad request");
          window.location.reload();
          alert("Email already exists!!! please try with new email");
        } else {
          console.log("good request");
          Navigate("/Thankyou");
          localStorage.setItem("FullName", FullName);
        }
      });
    }

    setValidated(true);
  };

  console.log(FullName);
  console.log(Email);
  console.log(Password);
  return (
    <>
      {Loader ? (
        <Loading />
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row
            className="container registerealContainer"
            style={{
              marginTop: "4rem",
              marginLeft: "10rem",
              scale: "55%"
            }}
          >
            <div
              className="containerLogin createacc"
              style={{ height: "56rem" }}
            >
              <img
                style={{
                  position: "absolute",
                  zIndex: "4",
                  width: "17.0rem",
                  right: "-16.0rem",
                  top: "5.0rem"
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
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    <Form.Control.Feedback style={{ marginLeft: "-3.5rem" }}>
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

              <div style={{ marginTop: "10%", marginLeft: "2rem" }}>
             
                <div className="my-5">
                  {" "}
                  <Link
                    style={{ color: "#000AFF", paddingTop: "5rem" }}
                    to="/TermsConditions"
                  >
                    Terms and conditions
                  </Link>
                </div>

                <Button
                  style={{ height: "4rem", width: "13rem", fontSize: "1.5rem" }}
                  type="submit"
                >
                  Get Started
                </Button>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginBottom: ".0rem"
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
      )}
    </>
  );
};
