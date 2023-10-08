import { useContext } from "react";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from 'react-helmet';

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <>
      <Helmet><title>Login | TRACLE</title></Helmet>
      <Container fluid className="d-flex align-items-center justify-content-center bg-custom3 height">
      <div className="login border border-black rounded shadow-lg p-4">
        <Form onSubmit={handleSubmit}>
          <h2 className="mb-3 text-center fw-bold">
            <img src="https://i.ibb.co/gwHhDPb/11zon-cropped-1.png" width={50} className="rounded-circle shadow" /> L O G I N
          </h2>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button className="btn-primary mt-2 w-100" type="submit">
            Login
          </Button>
          <span className="d-block mt-2 text-center">
            Belum punya akun ? Daftar <span></span>
            <Link to="/register" className="text-decoration-none">
              disini!
            </Link>
          </span>
        </Form>
      </div>
    </Container>
    </>
  );
}

export default FormLogin;
