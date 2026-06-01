import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useCreateComment } from "../hooks/useCreateComment";
import { useAtomValue } from "jotai/utils";
import { isAuthenticatedAtom } from "../store";
import { Link } from "react-router-dom";

type Props = {
  slug: string;
};

export const AddComment: React.FC<Props> = ({ slug }) => {
  const [body, setBody] = useState("");
  const isAuth = useAtomValue(isAuthenticatedAtom);
  const create = useCreateComment(slug);

  if (!isAuth) {
    return (
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
      </p>
    );
  }

  const onSubmit = async () => {
    if (!body.trim()) return;
    try {
      await create.mutateAsync(body.trim());
      setBody("");
      message.success("Comment posted");
    } catch (e) {
      message.error("Failed to post comment");
    }
  };

  return (
    <div className="card comment-form">
      <div className="card-block">
        <Input.TextArea
          rows={3}
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="card-footer">
        <Button type="primary" onClick={onSubmit} loading={create.isLoading}>
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
