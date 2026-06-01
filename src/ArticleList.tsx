import React, { useState } from "react";
import { useAtomValue } from "jotai";

import { ArticlePreview } from "./components/ArticlePreview";
import { Layout } from "./components/Layout";
import { useArticles } from "./hooks/useArticles";
import { userAtom } from "./store/auth";
import { ARTICLES_PAGE_SIZE } from "./utils/constants";

export default function ArticleList() {
  const user = useAtomValue(userAtom);
  const [feed, setFeed] = useState<"global" | "your">("global");

  const queryParams =
    feed === "your" && user
      ? { limit: ARTICLES_PAGE_SIZE, offset: 0, author: user.username }
      : { limit: ARTICLES_PAGE_SIZE, offset: 0 };

  const { data, isLoading, isError } = useArticles(queryParams);
  const showYourFeed = Boolean(user);

  return (
    <Layout>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <div className="feed-buttons">
                  {showYourFeed && (
                    <button
                      type="button"
                      className={`feed-button ${feed === "your" ? "active" : ""}`}
                      onClick={() => setFeed("your")}
                    >
                      Your Feed
                    </button>
                  )}
                  <button
                    type="button"
                    className={`feed-button ${feed === "global" ? "active" : ""}`}
                    onClick={() => setFeed("global")}
                  >
                    Global Feed
                  </button>
                </div>
              </div>

              {isLoading && <div className="article-preview">Loading articles...</div>}
              {isError && (
                <div className="article-preview">
                  Failed to load articles. Is the API running?
                </div>
              )}
              {data?.articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} />
              ))}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <span className="tag-pill tag-default">programming</span>
                  <span className="tag-pill tag-default">javascript</span>
                  <span className="tag-pill tag-default">emberjs</span>
                  <span className="tag-pill tag-default">angularjs</span>
                  <span className="tag-pill tag-default">react</span>
                  <span className="tag-pill tag-default">mean</span>
                  <span className="tag-pill tag-default">node</span>
                  <span className="tag-pill tag-default">rails</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
