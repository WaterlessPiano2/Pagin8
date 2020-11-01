import * as React from "react";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import { RowsProp } from "@material-ui/data-grid";
import { response } from "../../interfaces/books";
import Books from "../../middleware/Books";

const columns: ColDef[] = [
  { field: "book_author", headerName: "Author", width: 100 },
  { field: "book_pages", headerName: "Pages", width: 100 },
  {
    field: "book_publication_city",
    headerName: "Publication City",
    width: 150,
  },
  {
    field: "book_publication_country",
    headerName: "Publication Country",
    width: 170,
  },
  {
    field: "book_publication_year",
    headerName: "Publication Year",
    width: 180,
  },
  { field: "book_title", headerName: "Title", width: 120 },
  { field: "id", hide: true },
];

export default function BooksTable() {
  const [rows, setRows] = React.useState<RowsProp>([]);
  const [count, setCount] = React.useState<number>(9);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    let response: response;
    (async () => {
      // console.log("page");
      // console.log(page);
      // console.log("pageSize");
      // console.log(pageSize);

      response = await Books.paginated(page, pageSize);
      // console.table(`Total number of all books: ${response.count}`);
      // console.table("Sub set of books");
      // console.table(response.books);
      setRows(response.books);
      setCount(response.count);
    })();
  }, [page, pageSize]);

  return (
    <div style={{ height: 400, width: "50%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[2, 5, 10]}
        rowCount={count}
        pageSize={pageSize}
        onPageSizeChange={(p) => {
          console.log(p);
          setPageSize(p.pageSize);
        }}
        page={page}
        onPageChange={(p) => setPage(p.page)}
        pagination
        paginationMode="server"
      />
    </div>
  );
}
