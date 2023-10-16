export function reference(memo) {
  console.log(memo.content);
}

export function list(memos) {
  memos.forEach((memo) => {
    console.log(memo.firstLine);
  });
}
