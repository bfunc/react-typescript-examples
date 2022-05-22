export type Pick<T, PropertiesToPick extends keyof T> = {
  [P in PropertiesToPick]: T[P];
};

export type MyType = Pick<{ hey: "you"; a: 1; b: 2 }, "hey">;
