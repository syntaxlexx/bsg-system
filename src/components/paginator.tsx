"use client";

import { formatNumber, numberFormat, pluralize } from "@acelords/js-utils";
import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  lastPage: number;
  initialPage?: number;
  page: number;
  perPage?: number;
  total?: number;
  totalResults?: number;
  showInfo?: boolean;
  viewMoreText?: string;
  onChange?: (page: number) => void;
}

const Paginator: FC<Props> = ({
  initialPage = 1,
  page,
  lastPage,
  perPage,
  total,
  totalResults,
  showInfo = true,
  onChange,
}) => {
  const hasPrevPage = Math.max(page, 0) > 1;
  const hasNextPage = Math.max(page, 0) < Math.max(lastPage, 0);

  return (
    <div className="my-4 flex flex-col md:flex-row md:items-center md:gap-x-4 lg:mt-6">
      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn({
                  "opacity-50 cursor-not-allowed": !hasPrevPage,
                })}
                aria-disabled={!hasPrevPage}
                onClick={() => {
                  if (!hasPrevPage) return;
                  if (onChange) {
                    onChange(page - 1);
                  }
                }}
              />
            </PaginationItem>

            {[...Array(Number(lastPage))].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i + 1 === page}
                  className={cn("cursor-pointer")}
                  onClick={() => {
                    if (onChange) {
                      onChange(i + 1);
                    }
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {Number(lastPage) > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                className={cn({
                  "opacity-50 cursor-not-allowed": !hasNextPage,
                })}
                aria-disabled={!hasNextPage}
                onClick={() => {
                  if (!hasNextPage) return;
                  if (onChange) {
                    onChange(page + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {/* 
        <Pagination
          showShadow
          color="primary"
          page={page}
          total={lastPage}
          initialPage={initialPage}
          onChange={onChange}
        /> */}
      </div>

      {showInfo ? (
        <div className="flex gap-2 items-center">
          {total != undefined ? (
            <div>
              Showing {numberFormat(total, true)}{" "}
              {total > 0 ? pluralize("items", total) : "items"}
              {totalResults ? (
                <span className="ml-1">
                  of {formatNumber(totalResults, true)}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Paginator;
