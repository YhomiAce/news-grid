import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Article } from "../types/Article";
import { formatDateByMDY } from "../utils/functions";
import Button from "./Button";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={article.image} title="article" />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {article.title}
        </Typography>
      </CardContent>
      <div className="flex flex-col p-3 gap-2">
        <h5>Author: {article.author}</h5>
        <span>Source: {article.source}</span>
      </div>

      <CardActions className="p-2 grid grid-cols-2 items-center gap-4">
        <span className="text-sm">{formatDateByMDY(article.publishedAt)}</span>
        <Button
          className="btn btn-neutral btn-xs"
          onClick={() => openLinkInNewTab(article.url)}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
