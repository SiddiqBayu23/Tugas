export const Pending = () => (
    <div className="px-3 py-3 bg-danger bg-opacity-25 rounded my-2">
        <strong className="my-0 text-danger ">Belum Direspon</strong>
        <p className="my-0 text-xs mt-1">Pengaduan anda sedang menunggu respon.</p>
    </div>
);

export const Process = () => (
    <div className="px-3 py-3 bg-primary bg-opacity-25 rounded my-2">
        <strong className="my-0 text-primary ">Dalam Proses</strong>
        <p className="my-0 text-xs mt-1">Pengaduan anda sedang dalam proses penanganan.</p>
    </div>
);

export const Success = () => (
    <div className="px-3 py-3 bg-success bg-opacity-25 rounded my-2">
        <strong className="my-0 text-success ">Berhasil Ditangani</strong>
        <p className="my-0 text-xs mt-1">Selamat, pengaduan anda berhasil ditangani.</p>
    </div>
);