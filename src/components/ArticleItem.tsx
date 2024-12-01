import { Article } from "../types/Article";
import { formatDateByMDY } from "../utils/functions";
import Button from "./Button";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={article.image} alt="News" />
      </figure>
      <div className="card-body">
        <p>{article.title}</p>
        <div className="mt-3">
          <p className="text-sm">Source: {article.source}</p>
          <p className="text-sm">By: {article.author}</p>
        </div>
        <div className="card-actions justify-end">
          <Button
            className="btn btn-neutral btn-sm"
            onClick={() => openLinkInNewTab(article.url)}
          >
            Read More
          </Button>
        </div>
        {/* <p className="text-sm">{formatDateByMDY(article.publishedAt)}</p> */}
      </div>
    </div>
  );
};

export default ArticleItem;
