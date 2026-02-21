import axios from "axios";

const URL = "http://localhost:8081/consultorio/api/v1.0/pacientes";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const listarPacientes = async () => {
  const data = await axios.get(`${URL}`, { headers: getAuthHeader() }).then((r) => r.data);
  return data;
};

const obtenerPacientePorUrl = async (url) => {
  const data = await axios.get(url, { headers: getAuthHeader() }).then((r) => r.data);
  return data;
};

const crearPaciente = async (body) => {
  const data = await axios
    .post(`${URL}`, body, { headers: getAuthHeader() })
    .then((r) => r.data);
  return data;
};

export const fachadaListarPacientes = async () => {
  return await listarPacientes();
};

export const fachadaObtenerPacientePorUrl = async (url) => {
  return await obtenerPacientePorUrl(url);
};

export const fachadaCrearPaciente = async (body) => {
  return await crearPaciente(body);
};
