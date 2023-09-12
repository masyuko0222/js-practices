export function show(memo) {
  console.log(memo.content);
}

export function index(memos) {
  memos.forEach((memo) => {
    console.log(memo.firstLine);
  });
}
