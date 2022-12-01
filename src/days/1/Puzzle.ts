import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  calculateCalories() {
    const batched: string[] = this.input.split('\n\n');
    let acc: number[] = [];

    batched.forEach((batch) => {
      const items = batch
        .split('\n')
        .filter((el) => el)
        .map((item) => parseInt(item));
      acc.push(
        items.reduce((sum: number, calories: number) => {
          return sum + calories;
        }, 0)
      );
    });

    return acc.sort((a: number, b: number) => {
      return b - a;
    });
  }

  public solveFirst(): string {
    const sorted = this.calculateCalories();
    return sorted[0].toString();
  }

  public solveSecond(): string {
    const sorted = this.calculateCalories();
    return [sorted[0], sorted[1], sorted[2]]
      .reduce((sum: number, calories: number) => {
        return sum + calories;
      }, 0)
      .toString();
  }

  public getFirstExpectedResult(): string {
    return '75501';
  }

  public getSecondExpectedResult(): string {
    return '215594';
  }
}
