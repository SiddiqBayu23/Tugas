import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import logo from "../assets/pengaduan.png";
import { ComplaintContext } from "../context/ComplaintContext";
import { Link } from "react-router-dom";

function Coba() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [userId, setUserId] = useState('');
  const [gambar, setGambar] = useState('');
  const { addData } = useContext(ComplaintContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parseUser = JSON.parse(storedUser);

    if (parseUser) {
      setUserId(parseUser.users_id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    addData(userId, nama, alamat, keluhan, gambar);

    setNama("");
    setAlamat("");
    setKeluhan("");
    setGambar("");
  };

  return (
    <>
      <Container fluid className="d-flex align-items-center justify-content-center bg-white min-vh-100">
        <div className="pengaduan border border-black bg-transparent rounded shadow-lg p-4">
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-3 text-center fw-bold text-uppercase">
              <Image src={logo} width={50} alt="Logo" /> Pengaduan
            </h2>
            <Form.Group controlId="formNama">
              <Form.Label className="fw-medium fs-5 mt-3 mb-1 ">Nama</Form.Label>
              <Form.Control className="border-2 border-black" type="text" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Nama" required />
            </Form.Group>

            <Form.Group controlId="formAlamat">
              <Form.Label className="fw-medium fs-5 mt-3 mb-1 ">Alamat</Form.Label>
              <Form.Control className="border-2 border-black" type="text" name="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Masukkan Alamat" required />
            </Form.Group>

            <Form.Group controlId="formGambar">
              <Form.Label className="fw-medium fs-5 mt-3 mb-1 ">Gambar</Form.Label>
              <Form.Control className="border-2 border-black" type="file" accept="image/*" name="gambar" onChange={(e) => setGambar(e.target.files[0])} placeholder="Masukkan Gambar" required />
            </Form.Group>

            <Form.Group controlId="formKeluhan">
              <Form.Label className="fw-medium fs-5 mt-3 mb-1 ">Keluhan</Form.Label>
              <Form.Control className="border-2 border-black" as="textarea" name="keluhan" value={keluhan} onChange={(e) => setKeluhan(e.target.value)} placeholder="Masukkan Keluhan" rows={4} required />
            </Form.Group>
            <Button className="btn-success my-3 w-100" type="submit">
              KIRIM
            </Button>
            <p className="text-center">Ingin cek data pengaduan anda? cek <Link to={'/pengaduan-user'}>disini</Link></p>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Coba;
