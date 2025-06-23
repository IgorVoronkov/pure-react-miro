import { href, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config";
import { ROUTES } from "@/shared/model/routes";

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery("get", "/boards");
  const createBoardMutation = rqClient.useMutation("post", "/boards");
  const deleteBoardMutation = rqClient.useMutation("delete", "/boards/{boardId}");

  const refetchBoards = () => {
    queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
  };

  return (
    <div>
      <h1>Boards list {CONFIG.API_BASE_URL}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get("name") as string;
          createBoardMutation.mutate({ body: { name } }, { onSettled: refetchBoards });
        }}
      >
        <input name="name" placeholder="Board name" />
        <button type="submit">Add Board</button>
      </form>

      {boardsQuery.data?.map((board) => (
        <div key={board.id}>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>{board.name}</Link>
          <button
            onClick={() => {
              deleteBoardMutation.mutate(
                { params: { path: { boardId: board.id } } },
                { onSettled: refetchBoards },
              );
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export const Component = BoardsListPage;
