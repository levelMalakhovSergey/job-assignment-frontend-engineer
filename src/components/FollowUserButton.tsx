import React from "react";
import { useHistory } from "react-router-dom";
import { useAtomValue } from "jotai";

import { useFollowUser } from "../hooks/useFollowUser";
import { isAuthenticatedAtom, userAtom } from "../store/auth";
import { Profile } from "../types";

type FollowUserButtonProps = {
  profile: Profile;
  className?: string;
};

export function FollowUserButton({
  profile,
  className = "btn btn-sm btn-outline-secondary action-btn",
}: FollowUserButtonProps) {
  const history = useHistory();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const currentUser = useAtomValue(userAtom);
  const followMutation = useFollowUser(profile.username);

  if (currentUser?.username === profile.username) {
    return null;
  }

  const buttonClassName = profile.following
    ? className.replace("btn-outline-secondary", "btn-secondary")
    : className;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      history.push("/login");
      return;
    }

    followMutation.mutate(profile);
  };

  const followersCount =
    profile.followersCount !== undefined ? (
      <span className="counter"> ({profile.followersCount})</span>
    ) : null;

  return (
    <button
      className={buttonClassName}
      onClick={handleClick}
      disabled={followMutation.isLoading}
      type="button"
    >
      <i className={profile.following ? "ion-minus-round" : "ion-plus-round"} />
      &nbsp; {profile.following ? "Unfollow" : "Follow"} {profile.username}
      {followersCount}
    </button>
  );
}
