import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card, { type Article } from "./components/card";
import Navbar from "./components/navbar";
import NewsDetail from "./components/newsDetail";
import Pagination from "./components/pagination";
import Search from "./components/search";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const category = searchParams.get("category") || "technology";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  const [totalResults, setTotalResults] = useState(0);
  const totalPages = Math.ceil(totalResults / pageSize);

  // Set default category on first load if not set
  useEffect(() => {
    if (!searchParams.get("category")) {
      setSearchParams({ category: "technology", page: "1" });
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({
      category: prev.get("category") || "technology",
      page: newPage.toString(),
    }));
  };

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams({ category: newCategory, page: "1" });
  };

  const handleOpenDetail = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <Navbar
        onSelectCategory={handleCategoryChange}
        selectedCategory={category}
      />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {selectedArticle ? (
            <NewsDetail article={selectedArticle} onBack={handleBackToList} />
          ) : (
            <>
              <div className="flex items-center justify-center p-4">
                <Search />
              </div>
              <p className="text-[#111418] text-center tracking-light text-[32px] font-bold leading-tight min-w-72">
                Top Stories
              </p>
              <main>
                <Card
                  category={category}
                  page={page}
                  pageSize={pageSize}
                  onTotalResultsChange={setTotalResults}
                  onArticleClick={handleOpenDetail}
                />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
