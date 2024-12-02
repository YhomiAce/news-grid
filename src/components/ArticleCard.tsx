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
    <Card className="p-3" sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={article.image} title="article" />
      <CardContent>
        <Typography variant="body1" className="text-2xl font-bold">
          {article.title}
        </Typography>
      </CardContent>
      <div className="flex flex-col p-3 gap-2">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Author: {article.author}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Source: {article.source}
        </Typography>
      </div>

      <CardActions className="p-2 grid grid-cols-2 items-center gap-4">
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className="text-sm"
        >
          {formatDateByMDY(article.publishedAt)}
        </Typography>
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
