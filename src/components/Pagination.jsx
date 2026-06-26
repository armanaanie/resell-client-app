"use client";

import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,search,
  category,
  condition,
}) {
  const pages = [];

  const startPage = Math.max(
    1,
    currentPage - 2
  );

  const endPage = Math.min(
    totalPages,
    currentPage + 2
  );

  for (
    let i = startPage;
    i <= endPage;
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      {/* Prev */}
      <Link
       href={`/Products?page=${currentPage - 1}&search=${search}&category=${category}&condition=${condition}`}
        className={`px-4 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white transition hover:bg-white/20 ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : ""
        }`}
      >
        Prev
      </Link>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <Link
           href={`/Products?page=1&search=${search || ""}&category=${category || ""}&condition=${condition || ""}`}
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white"
          >
            1
          </Link>

          {startPage > 2 && (
            <span className="text-white">
              ...
            </span>
          )}
        </>
      )}

      {/* Middle Pages */}
     {pages.map((page) => {
  const params = new URLSearchParams();

  params.set("page", page);

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (condition) params.set("condition", condition);

  return (
    <Link
      key={page}
      href={`/Products?${params.toString()}`}
      className={`px-4 py-2 rounded-xl border transition ${
        currentPage === page
          ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-lg"
          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
      }`}
    >
      {page}
    </Link>
  );
})}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-white">
              ...
            </span>
          )}

          <Link
            href={`/Products?page=${totalPages}`}
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next */}
      <Link
       href={`/Products?page=${currentPage + 1}&search=${search}&category=${category}&condition=${condition}`}
        className={`px-4 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white transition hover:bg-white/20 ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}