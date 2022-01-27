import { Form, Button } from "react-bootstrap";
export function Login() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control placeholder="Enter User Name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
