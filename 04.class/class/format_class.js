import enquirer from "enquirer";

export class Format {
  static show(memo) {
    console.log(memo.content);
  }

  #memos;

  constructor(memos) {
    this.#memos = memos;
  }

  index() {
    this.#memos.forEach((memo) => {
      console.log(memo.firstLine);
    });
  }

  async select(msg = "") {
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
