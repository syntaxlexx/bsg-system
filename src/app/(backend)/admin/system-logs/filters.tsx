"use client";

import { SearchInput } from "@/components";
import { Input } from "@/components/ui/input";
import { PAGE_LIMITS } from "@/lib/constants";
import { Loader } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FC, useEffect, useState, useTransition } from "react";
import { useDebounceValue } from "usehooks-ts";

interface Props {}

const Filters: FC<Props> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransaction] = useTransition();

  const [debouncedSearch, setSearch] = useDebounceValue(
    searchParams.get("search") || "",
    500
  );

  const [debouncedUserId, setUserId] = useDebounceValue(
    searchParams.get("userId") || "",
    500
  );

  const [limit, setLimit] = useState<number>(PAGE_LIMITS.systemLogs);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: debouncedSearch,
          userId: debouncedUserId,
          limit,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    startTransaction(() => {
      router.push(url);
    });
  }, [debouncedSearch, router, pathname, debouncedUserId, limit]);

  return (
    <div className="space-y-2 relative">
      {isPending && (
        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full grid items-center justify-center bg-black/10 z-10">
          <Loader />
        </div>
      )}

      <div className="w-full flex items-center justify-between flex-col md:flex-row gap-4">
        <div className="w-full md:flex-grow">
          <SearchInput
            placeholder="Search by message content"
            onChange={setSearch}
            defaultValue={searchParams.get("search") || ""}
          />
        </div>

        <div>
          <Input
            placeholder="User ID"
            className="md:min-w-[250px]"
            defaultValue={searchParams.get("userId") || ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
