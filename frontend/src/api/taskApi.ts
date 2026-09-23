import axios from "axios";


const authHeader ='Basic ' + btoa('admin:nest-password');

const api = axios.create({
  baseURL :"http://localhost:3000/tasks",
  headers: {
    Authorization: authHeader,
  },
});

export const getTasks = () =>
  api.get('/');

export const createTask = (task:any) =>
  api.post('/', task);

export const deleteTask = (id:number) =>
  api.delete(`/${id}`);

export const updateTask = (
  id:number,
  task:any
) =>
  api.put(`/${id}`, task);