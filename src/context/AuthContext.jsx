import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";
import { GetUserByEmail, PostUser } from "../hooks/AuthHooks";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [checkingUser, setCheckingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateTo = location.state?.navigateTo ?? "/";

  const login = async (email, password) => {
    try {
      const user = await GetUserByEmail(email);
      if (user[0] === undefined || user[0] === null) {
          alert('Username atau Password anda salah!');
      } else if (user[0].users_password !== password) {
          alert('Username atau Password anda salah!');
      } else {
          alert('Login berhasil');
          localStorage.setItem('user', JSON.stringify(user[0]));
          setCurrentUser(user[0]);
          navigate(navigateTo);
      }
    } catch (error) {
        console.log(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password) => {
    try {
      const user = await GetUserByEmail(email);
      if (user[0]) {
        alert("Email telah digunakan");
      } else {
        await PostUser(email, password);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isLoggedIn = Boolean(currentUser);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setCheckingUser(false);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, isLoggedIn, register, login, logout }}>{!checkingUser && children}</AuthContext.Provider>
    </>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
