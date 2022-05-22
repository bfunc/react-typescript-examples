type Animal = {
  age: number;
};

type Human = {
  name: string;
};

export type GetInfo<T> = T extends Animal
  ? { name: string }
  : T extends Human
  ? { id: number }
  : never;

export type InfoForAnimal = GetInfo<Animal>;
export type InfoForHuman = GetInfo<Human>;
export type InfoForAlien = GetInfo<{ planet: number }>;

var a: InfoForAlien = { planet: 1 };
