import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createToDo } from "./api";
import { Todo } from "../types/todo.ts";

export const useCreateToDo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-todo"],
    mutationFn: (newToDo: Todo) => createToDo(newToDo),
    onMutate: async (newToDo: Todo) => {},
    onError: (error) => {},
    onSuccess: (data) => {},
    onSettled: async (data, error) => {
      console.log("settled");
      if (error) {
        console.log("error");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
};
