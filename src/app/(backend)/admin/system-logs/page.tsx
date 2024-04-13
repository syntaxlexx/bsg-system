import { IdToggler, Title } from "@/components";
import { getSystemLogs } from "./actions";
import Filters from "./filters";
import Link from "next/link";
import { formatDate, fromNow } from "@acelords/js-utils";
import Pagination from "./pagination";

interface Props {
  searchParams: {
    search?: string;
    userId?: string;
    page?: string;
    limit?: string;
  };
}

const Page = async ({
  searchParams: { limit, page, search, userId },
}: Props) => {
  const logs = await getSystemLogs({ page, search, limit, userId });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Title text="System Logs" />
      </div>
      <Filters />

      <div className="table-responsive">
        <table className="simple-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>User</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.data.map((item, i) => (
              <tr key={item.id}>
                <td title={item.id}>{i + 1}.</td>
                <td>
                  <div className="text-[9px]">{fromNow(item.createdAt)}</div>
                  <div className="text-[9px] text-gray-500">
                    {formatDate(item.createdAt)}
                  </div>
                </td>
                <td className="text-xs">
                  {item.userId && (
                    <IdToggler id={item.userId}>
                      <Link
                        href={`/admin/users/${item.userId}`}
                        className="hover:underline hover:underline-offset-4 transition hover:text-blue-500"
                      >
                        {item.user?.name}
                      </Link>
                    </IdToggler>
                  )}
                </td>
                <td className="text-xs">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination meta={logs.meta} total={logs.data.length} />
    </div>
  );
};

export default Page;
