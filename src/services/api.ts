import axios from "axios";
import { Todo } from "../types/todo.ts";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getToDosIds = async () => {
  return (await axiosInstance.get<Todo[]>("/todos")).data.map(
    (todo) => todo.id
  );
};

export const getToDo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`/todos/${id}`)).data;
};

export const createToDo = async (newToDo: Todo) => {
  console.log(newToDo);
  return (await axiosInstance.post<Todo>("/todos", newToDo)).data;
};
