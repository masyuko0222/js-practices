import enquirer from "enquirer";

export class Format {
  #memos;

  constructor(memos) {
    this.#memos = memos;
  }

  index() {
    this.#memos.forEach((memo) => {
      console.log(memo.firstLine);
    });
  }

  show(memo) {
    console.log(memo.content);
  }

  async select() {
    const question = {
      type: "select",
      name: "memos",
      message: "Choose a note you want to see:",
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
