import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      const response = await axios.get("https://6481e3a729fa1c5c503241f5.mockapi.io/Banner");
      setBanner(response.data);
    };

    getBanner();
  }, []);

  return (
    <>
      <Context.Provider value={{ banner }}>{children}</Context.Provider>
    </>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;