import { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ComplaintContext } from "../context/ComplaintContext";
import { Helmet } from "react-helmet";

function DataPengaduan() {
  const { data, processPengaduan, successPengaduan, deletePengaduan } = useContext(ComplaintContext);

  return (
    <>
      <Helmet>
        <title>Data Pengaduan | TRACLE</title>
      </Helmet>
      <Container fluid className="my-3 height">
        <h1 className="mb-5 text-center">Data Pengaduan</h1>
        <Row xs={12} md={3} className="mx-5">
          {data.map((item) => (
            <Col className="my-2" key={item.pengaduan_id}>
              <Card>
                <Card.Header>
                  <p className="mb-2 text-secondary">{item.pengaduan_kelurahan}</p>
                  <p className="mb-0">{item.pengaduan_alamat}</p>
                </Card.Header>
                <Card.Body>
                  <img src={item.pengaduan_gambar} alt={item.pengaduan_keluhan} className="img-fluid mb-4 rounded" />
                  <p className="my-2 text-secondary"><strong>ID Pengaduan</strong> : {item.pengaduan_id}</p>
                  <p className="my-2"><strong>Nama</strong> : {item.pengaduan_nama}</p>
                  <p className="my-2"><strong>Keluhan</strong> : {item.pengaduan_keluhan}</p>
                  <p className={`my-2 ${item.pengaduan_status === 'pending' ? 'text-danger' : item.pengaduan_status === 'process' ? 'text-primary' : item.pengaduan_status === 'success' ? 'text-success' : ''}`}><strong className="text-dark">Status Penanganan</strong> : {item.pengaduan_status}</p>
                </Card.Body>
                <Card.Footer>
                {item.pengaduan_status === 'pending' ? (
                  <div className="d-flex items-center gap-2">
                    <Button className="btn-primary" onClick={() => processPengaduan(item.id)}>Process Aduan</Button>
                    <Button className="btn-danger" onClick={() => deletePengaduan(item.id, item.pengaduan_gambar)}>Hapus Aduan</Button>
                  </div>
                ) : item.pengaduan_status === 'process' ? (
                  <Button className="btn-success" onClick={() => successPengaduan(item.id)}>Berhasil Ditangani</Button>
                ) : item.pengaduan_status === 'success' ? (
                  <div className="d-flex items-center gap-2">
                    <Button className="btn-secondary" disabled>Pengaduan Telah Berhasil Ditangani</Button>
                    <Button className="btn-danger" onClick={() => deletePengaduan(item.id, item.pengaduan_gambar)}>Hapus Aduan</Button>
                  </div>
                ) : 'Tidak Ada Aksi'}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default DataPengaduan;
