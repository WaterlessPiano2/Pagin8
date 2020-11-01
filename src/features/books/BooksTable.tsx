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

  React.useEffect(() => {
    let response: response;
    (async () => {
      response = await Books.paginated(1, 2425);
      setRows(response.books);
      setCount(response.count);
    })();
  }, []);

  return (
    <div style={{ height: 400, width: "50%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[2, 5, 10]}
        rowCount={count}
        checkboxSelection
      />
    </div>
  );
}
