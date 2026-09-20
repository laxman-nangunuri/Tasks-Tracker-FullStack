import axios from "axios";

const BASE_URL = "http://localhost:3000/tasks";

export const getTasks = () =>
  axios.get(BASE_URL);

export const createTask = (task:any) =>
  axios.post(BASE_URL, task);

export const deleteTask = (id:number) =>
  axios.delete(`${BASE_URL}/${id}`);

export const updateTask = (
  id:number,
  task:any
) =>
  axios.put(`${BASE_URL}/${id}`, task);