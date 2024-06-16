import Column from "../entity/Column";
import pgp from "pg-promise";

export default class ColumnService {
  constructor() {}

  async getColumns(idBoard: number) {
    const connection = pgp()(`${process.env.DATABASE_URL}`);
    const columnsData = await connection.query(
      "select name, has_estimative from kanban.column where id_board = $1",
      [idBoard]
    );
    const columns: Column[] = [];
    for (const columnData of columnsData) {
      columns.push(new Column(columnData.name, columnData.has_estimative));
    }
    await connection.$pool.end();
    return columns;
  }
}
