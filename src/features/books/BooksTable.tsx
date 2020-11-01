import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { chageByValue, selectPageSize } from "./pageSizeSlice";
import { DataGrid, ColDef, RowData } from "@material-ui/data-grid";

import { response } from "../../interfaces/books";
import Books from "../../middleware/Books";

function SelectPageSize(): number {
  return useSelector(selectPageSize);
}
function DispatchPageSize(): any {
  return useDispatch();
}

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

// const dispatch = useDispatch();

type TableState = {
  rows: RowData[];
  count: number;
  pageSize: number;
  page: number;
  loading: boolean;
};

export default class BooksTable extends React.Component<{}, TableState> {
  constructor(props: {}) {
    super(props);
    this.state = { rows: [], count: 1, pageSize: 5, page: 1, loading: true };
  }

  componentDidMount() {
    this.getBooks();
  }

  componentDidUpdate(_prevProps: {}, prevState: TableState, _snapshot: any) {
    if (
      this.state.pageSize !== prevState.pageSize ||
      this.state.page !== prevState.page
    ) {
      this.getBooks();
    }
  }

  async getBooks() {
    this.setState({ loading: true });

    await Books.paginated(this.state.page, this.state.pageSize)
      .then((response: response) => {
        this.setState({ rows: response.books, count: response.count });
      })
      .catch((err) => {
        this.setState({ rows: [], count: 0 });
      });

    this.setState({ loading: false });
  }
  render() {
    const selectPageSize = DispatchPageSize();
    const GetPageSize = SelectPageSize();
    return (
      <div style={{ height: 400, width: "50%" }}>
        {this.state.rows.length ? (
          <DataGrid
            rows={this.state.rows}
            columns={columns}
            rowsPerPageOptions={[5, 20, 100]}
            rowCount={this.state.count}
            pageSize={GetPageSize}
            onPageSizeChange={(p) => selectPageSize(chageByValue(p.pageSize))}
            page={this.state.page}
            onPageChange={(p) => {
              this.setState({ page: p.page });
            }}
            pagination
            paginationMode="server"
            loading={this.state.loading}
          />
        ) : (
          <p>ERROR</p>
        )}
      </div>
    );
  }
}
