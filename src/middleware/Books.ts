import { response } from "../interfaces/books";

export default class Books {
  static async paginated(pageNumber: number, pageSize: number) {
    const baseURL = "http://nyx.vima.ekt.gr:3000/",
      endPoint = "api/books",
      link = baseURL + endPoint;

    let result: response = { books: [], count: 0 };

    await fetch(link, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        page: pageNumber,
        itemsPerPage: pageSize,
        filters: [],
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.books && response.count) {
          result = response;
        } else {
          throw new Error(response.toString());
        }
      })
      .catch((e) => {
        throw e;
      });
    return result;
  }
}
