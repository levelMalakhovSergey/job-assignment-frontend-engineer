import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { ArticlePreview } from "./components/ArticlePreview";
import { FollowUserButton } from "./components/FollowUserButton";
import { Layout } from "./components/Layout";
import { useArticles } from "./hooks/useArticles";
import { useProfile } from "./hooks/useFollowUser";
import { ARTICLES_PAGE_SIZE } from "./utils/constants";
import { getAuthorImageUrl } from "./utils/getAuthorImageUrl";

type ProfileRouteParams = {
  username: string;
};

export default function Profile() {
  const { username } = useParams<ProfileRouteParams>();
  const [selectedTab, setSelectedTab] = useState<"my" | "favorited">("my");
  const profileQuery = useProfile(username);
  const articlesQuery = useArticles(
    selectedTab === "my"
      ? { author: username, limit: ARTICLES_PAGE_SIZE, offset: 0 }
      : { favorited: username, limit: ARTICLES_PAGE_SIZE, offset: 0 }
  );

  const profile = profileQuery.data?.profile;

  if (profileQuery.isLoading) {
    return (
      <Layout>
        <div className="profile-page">
          <div className="container page">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (profileQuery.isError || !profile) {
    return (
      <Layout>
        <div className="profile-page">
          <div className="container page">Profile not found.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src={getAuthorImageUrl(profile.image)}
                  height={200}
                  width={220}
                  alt={profile.username}
                  className="user-img"
                />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <FollowUserButton profile={profile} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <button
                  type="button"
                  className={`article-toggle-button ${selectedTab === "my" ? "active" : ""}`}
                  onClick={() => setSelectedTab("my")}
                >
                  My Articles
                </button>
                <button
                  type="button"
                  className={`article-toggle-button ${selectedTab === "favorited" ? "active" : ""}`}
                  onClick={() => setSelectedTab("favorited")}
                >
                  Favorited Articles
                </button>
              </div>

              {articlesQuery.isLoading && (
                <div className="article-preview">Loading articles...</div>
              )}
              {articlesQuery.isError && (
                <div className="article-preview">
                  Failed to load articles for this author.
                </div>
              )}
              {articlesQuery.data?.articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
