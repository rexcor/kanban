import express from "express";
import pgp from "pg-promise";
import "dotenv/config";
import "dotenv-expand/config";

const app = express();
const connection = pgp()(`${process.env.DATABASE_URL}`);

app.get("/boards", async function (request, response) {
  const boards = await connection.query("select * from kanban.board", []);
  response.json(boards);
});

app.listen(3000, () => {
  console.log("Server is running...");
});
