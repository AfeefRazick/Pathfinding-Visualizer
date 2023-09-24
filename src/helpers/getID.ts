export const getID = (id: string) => {
  return Number(id.replace("cell-child-", "").replace("cell-", ""))
}
