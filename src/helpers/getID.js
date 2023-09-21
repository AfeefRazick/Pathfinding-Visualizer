export const getID = (target) => {
  return Number(target.id.replace("cell-child-", "").replace("cell-", ""));
};
