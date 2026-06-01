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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const queryParams = selectedTag
    ? { limit: ARTICLES_PAGE_SIZE, offset: 0, tag: selectedTag }
    : feed === "your" && user
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

                {selectedTag && (
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      className="tag-pill tag-default"
                      style={{
                        backgroundColor: "#5cb85c",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedTag(null)}
                    >
                      {selectedTag} ✕
                    </span>
                  </div>
                )}

                <div className="tag-list">
                  {["programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className={`tag-pill tag-default ${selectedTag === tag ? "active-tag" : ""}`}
                        style={{
                          cursor: "pointer",
                          opacity: selectedTag === tag ? 1 : 0.7,
                          backgroundColor: selectedTag === tag ? "#5cb85c" : "",
                          color: selectedTag === tag ? "#fff" : "",
                        }}
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
