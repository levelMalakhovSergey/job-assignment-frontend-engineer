import React from "react";
import { Link, useParams } from "react-router-dom";

import { AuthorImage } from "./components/AuthorImage";
import { FavoriteArticleButton } from "./components/FavoriteArticleButton";
import { FollowUserButton } from "./components/FollowUserButton";
import { Layout } from "./components/Layout";
import { useArticle } from "./hooks/useArticles";
import { formatDate } from "./utils/formatDate";
import { renderMarkdown } from "./utils/renderMarkdown";
import AddComment from "./components/AddComment";
import { useComments } from "./hooks/useComments";
import Comment from "./components/Comment";

type ArticleRouteParams = {
  slug: string;
};

export default function Article() {
  const { slug } = useParams<ArticleRouteParams>();
  const { data, isLoading, isError } = useArticle(slug);
  const article = data?.article;
  const commentsQuery = useComments(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="article-page">
          <div className="container page">Loading article...</div>
        </div>
      </Layout>
    );
  }

  if (isError || !article) {
    return (
      <Layout>
        <div className="article-page">
          <div className="container page">Article not found.</div>
        </div>
      </Layout>
    );
  }

  const articleMeta = (
    <div className="article-meta">
      <AuthorImage
        username={article.author.username}
        image={article.author.image}
      />
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
      <FollowUserButton
        profile={article.author}
        className="btn btn-sm btn-outline-secondary"
      />
      &nbsp;&nbsp;
      {/* <FavoriteArticleButton
        article={article}
        className="btn btn-sm btn-outline-primary"
        showLabel
      /> */}
    </div>
  );

  return (
    <Layout>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            {articleMeta}
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div
              className="col-md-12"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(article.body),
              }}
            />
          </div>

          <hr />

          <div className="article-actions">{articleMeta}</div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <AddComment slug={article.slug} />

              {/* comments list */}
              {commentsQuery.isLoading ? (
                <p>Loading comments...</p>
              ) : (
                (commentsQuery.data?.comments || []).map((c) => (
                  <Comment key={c.id} comment={c} slug={article.slug} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
