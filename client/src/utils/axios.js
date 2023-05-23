import axios from 'axios';

export const local = axios.create({
  baseURL: 'http://localhost:3002/api',
});

// export default instance
