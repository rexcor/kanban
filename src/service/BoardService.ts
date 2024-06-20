import Board from "../domain/entity/Board";
import pgp from "pg-promise";
import "dotenv/config";
import "dotenv-expand/config";

export default class BoardService {
  constructor() {}

  async getBoards() {
    const connection = pgp()(`${process.env.DATABASE_URL}`);

    const boardsData = await connection.query(
      "select id_board, name from kanban.board",
      []
    );
    const boards: Board[] = [];
    for (const boardData of boardsData) {
      const cardsData = await connection.query(
        "select * from kanban.card join kanban.column using (id_column) where id_board = $1",
        [boardData.id_board]
      );
      let estimative = 0;
      for (const cardData of cardsData) {
        estimative += cardData.estimative;
      }
      const board = new Board(boardData.name);
      board.estimative = estimative;
      boards.push(board);
    }
    await connection.$pool.end();
    return boards;
  }
}
