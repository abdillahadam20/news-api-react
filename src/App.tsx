import { Typography } from "antd";
import { useState } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import Card, { type Article } from "./components/card";
import Navbar from "./components/navbar";
import NewsDetail from "./components/newsDetail";
import Pagination from "./components/pagination";
import Search from "./components/search";

const { Paragraph } = Typography;

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "technology";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("q") || "";
  const pageSize = 10;
  const [totalResults, setTotalResults] = useState(0);
  const totalPages = Math.ceil(totalResults / pageSize);
  const navigate = useNavigate();

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setSearchParams({ category, page: newPage.toString(), q: query });
  };

  // Handle opening article detail
  const handleOpenDetail = (article: Article) => {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    navigate(`/news/${slug}`, { state: { article } });
  };

  // Handle search query change
  const handleQueryChange = (newQuery: string) => {
    setSearchParams({
      category,
      page: "1",
      q: newQuery,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <Search query={query} onQueryChange={handleQueryChange} />
      </div>
      <Paragraph className="text-[#111418] text-center tracking-light text-[32px] font-bold leading-tight min-w-72">
        Top Stories
      </Paragraph>
      <Card
        category={category}
        page={page}
        pageSize={pageSize}
        query={query}
        onTotalResultsChange={setTotalResults}
        onArticleClick={handleOpenDetail}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function App() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "technology";
  const navigate = useNavigate();

  const handleCategoryChange = (newCategory: string) => {
    navigate(`/?category=${newCategory}&page=1`);
  };

  return (
    <>
      <Navbar
        onSelectCategory={handleCategoryChange}
        selectedCategory={category}
      />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
