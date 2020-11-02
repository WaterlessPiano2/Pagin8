import * as React from "react";
import { DataGrid, ColDef, RowsProp } from "@material-ui/data-grid";
import { useHistory, useLocation } from "react-router-dom";

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
  const query = useQuery();
  const pageFromLink = Number(query.get("page")) | 2;
  const pageSizeFromLink = Number(query.get("itemsPerPage")) | 5;
  const [rows, setRows] = React.useState<RowsProp>([]);
  const [count, setCount] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState(pageSizeFromLink);
  const [page, setPage] = React.useState(pageFromLink);
  const [loading, setLoading] = React.useState<boolean>(false);
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  React.useEffect(() => {
    (async () => {
      if (pageFromLink !== page || pageSizeFromLink !== pageSize) {
        setLoading(true);
        setPageSize(pageSizeFromLink);
        setPage(pageFromLink);
        await Books.paginated(pageFromLink, pageSizeFromLink)
          .then((response: response) => {
            setRows(response.books);
            setCount(response.count);
          })
          .catch((err) => {
            setRows([]);
            setCount(0);
          });
      }

      setLoading(false);
    })();
  });

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await Books.paginated(page, pageSize)
        .then((response: response) => {
          setRows(response.books);
          setCount(response.count);
        })
        .catch((err) => {
          setRows([]);
          setCount(0);
        });

      setLoading(false);
    })();
  }, [page, pageSize]);

  return (
    <div style={{ height: 400, width: "50%" }}>
      {rows.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 20, 100]}
          rowCount={count}
          pageSize={pageSize}
          onPageSizeChange={(p) => {
            setPageSize(p.pageSize);
            history.push(`?page=${p.page}&itemsPerPage=${p.pageSize}`);
          }}
          page={page}
          onPageChange={(p) => {
            setPage(p.page);
            history.push(`/books?page=${p.page}&itemsPerPage=${p.pageSize}`);
          }}
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
