import { response } from "../interfaces/books";

export default class utils {
  static rowsToColumns(rows: any): response {
    let result: response = { books: [], count: 0 };
    // Some logic that will genarate the table columns from the books array of objects
    return result;
  }
}
