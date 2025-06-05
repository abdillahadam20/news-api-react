const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center p-4 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="size-10 flex items-center justify-center"
      >
        &lt;
      </button>
      {generatePages().map((page, i) =>
        page === "..." ? (
          <span key={i} className="size-10 flex items-center justify-center">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(page as number)}
            className={`size-10 flex items-center justify-center rounded-full ${
              currentPage === page ? "bg-[#f0f2f4] font-bold" : ""
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="size-10 flex items-center justify-center"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
