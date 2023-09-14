import enquirer from "enquirer";

export async function choice(memos = [], msg = "") {
  const question = {
    type: "select",
    name: "memos",
    message: msg,
    choices: memos.map((memo) => {
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
