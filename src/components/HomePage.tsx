import useNews from "../hooks/useNews";
import ArticleCard from "./ArticleCard";
import FilterDrawer from "./FilterDrawer";
import NewsSearchInput from "./NewsSearchInput";
import Spinner from "./Spinner";

const HomePage = () => {
  const {
    aggregateNews,
    newsList,
    loading,
    filterArticles,
    clearFliters,
    showFilter,
  } = useNews();
  return (
    <div className="p-10">
      <h1 className="font-bold text-center text-3xl mb-2">The News Grid</h1>
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <NewsSearchInput searchNews={aggregateNews} />
        {showFilter && (
          <FilterDrawer
            filterArticles={filterArticles}
            clearFliters={clearFliters}
          />
        )}
      </div>
      {loading && (
        <center className="mt-5">
          <Spinner />
        </center>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <div>
          <h1 className="mt-3 mb-5 text-3xl font-bold">News API</h1>
          {newsList.length > 0 &&
            newsList
              .filter((item) => item.source === "NewsAPI")
              .map((item) => <ArticleCard key={item.url} article={item} />)}
        </div>
        <div>
          <h1 className="mt-3 mb-5 text-3xl font-bold">
            The Guardian
          </h1>
          <div>
            {newsList.length > 0 &&
              newsList
                .filter((item) => item.source === "The Guardian")
                .map((item) => <ArticleCard key={item.url} article={item} />)}
          </div>
        </div>
        <div>
          <h1 className="mt-3 mb-5 text-3xl font-bold">
            The New York Times
          </h1>
          <div>
            {newsList.length > 0 &&
              newsList
                .filter((item) => item.source === "The New York Times")
                .map((item) => <ArticleCard key={item.url} article={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
