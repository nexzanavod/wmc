import { useState } from "react";

interface DailyMetric {
  date: string;
  impression: number;
  engagement: number;
  reach: number;
  follow: number;
}

interface DailyMetricsTableProps {
  data: DailyMetric[];
  disablePagination?: boolean;
}

export default function DailyMetricsTable({ data, disablePagination }: DailyMetricsTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(data.length / pageSize);
  const pagedData = disablePagination ? data : data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Impressions</th>
            <th className="px-4 py-2">Engagements</th>
            <th className="px-4 py-2">Reach</th>
            <th className="px-4 py-2">Follows</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row, i) => (
            <tr key={row.date} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
              <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{row.impression}</td>
              <td className="px-4 py-2">{row.engagement}</td>
              <td className="px-4 py-2">{row.reach}</td>
              <td className="px-4 py-2">{row.follow}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {!disablePagination && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
