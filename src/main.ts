import express from "express";
import "dotenv/config";
import "dotenv-expand/config";
import BoardService from "./service/BoardService";
import ColumnService from "./service/ColumnService";
import CardService from "./service/CardService";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "./infra/repository/BoardRepositoryDatabase";
import ColumnRepositoryDatabase from "./infra/repository/ColumnRepositoryDatabase";
import CardRepositoryDatabase from "./infra/repository/CardRepositoryDatabase";

const app = express();

const connection = new PgPromiseConnection();
const boardRepository = new BoardRepositoryDatabase(connection);
const columnRepository = new ColumnRepositoryDatabase(connection);
const cardRepository = new CardRepositoryDatabase(connection);

app.get("/boards", async function (request, response) {
  const boardService = new BoardService(boardRepository);
  const boards = await boardService.getBoards();
  response.json(boards);
});

app.get("/boards/:idBoard/columns", async function (request, response) {
  const columnService = new ColumnService(columnRepository);
  const columns = await columnService.getColumns(
    parseInt(request.params.idBoard)
  );
  response.json(columns);
});

app.get(
  "/boards/:idBoard/columns/:idColumn/cards",
  async function (request, response) {
    const cardService = new CardService(cardRepository);
    const cards = await cardService.getCards(parseInt(request.params.idColumn));
    response.json(cards);
  }
);

app.listen(3000, () => {
  console.log("Server is running...");
});
