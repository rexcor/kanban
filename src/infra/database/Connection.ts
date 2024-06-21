import "dotenv/config";
import "dotenv-expand/config";

export default interface Connection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}
