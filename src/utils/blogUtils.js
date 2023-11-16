export const isFollowing = (id, following) => {
  const res = following.findIndex((element) => element === id);
  return res !== -1 ? true : false;
};

export const isLiked = (id, likes) => {
  return likes.findIndex((element) => element === id) !== -1 ? true : false;
};
