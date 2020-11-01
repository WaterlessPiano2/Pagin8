import * as React from "react";
import { DataGrid, ColDef, ComponentProps } from "@material-ui/data-grid";

import { RowsProp } from "@material-ui/data-grid";
import { response } from "../../interfaces/books";
import Books from "../../middleware/Books";
import { Pagination } from "@material-ui/lab";
import PaginationItem from "@material-ui/lab/PaginationItem";

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

function CustomPagination(props: ComponentProps) {
  const { paginationProps } = props;

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={paginationProps.page}
      count={paginationProps.pageCount}
      renderItem={(props2) => <PaginationItem {...props2} />}
      onChange={(event, value) => paginationProps.setPage(value)}
    />
  );
}

export default function BooksTable() {
  const [rows, setRows] = React.useState<RowsProp>([]);
  const [count, setCount] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState<boolean>(false);

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
          }}
          page={page}
          onPageChange={(p) => setPage(p.page)}
          pagination
          paginationMode="server"
          loading={loading}
          components={{
            pagination: CustomPagination,
          }}
        />
      ) : (
        <p>ERROR</p>
      )}
    </div>
  );
}
