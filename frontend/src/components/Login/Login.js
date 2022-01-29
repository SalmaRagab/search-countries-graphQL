import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { LOGIN } from "../../graphQL/queries";
import "./Login.css";

export function Login() {
  const client = useApolloClient();
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.query({
        query: LOGIN,
        variables: { userName },
      });
      console.log(data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userName: data.login.userName,
          token: data.login.token,
        })
      );
      navigate("../countries", { replace: true });
    } catch (error) {
      console.error(error);
    }
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
