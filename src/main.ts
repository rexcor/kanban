import "dotenv/config";
import "dotenv-expand/config";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import BoardController from "./infra/controller/BoardController";

const connection = new PgPromiseConnection();
const http = new ExpressAdapter();
new BoardController(http, connection);

http.listen(3000);
