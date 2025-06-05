import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Article = {
  title: string;
  description: string;
  urlToImage: string;
  content?: string;
  url?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const Card = ({
  category,
  page,
  pageSize,
  onTotalResultsChange,
  onArticleClick,
}: {
  category: string;
  page: number;
  pageSize: number;
  onTotalResultsChange?: (total: number) => void;
  onArticleClick?: (article: Article) => void;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_NEWS_API_URL}/top-headlines`;
        const response = await axios.get(url, {
          params: {
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
            category,
            country: "us",
            page,
            pageSize,
          },
        });

        const fetched = response.data.articles || [];
        setArticles(fetched);
        onTotalResultsChange?.(response.data.totalResults);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, onTotalResultsChange, page, pageSize]);

  const handleClick = (article: Article) => {
    if (onArticleClick) {
      onArticleClick(article); // untuk detail tampilan di halaman yang sama
    } else {
      const slug = slugify(article.title);
      navigate(`/${category}/${slug}`, { state: { article } }); // untuk routing ke detail page
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (articles.length === 0)
    return <div className="p-4">No articles found.</div>;

  return (
    <div className="p-4 space-y-6">
      {articles.map((article, idx) => (
        <div
          key={idx}
          className="cursor-pointer flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-lg hover:bg-gray-100 transition"
          onClick={() => handleClick(article)}
        >
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[#111418] text-base font-bold leading-tight">
              {article.title}
            </p>
            <p className="text-[#637488] text-sm font-normal leading-normal">
              {article.description}
            </p>
          </div>
          <div
            className="aspect-video rounded-lg bg-cover bg-center flex-shrink-0 w-full md:w-64"
            style={{ backgroundImage: `url("${article.urlToImage}")` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Card;
