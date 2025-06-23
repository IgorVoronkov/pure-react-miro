import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const boards: Array<ApiSchemas["Board"]> = [
  {
    id: "board-1",
    name: "Marketing Campaign",
  },
  {
    id: "board-2",
    name: "Product Roadmap",
  },
];

export const handlers = [
  http.get("/boards", () => {
    return HttpResponse.json(boards);
  }),
  http.post("/boards", async ({ request }) => {
    const { name } = await request.json();
    const newBoard: ApiSchemas["Board"] = {
      id: crypto.randomUUID(),
      name,
    };
    boards.push(newBoard);
    return HttpResponse.json(newBoard, { status: 201 });
  }),
  http.delete("/boards/{boardId}", ({ params }) => {
    const { boardId } = params;
    const index = boards.findIndex((board) => board.id === boardId);
    if (index === -1) {
      return HttpResponse.json(
        { message: "Board not found", code: "BOARD_NOT_FOUND" },
        { status: 404 }
      );
    }
    boards.splice(index, 1);
    return HttpResponse.json(
      {
        message: "Board deleted successfully",
        code: "BOARD_DELETED",
      },
      { status: 204 }
    );
  }),
];
