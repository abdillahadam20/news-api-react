import { Button, Image, Space, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { type Article } from "./card";

const { Title, Paragraph, Link } = Typography;

const NewsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article as Article | undefined;

  if (!article) return <Paragraph className="p-4">No article data.</Paragraph>;

  return (
    <div className="p-4">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Button type="link" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Title level={2}>{article.title}</Title>

        <Image
          src={article.urlToImage}
          alt={article.title}
          width="100%"
          style={{ borderRadius: 8 }}
          placeholder
        />

        <Paragraph>{article.description}</Paragraph>
        <Paragraph>{article.content}</Paragraph>

        <Link href={article.url} target="_blank">
          Read more
        </Link>
      </Space>
    </div>
  );
};

export default NewsDetail;
