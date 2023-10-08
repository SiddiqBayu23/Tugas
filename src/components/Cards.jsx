import { useState } from "react";
import { Card, Button, Modal, ListGroup } from "react-bootstrap";
import PropTypes from 'prop-types';

function Cards({ city, data, process, success, destroy }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filteredData = selectedCity ? data.filter((item) => item.pengaduan_kota === selectedCity) : data;

  const handleDetailsClick = (city) => {
    setSelectedCity(city);
    setShowModal(true);
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header className="text-center fs-5 fw-medium">{city}</Card.Header>
        <Card.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={() => handleDetailsClick(city)}>
            Details
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Data Pengaduan - {selectedCity}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {filteredData.map((item) => (
              <ListGroup.Item key={item.pengaduan_id}>
                <p className="my-3"><strong>Nama : </strong>{item.pengaduan_nama}</p>
                <p className="my-3"><strong>Alamat : </strong>{item.pengaduan_alamat}</p>
                <p className="my-3"><strong>Kota : </strong>{item.pengaduan_kota}</p>
                <p className="my-3"><strong>Keluhan : </strong>{item.pengaduan_keluhan}</p>
                <p className={`my-3 ${item.pengaduan_status === 'pending' ? 'text-danger' : item.pengaduan_status === 'process' ? 'text-primary' : item.pengaduan_status === 'success' ? 'text-success' : ''}`}><strong className="text-dark">Status : </strong>{item.pengaduan_status}</p>
                {item.pengaduan_status === 'pending' ? (
                  <div className="d-flex items-center gap-2">
                    <Button className="btn-primary" onClick={() => process(item.id)}>Process Aduan</Button>
                    <Button className="btn-danger" onClick={() => destroy(item.id)}>Hapus Aduan</Button>
                  </div>
                ) : item.pengaduan_status === 'process' ? (
                  <Button className="btn-success" onClick={() => success(item.id)}>Berhasil Ditangani</Button>
                ) : item.pengaduan_status === 'success' ? (
                  <div className="d-flex items-center gap-2">
                    <Button className="btn-secondary" disabled>Pengaduan Telah Berhasil Ditangani</Button>
                    <Button className="btn-danger" onClick={() => destroy(item.id)}>Hapus Aduan</Button>
                  </div>
                ) : 'Tidak Ada Aksi'}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cards;

Cards.propTypes = {
  city: PropTypes.string,
  data: PropTypes.array,
  process: PropTypes.func,
  success: PropTypes.func,
  destroy: PropTypes.func
};
