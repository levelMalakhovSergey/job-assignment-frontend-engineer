import React from "react";
import { Comment as CommentType } from "../types/api";
import { Link } from "react-router-dom";
import { PLACEHOLDER_USER_IMAGE } from "../utils/constants";
import { Button } from "antd";
import { useAtomValue } from "jotai/utils";
import { userAtom } from "../store";
import { useDeleteComment } from "../hooks/useDeleteComment";

type Props = {
  comment: CommentType;
  slug: string;
};

export const Comment: React.FC<Props> = ({ comment, slug }) => {
  const user = useAtomValue(userAtom);
  const del = useDeleteComment(slug);
  const isAuthor = user?.username === comment.author.username;

  return (
    <div className="card comment" key={comment.id}>
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/profile/${comment.author.username}`} className="comment-author">
          <img src={comment.author.image || PLACEHOLDER_USER_IMAGE} className="comment-author-img" alt="" />
        </Link>
        <Link to={`/profile/${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{new Date(comment.createdAt).toLocaleString()}</span>
        {isAuthor && (
          <Button
            type="link"
            danger
            onClick={() => del.mutate(comment.id)}
            style={{ float: "right" }}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default Comment;
