import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { SIGNUP } from "../../graphQL/queries";
import "./Signup.css";

export function Signup() {
  const client = useApolloClient();
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.mutate({
        mutation: SIGNUP,
        variables: { userName },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          userName: data.signup.userName,
          token: data.signup.token,
        })
      );
      navigate("../countries", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={signup}>
      <Form.Group className="signup-form" controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          className="username-text-input"
          value={userName}
          placeholder="Enter User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="signup">
        Signup
      </Button>
    </Form>
  );
}
