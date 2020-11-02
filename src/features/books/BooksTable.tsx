import * as React from "react";

import { DataGrid, ColDef } from "@material-ui/data-grid";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectBooks } from "./BookSlice";

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
  const query: URLSearchParams = new URLSearchParams(useLocation().search);
  const pageFromLink = Number(query.get("page")) || 1;
  const pageSizeFromLink = Number(query.get("itemsPerPage")) || 5;
  const dispatch = useDispatch();
  const history = useHistory();
  const books = useSelector(selectBooks).books;
  const count = useSelector(selectBooks).count;
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getBooks(query));
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromLink, pageSizeFromLink]);

  return (
    <div style={{ height: 400, width: "50%", marginTop: 50 }}>
      {books.length ? (
        <DataGrid
          rows={books}
          columns={columns}
          rowsPerPageOptions={[5, 20, 100]}
          rowCount={count}
          pageSize={pageSizeFromLink}
          onPageSizeChange={(p) => 
              history.push(`/books?page=${p.page}&itemsPerPage=${p.pageSize}`)
          }
          page={pageFromLink}
          onPageChange={(p) => 
              history.push(`/books?page=${p.page}&itemsPerPage=${p.pageSize}`)
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
