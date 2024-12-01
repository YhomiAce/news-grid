import useNews from "../hooks/useNews";
import ArticleCard from "./ArticleCard";
import FilterDrawer from "./FilterDrawer";
import NewsSearchInput from "./NewsSearchInput";
import Spinner from "./Spinner";

const HomePage = () => {
  const { aggregateNews, newsList, loading } = useNews();
  console.log("🚀 ~ HomePage ~ newsList:", newsList);
  return (
    <div className="p-10">
      <h1 className="font-bold text-center text-3xl mb-2">News Aggregator</h1>
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <NewsSearchInput searchNews={aggregateNews} />
        <FilterDrawer />
      </div>
      {loading && (
        <center className="mt-5">
          <Spinner />
        </center>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5 mt-5">
        {newsList.length > 0 &&
          newsList.map((item) => <ArticleCard key={item.url} article={item} />)}
      </div>
    </div>
  );
};

export default HomePage;
