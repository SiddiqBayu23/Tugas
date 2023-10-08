import { useEffect, useState } from "react";
import { GetPengaduanById, GetPengaduanByUserId } from "../hooks/PengaduanHooks";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { Pending, Process, Success } from "../components/StatusPengaduan";

const PengaduanUser = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [pengaduan, setPengaduan] = useState();

    const getPengaduan = async (id) => {
        const pengaduans = await GetPengaduanByUserId(id);
        setData(pengaduans)
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parseUser = JSON.parse(storedUser);

        if (parseUser) {
            getPengaduan(parseUser.users_id);
        }
    }, []);

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedId(id);
    };

    const getPengaduanById = async (id) => {
        const pengaduan = await GetPengaduanById(id);
        setPengaduan(pengaduan);
    };

    useEffect(() => {
        if (selectedId) {
            getPengaduanById(selectedId);
        }
    }, [selectedId]);

    return (
        <Container className="my-5">
            <h3>Data Pengaduan Anda</h3>
            <hr />
            <Row xs={12} md={3} className="my-4">
                {data.map((item) => (
                    <Col key={item.pengaduan_id} className="my-2">
                        <Card>
                            <Card.Header><strong>Pengaduan ID</strong> : {item.pengaduan_id}</Card.Header>
                            <Card.Body>
                                <h5 className="text-secondary">{item.pengaduan_kelurahan}</h5>
                                <p className="mt-3 mb-2">Lokasi : {item.pengaduan_alamat}</p>
                                <p className="mt-0 mb-2">Keluhan : {item.pengaduan_keluhan}</p>
                                <p className="mt-0 mb-4">Status Pengaduan : {item.pengaduan_status === 'pending' ? 'Belum Direspon' : item.pengaduan_status === 'process' ? 'Dalam Proses' : item.pengaduan_status === 'success' ? 'Berhasil Ditangani' : ''}</p>
                                <Button onClick={() => handleOpenModal(item.pengaduan_id)}>Cek Pengaduan Anda</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                {pengaduan?.map((item) => (
                    <div key={item.pengaduan_id}>
                        <Modal.Header closeButton className="my-0" >
                            <p className="my-0">ID Pengaduan : {item.pengaduan_id}</p>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p className={item.pengaduan_status === 'pending' ? 'text-danger' : item.pengaduan_status === 'process' ? 'text-primary' : item.pengaduan_status === 'success' ? 'text-success' : 'text-danger'}><span className="text-dark">Status Pengaduan</span> - {item.pengaduan_status === 'pending' ? 'Belum Direspon' : item.pengaduan_status === 'process' ? 'Dalam Proses Penanganan' : item.pengaduan_status === 'success' ? 'Berhasil Ditangani' : 'Status Tidak Diketahui'}</p>
                                <hr />
                                <img src={item.pengaduan_gambar} alt={item.pengaduan_keluhan} className="img-fluid mb-4 rounded" />
                                <p className="text-secondary mb-0">{item.pengaduan_kelurahan}</p>
                                <p className="mt-1">{item.pengaduan_alamat}</p>
                                <p>Nama : {item.pengaduan_nama}</p>
                                <p>Keluhan : {item.pengaduan_keluhan}</p>
                            </div>
                            <hr />
                            <div>
                                <strong>Track Penanganan Keluhan</strong>
                                <hr />
                                {item.pengaduan_status === 'pending' ? (
                                    <Pending />
                                ) : item.pengaduan_status === 'process' ? (
                                    <>
                                    <Pending />
                                    <Process />
                                    </>
                                ) : item.pengaduan_status === 'success' ? (
                                    <>
                                    <Pending />
                                    <Process />
                                    <Success />
                                    </>
                                ) : ''}
                            </div>
                        </Modal.Body>
                    </div>
                ))}
            </Modal>
        </Container>
    );
};

export default PengaduanUser;