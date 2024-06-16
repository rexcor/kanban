import express from "express";
import "dotenv/config";
import "dotenv-expand/config";
import BoardService from "./service/BoardService";
import ColumnService from "./service/ColumnService";
import CardService from "./service/CardService";

const app = express();

app.get("/boards", async function (request, response) {
  const boardService = new BoardService();
  const boards = await boardService.getBoards();
  response.json(boards);
});

app.get("/boards/:idBoard/columns", async function (request, response) {
  const columnService = new ColumnService();
  const columns = await columnService.getColumns(
    parseInt(request.params.idBoard)
  );
  response.json(columns);
});

app.get(
  "/boards/:idBoard/columns/:idColumn/cards",
  async function (request, response) {
    const cardService = new CardService();
    const cards = await cardService.getCards(parseInt(request.params.idColumn));
    response.json(cards);
  }
);

app.listen(3000, () => {
  console.log("Server is running...");
});
