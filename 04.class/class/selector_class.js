import enquirer from "enquirer";

export class Selector {
  #memos;

  constructor(memos) {
    this.#memos = memos;
  }

  async choice(msg = "") {
    const question = {
      type: "select",
      name: "memos",
      message: msg,
      choices: this.#memos.map((memo) => {
        return {
          name: memo.firstLine,
          value: { id: memo.id, content: memo.content },
        };
      }),
      result() {
        return this.focused.value;
      },
    };

    const answer = await enquirer.prompt(question);
    return answer.memos;
  }
}
