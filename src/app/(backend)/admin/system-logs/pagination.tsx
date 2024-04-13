"use client";

import { Paginator } from "@/components";
import { PaginationMeta } from "@/types";
import { Loader } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FC, useTransition } from "react";

interface Props {
  meta: PaginationMeta;
  total: number;
}

const Pagination: FC<Props> = ({ meta, total }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransaction] = useTransition();

  const currentSearch = searchParams.get("search");
  const currentLimit = searchParams.get("limit");

  const handlePageChange = (page: number) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: currentSearch,
          limit: currentLimit,
          page,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    startTransaction(() => {
      router.push(url);
    });
  };

  return (
    <div className="relative w-full">
      {isPending && (
        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full grid items-center justify-center bg-black/10 z-10">
          <Loader />
        </div>
      )}

      <Paginator
        page={Number(meta.currentPage)}
        lastPage={meta.lastPage}
        onChange={handlePageChange}
        showInfo={true}
        perPage={meta.perPage}
        total={total}
      />
    </div>
  );
};

export default Pagination;
