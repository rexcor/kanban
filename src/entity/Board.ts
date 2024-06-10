export default class Board {
  constructor(readonly name: string) {
    if (name === "") throw new Error("Board name is required");
  }
}
