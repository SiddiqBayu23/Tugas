import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import { DeletePengaduan, GetPengaduan, PatchPengaduanProcess, PatchPengaduanSuccess, PostPengaduan } from "../hooks/PengaduanHooks";

export const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(false);

  const getData = async () => {
    try {
      const pengaduans = await GetPengaduan();
      setData(pengaduans);
    } catch (error) {
      console.error(error);
    }
  };

  const addData = async (user, nama, alamat, keluhan, gambar) => {
    await PostPengaduan(user, nama, alamat, keluhan, gambar);
    setUpdateData(true);
  };

  const processPengaduan = async (id) => {
    await PatchPengaduanProcess(id);
    setUpdateData(true);
  };

  const successPengaduan = async (id) => {
    await PatchPengaduanSuccess(id);
    setUpdateData(true);
  };

  const deletePengaduan = async (id, gambar) => {
    await DeletePengaduan(id, gambar);
    setUpdateData(true);
  };

  useEffect(() => {
    getData();
  }, [updateData]);

  return (
    <>
      <ComplaintContext.Provider value={{ data, addData, processPengaduan, successPengaduan, deletePengaduan }}>{children}</ComplaintContext.Provider>
    </>
  );
};

ComplaintProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
