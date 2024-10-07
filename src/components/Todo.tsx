import { useCreateToDo } from "../services/mutations";
import { useToDosIds, useToDos } from "../services/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

export const ToDoComp = () => {
  const toDosIdsQuery = useToDosIds();
  const toDosQuery = useToDos(toDosIdsQuery.data);

  const createToDoMutation = useCreateToDo();

  const handleCreateToDoSubmit: SubmitHandler<Todo> = async (newToDo) => {
    await createToDoMutation.mutateAsync(newToDo);
  };

  const { register, handleSubmit } = useForm<Todo>();

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateToDoSubmit)}>
        <input type="text" placeholder="new todo" {...register("title")} />
        <input
          type="text"
          placeholder="description"
          {...register("description")}
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {toDosQuery.map(({ data }) => {
          if (!data) return <></>;
          return (
            <li key={`${data?.id}${data?.title}`}>
              <div>Id: {data?.id}</div>
              <p>{data?.title}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
