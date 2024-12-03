import useNewsFeed from "../hooks/useNewsFeed";
import ArticleCard from "./ArticleCard";
import Spinner from "./Spinner";

const NewsFeed = () => {
  const { articles, newsSources, loading } = useNewsFeed();
  const settingsStore = localStorage.getItem("settings");
  return (
    <div className="container p-10">
      <h1 className="mb-5 font-bold text-3xl text-center">News Feed</h1>
      {!settingsStore && (
        <div>
          <h3 className="text-center font-bold text-2xl">
            Personalize your news feed by clicking on the settings icon
          </h3>
        </div>
      )}
      {loading && (
        <center className="mt-5">
          <Spinner />
        </center>
      )}
      <div
        className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${newsSources.length} gap-5 mt-5`}
      >
        {newsSources.map((item) => {
          return (
            <div key={item}>
              <h1 className="mt-3 mb-5 text-3xl font-bold">{item}</h1>
              <div>
                {articles.length > 0 &&
                  articles
                    .filter((article) => article.source === item)
                    .map((article) => (
                      <ArticleCard key={article.url} article={article} />
                    ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;
