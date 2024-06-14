import express from "express";
import pgp from "pg-promise";
import "dotenv/config";
import "dotenv-expand/config";
import Column from "./entity/Column";
import Card from "./entity/Card";
import BoardService from "./service/BoardService";

const app = express();
const connection = pgp()(`${process.env.DATABASE_URL}`);

app.get("/boards", async function (request, response) {
  const boardService = new BoardService();
  const boards = await boardService.getBoards();
  response.json(boards);
});

app.get("/boards/:idBoard/columns", async function (request, response) {
  const columnsData = await connection.query(
    "select name, has_estimative from kanban.column where id_board = $1",
    [request.params.idBoard]
  );
  const columns: Column[] = [];
  for (const columnData of columnsData) {
    columns.push(new Column(columnData.name, columnData.has_estimative));
  }
  response.json(columns);
});

app.get(
  "/boards/:idBoard/columns/:idColumn/cards",
  async function (request, response) {
    const cardsData = await connection.query(
      "select title, estimative from kanban.card where id_column = $1",
      [request.params.idColumn]
    );
    const cards: Card[] = [];
    for (const cardData of cardsData) {
      cards.push(new Card(cardData.title, cardData.estimative));
    }
    response.json(cards);
  }
);

app.listen(3000, () => {
  console.log("Server is running...");
});
