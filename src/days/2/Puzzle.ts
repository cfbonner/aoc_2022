import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  prepareDataset(raw: string): string[][] {
    const raw_matches = raw.trim().split("\n")
    return raw_matches.map(raw_match => {
      return raw_match.split(' ')
    })
  }

  public solveFirst(): string {
    const matches: string[][] = this.prepareDataset(this.input)

    const ROCK: string = 'rock'
    const PAPER: string = 'paper'
    const SCISSORS: string = 'scissors'

    const KEYS: { [key: string]: string } = {
      'A': ROCK,
      'B': PAPER,
      'C': SCISSORS,
      'X': ROCK,
      'Y': PAPER,
      'Z': SCISSORS,
    }

    const WHO_BEATS_WHO: { [key: string]: string } = {
      [ROCK]: SCISSORS,
      [PAPER]: ROCK,
      [SCISSORS]: PAPER,
    }

    const BONUSES: { [key: string]: number } = {
      [ROCK]: 1,
      [PAPER]: 2,
      [SCISSORS]: 3
    }

    const scores: { [key: number]: number } = {
      1: 0,
      2: 0,
    }

    matches.forEach(match => {
      const playerOneChoice = KEYS[match[0]]
      const playerTwoChoice = KEYS[match[1]]

      scores[1] += BONUSES[playerOneChoice]
      scores[2] += BONUSES[playerTwoChoice]

      if (playerOneChoice == playerTwoChoice) {
	scores[1] += 3
	scores[2] += 3
      } else if (WHO_BEATS_WHO[playerOneChoice] == playerTwoChoice) {
	scores[1] += 6 
      } else if (WHO_BEATS_WHO[playerTwoChoice] == playerOneChoice) {
	scores[2] += 6
      }
    })

    return scores[2].toString();
  }

  public getFirstExpectedResult(): string {
    return '13809';
  }

  public solveSecond(): string {
    const matches: string[][] = this.prepareDataset(this.input)

    const ROCK: string = 'rock'
    const PAPER: string = 'paper'
    const SCISSORS: string = 'scissors'
    const WIN: string = 'win'
    const LOSE: string = 'lose'
    const DRAW: string = 'draw'

    const RPS_KEYS: { [key: string]: string } = {
      'A': ROCK,
      'B': PAPER,
      'C': SCISSORS,
    }

    const WLD_KEYS: { [key: string]: string } = {
      'X': LOSE,
      'Y': DRAW,
      'Z': WIN,
    }

    const WIN_PLAYS: { [key: string]: string } = {
      [ROCK]: PAPER,
      [PAPER]: SCISSORS,
      [SCISSORS]: ROCK,
    }

    const LOSE_PLAYS: { [key: string]: string } = {
      [ROCK]: SCISSORS,
      [PAPER]: ROCK,
      [SCISSORS]: PAPER,
    }

    const DRAW_PLAYS: { [key: string]: string } = {
      [ROCK]: ROCK,
      [PAPER]: PAPER,
      [SCISSORS]: SCISSORS,
    }

    const BONUSES: { [key: string]: number } = {
      [ROCK]: 1,
      [PAPER]: 2,
      [SCISSORS]: 3
    }

    const scores: { [key: number]: number } = {
      1: 0,
      2: 0,
    }

    matches.forEach(match => {
      const playerOneChoice: string = RPS_KEYS[match[0]]
      const playerTwoOutcome: string = WLD_KEYS[match[1]]
      let playerTwoChoice
      if (playerTwoOutcome == WIN) {
	playerTwoChoice = WIN_PLAYS[playerOneChoice]
	scores[2] += 6 
      } else if (playerTwoOutcome == LOSE) {
	playerTwoChoice = LOSE_PLAYS[playerOneChoice]
	scores[1] += 6 
      } else if (playerTwoOutcome == DRAW) {
	playerTwoChoice = DRAW_PLAYS[playerOneChoice]
	scores[1] += 3
	scores[2] += 3
      }

      scores[1] += BONUSES[playerOneChoice]
      scores[2] += BONUSES[playerTwoChoice]
    })

    return scores[2].toString();
  }

  public getSecondExpectedResult(): string {
    return '12316';
  }
}
