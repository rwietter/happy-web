import axios from 'axios';

const api = axios.create({
	baseURL: `https://happy-srv.herokuapp.com:8080`,
});

export { api };
