"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Pagination } from "@/components/shared/pagination";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  filterValue?: (row: T) => string;
  render: (row: T) => ReactNode;
}

export function DataTable<T extends { _id?: string; id?: string }>({
  columns,
  rows,
  emptyMessage = "No records found",
  pageSize = 8,
  searchable = true,
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  pageSize?: number;
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let next = rows;

    if (normalized) {
        next = rows.filter((row) =>
        columns.some((column) => {
          const record = row as unknown as Record<string, unknown>;
          const raw =
            column.filterValue?.(row) ??
            String(record[column.key] ?? "").toLowerCase();
          return raw.toLowerCase().includes(normalized);
        }),
      );
    }

    if (sortKey) {
      next = [...next].sort((a, b) => {
        const leftRecord = a as unknown as Record<string, unknown>;
        const rightRecord = b as unknown as Record<string, unknown>;
        const left = String(leftRecord[sortKey] ?? "").toLowerCase();
        const right = String(rightRecord[sortKey] ?? "").toLowerCase();
        if (left < right) return sortDir === "asc" ? -1 : 1;
        if (left > right) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return next;
  }, [rows, query, columns, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="space-y-4">
      {searchable ? (
        <Input
          label="Filter table"
          placeholder="Search rows..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
      ) : null}

      {paged.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-10 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
          <Table>
            <THead>
              <TR>
                {columns.map((column) => (
                  <TH key={column.key}>
                    {column.sortable === false ? (
                      column.header
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1"
                        onClick={() => toggleSort(column.key)}
                      >
                        {column.header}
                        {sortKey === column.key ? (
                          <span className="font-mono text-[10px]">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        ) : null}
                      </button>
                    )}
                  </TH>
                ))}
              </TR>
            </THead>
            <TBody>
              {paged.map((row) => (
                <TR key={row._id ?? row.id}>
                  {columns.map((column) => (
                    <TD key={column.key}>{column.render(row)}</TD>
                  ))}
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      )}

      <Pagination page={currentPage} pages={pages} onChange={setPage} />
    </div>
  );
}
