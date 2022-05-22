import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
const getSomeValue = <T, TKey1 extends keyof T, TKey2 extends keyof T[TKey1]>(
  obj: T,
  key1: TKey1,
  key2: TKey2
) => {
  return obj[key1][key2];
};

const myObj = {
  foo: {
    a: true,
    b: "str",
    c: 100,
  },
};

const val = getSomeValue(myObj, "foo", "a");

console.assert(typeof val === "boolean");
