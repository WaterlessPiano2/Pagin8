import * as React from "react";

import { DataGrid, ColDef, RowData, RowsProp } from "@material-ui/data-grid";

import { response } from "../../interfaces/books";
import Books from "../../middleware/Books";
import { useHistory, useLocation } from "react-router-dom";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BooksTable() {
  const query = useQuery();

  const pageFromLink = Number(query.get("page")) || 1;
  const pageSizeFromLink = Number(query.get("itemsPerPage")) || 5;

  const [rows, setRows] = React.useState<RowsProp>([]);
  const [count, setCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const history = useHistory();

  async function updateTable() {
    setLoading(true);
    await Books.paginated(pageFromLink, pageSizeFromLink)
      .then((response: response) => {
        setRows(response.books);
        setCount(response.count);
      })
      .catch((err) => {
        setRows([]);
        setCount(0);
      });

    setLoading(false);
    setLoading(false);
  }

  React.useEffect(() => {
    (async () => {
      await updateTable();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromLink, pageSizeFromLink]);

  return (
    <div style={{ height: 400, width: "50%" }}>
      {rows.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 20, 100]}
          rowCount={count}
          pageSize={pageSizeFromLink}
          onPageSizeChange={(p) =>
            history.push(
              `/books?page=${pageFromLink}&itemsPerPage=${p.pageSize}`
            )
          }
          page={pageFromLink}
          onPageChange={(p) =>
            history.push(
              `/books?page=${p.page}&itemsPerPage=${pageSizeFromLink}`
            )
          }
          pagination
          paginationMode="server"
          loading={loading}
        />
      ) : (
        <p>ERROR</p>
      )}
    </div>
  );
}
