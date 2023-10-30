export const isFollowing = (id, following) => {
  console.log(following);
  const res = following.findIndex((element) => element == id);
  console.log(res);
  return res != -1 ? true : false;
};
