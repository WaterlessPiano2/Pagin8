export default class Books {
  static async paginated(pageNumber: number, pageSize: number) {
    const baseURL = "http://nyx.vima.ekt.gr:3000/",
      endPoint = "api/books",
      params = `?page=${pageNumber}&itemsPerPage=${pageSize}`,
      link = baseURL + endPoint + params;

    let result = {};

    await fetch(link, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.books && response.count) {
          result = response;
          // Seeing the results in the console before the UI is implemented
          console.table(`Total number of all books: ${response.count}`);
          console.table("Sub set of books");
          console.table(response.books);
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
