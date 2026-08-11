import React from "react";

export default function Pagination({ total, page, setPage }) {
  const pages = Math.ceil(total / 5);
  return (
    <div>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}
