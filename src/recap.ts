const sum = (a: number, b: number) => {
  return a + b;
};

sum(2, 1);

class Person {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `Hi, my name is ${this.name} and I have ${this.age} years old`;
  }
}

const lucas = new Person(31, 'Lucas');

lucas.getSummary();
