import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAuthorImageUrl } from "../utils/getAuthorImageUrl";
import { PLACEHOLDER_USER_IMAGE } from "../utils/constants";

type AuthorImageProps = {
  username: string;
  image?: string | null;
  className?: string;
};

export function AuthorImage({
  username,
  image,
  className,
}: AuthorImageProps) {
  const [src, setSrc] = useState(getAuthorImageUrl(image));

  useEffect(() => {
    setSrc(getAuthorImageUrl(image));
  }, [image]);

  return (
    <Link to={`/profile/${username}`}>
      <img
        src={src}
        alt={username}
        width={32}
        height={32}
        className={className}
        onError={() => setSrc(PLACEHOLDER_USER_IMAGE)}
      />
    </Link>
  );
}
