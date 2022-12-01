import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  calculateCalories() {
    type Elf = {
      items: number[];
      total: number;
    };

    let acc: Elf[] = [];
    const batched = this.input.split('\n\n');

    batched.forEach((batch) => {
      const items = batch.split('\n').filter(el => el).map((item) => parseInt(item))
      acc = [
        ...acc,
        {
          items: items,
	  total: items.reduce((sum: number, calories: number) => {
	    return sum + calories;
	  }, 0)
	}
      ];
    });

    return acc.sort((a: Elf, b: Elf) => {
      return b.total - a.total;
    });
  }

  public solveFirst(): string {
    const sorted = this.calculateCalories();
    return sorted[0].total.toString();
  }

  public solveSecond(): string {
    const sorted = this.calculateCalories();
    return [sorted[0].total, sorted[1].total, sorted[2].total].reduce((sum: number, calories: number) => {
      return sum + calories
    }, 0).toString()
  }

  public getFirstExpectedResult(): string {
    return '75501';
  }

  public getSecondExpectedResult(): string {
    return '215594';
  }
}
