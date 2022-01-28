import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { constructAPIURL } from "../../apiUrl";
import "./Login.css";

export function Login() {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const login = (e) => {
    e.preventDefault();
    fetch(constructAPIURL("/login"), {
      method: "POST",
      body: JSON.stringify({ userName }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: userName,
            token: result.token,
          })
        );
        navigate("../countries", { replace: true });
      });
  };

  return (
    <Form onSubmit={login}>
      <Form.Group className="login-form" controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          className="username-text-input"
          value={userName}
          placeholder="Enter User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="login">
        Login
      </Button>
    </Form>
  );
}
