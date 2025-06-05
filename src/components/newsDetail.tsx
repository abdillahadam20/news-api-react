import type { FC } from "react";

type NewsDetailProps = {
  article: {
    title: string;
    content?: string;
    urlToImage?: string;
    description?: string;
    url?: string;
  };
  onBack: () => void;
};

const NewsDetail: FC<NewsDetailProps> = ({ article, onBack }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-blue-500 underline hover:text-blue-700"
      >
        ← Back to list
      </button>
      <h1 className="text-2xl font-bold">{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="rounded-lg w-full object-cover"
        />
      )}
      <p className="text-gray-700">{article.description}</p>
      <p className="text-gray-800 mt-2">{article.content}</p>
      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Read more
        </a>
      )}
    </div>
  );
};

export default NewsDetail;
