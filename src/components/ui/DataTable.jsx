import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export const STATUS_COLORS = {
  placed: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  preparing: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  delivered: "bg-green-50 text-green-700 ring-1 ring-green-200",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
  active: "bg-green-50 text-green-700 ring-1 ring-green-200",
  inactive: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
  pending: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
};

export const DEFAULT_COLOR = "bg-gray-100 text-gray-600 ring-1 ring-gray-200";

export const getStatusColor = (val) =>
  STATUS_COLORS[val?.toLowerCase?.()] ?? DEFAULT_COLOR;

/* Status Dropdown */
export const StatusDropdown = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer select-none hover:opacity-80 transition-opacity ${getStatusColor(
          value,
        )}`}
      >
        {value?.charAt(0).toUpperCase() + value?.slice(1)}

        <svg
          className="w-3 h-3 opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute left-0 top-full mt-1.5 z-[9999] bg-white border border-gray-200 rounded-xl shadow-lg min-w-[150px]">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-gray-50 transition-colors ${
                  opt === value ? "font-semibold" : "font-normal"
                }`}
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    opt,
                  )}`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </span>

                {opt === value && (
                  <svg
                    className="ml-auto h-3.5 w-3.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* Align helper */
const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/* Main DataTable */
const DataTable = ({
  title,
  columns,
  data = [],
  searchKey,
  searchPlaceholder = "Search...",
  toolbarRight,
}) => {
  const [search, setSearch] = useState("");

  /* Pagination */
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  /* Search Filter */
  const filteredData = useMemo(() => {
    if (!searchKey || !search.trim()) return data;

    return data.filter((row) =>
      String(row[searchKey] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [data, search, searchKey]);

  /* Pagination Data */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-5 rounded-xl min-h-screen shadow-sm flex flex-col">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <hr className="border-gray-200 mt-3" />

      {/* Toolbar */}
      <div className="flex items-center justify-between py-5 gap-4 flex-wrap">
        {searchKey && (
          <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-72 h-11">
            <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />

            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        )}

        {toolbarRight && (
          <div className="flex items-center gap-3 flex-wrap">
            {toolbarRight}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full border border-gray-200 rounded-xl overflow-x-auto flex-1">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#E8D5C4]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const align = header.column.columnDef.align ?? "left";
                  const width = header.column.columnDef.width;

                  return (
                    <th
                      key={header.id}
                      style={width ? { width } : {}}
                      className={`
                        px-5 py-4
                        text-sm font-semibold text-gray-800
                        whitespace-nowrap
                        align-middle
                        ${alignClass[align]}
                      `}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => {
                    const align = cell.column.columnDef.align ?? "left";
                    const width = cell.column.columnDef.width;

                    return (
                      <td
                        key={cell.id}
                        style={width ? { width } : {}}
                        className={`
                          px-5 py-4
                          text-sm text-gray-700
                          whitespace-nowrap
                          align-middle
                          ${alignClass[align]}
                        `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(page * rowsPerPage, filteredData.length)}
            </span>{" "}
            of <span className="font-medium">{filteredData.length}</span>{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="h-9 w-9 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                  page === i + 1
                    ? "bg-[#E23E08] text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="h-9 w-9 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
