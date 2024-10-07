import { useQuery, useQueries } from "@tanstack/react-query";
import { getToDosIds, getToDo } from "./api";

export const useToDosIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getToDosIds,
  });
};

export const useToDos = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", id],
        queryFn: () => getToDo(id!),
      };
    }),
  });
};
