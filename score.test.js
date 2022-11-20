const Score = require('./score')

describe ('tenth frame scoring', () => {
  it ('assigns 0 bonus for non strike and non spare', () => {
    let score = new Score();
    score.runRoll(3,4);
    score.getFrameScore();
    score.currentBonus();
    expect(score.bonusList.get(1)).toEqual(0);
    expect(score.bonusList.get(2)).toEqual(0);
  });

  it ('assigns bonus for spare in 10th frame', () => {
    let score = new Score();
    score.runRoll(1,4);
    score.runRoll(4,5);
    score.runRoll(6,4);
    score.runRoll(5,5);
    score.runRoll(10,0);
    score.runRoll(0,1);
    score.runRoll(7,3);
    score.runRoll(10,0);
    score.runRoll(10,0);
    score.runRoll(6,4); // spare in 10th
    score.tenthBonusOne(3)
    expect(score.bonusList.get(19)).toEqual(3)
  });

  it ('assigns bonuses for strike in 10th frame if 3 strikes in a row', () => {
    let score = new Score();
    score.runRoll(1,4);
    score.runRoll(4,5);
    score.runRoll(6,4);
    score.runRoll(5,5);
    score.runRoll(10,0);
    score.runRoll(0,1);
    score.runRoll(7,3);
    score.runRoll(10,0);
    score.runRoll(10,0);
    score.runRoll(10,0); // strike in 10th
    score.tenthBonusOne(9);
    score.tenthBonusTwo(8);
    expect(score.bonusList.get(18)).toEqual(9);
    expect(score.bonusList.get(19)).toEqual(9);
    expect(score.bonusList.get(20)).toEqual(8);
  });
});

describe ('currentBonus', () => {
  it ('assigns 0 bonus for current frame', () => {
    let score = new Score();
    score.runRoll(3,4);
    score.getFrameScore();
    score.currentBonus();
    expect(score.bonusList.get(1)).toEqual(0);
    expect(score.bonusList.get(2)).toEqual(0);
  });

  it ('assigns two bonuses for a spare from previous round', () => {
    let score = new Score();
    score.runRoll(5,5); //spare
    score.getFrameScore();
    score.runRoll(2,1);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    expect(score.bonusList.get(1)).toEqual(2);
    expect(score.bonusList.get(2)).toEqual(0);
  });
});

describe ('runRoll', () => {
  it ('adds user scores to the scoreList map', () => {
    let score = new Score();
    score.runRoll(9,1);
    expect(score.scoreList.get(1)).toEqual(9);
    expect(score.scoreList.get(2)).toEqual(1);
  });

  it ('adds user scores to the scoreList map after 2 rounds', () => {
    let score = new Score();
    score.runRoll(1,4);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    score.runRoll(4,5);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    expect(score.scoreList.get(3)).toEqual(4);
    expect(score.scoreList.get(4)).toEqual(5);
  });
});

describe ('getFrameScore', () => {
  it ('returns the sum of 2 rolls as a frame score', () => {
    let score = new Score();
    score.runRoll(2,5);
    expect(score.getFrameScore()).toEqual(7)
  });
});

describe ('strikeOrSpare', () => {
  it ('says user rolled a strike when first roll in frame = 10', () => {
    let score = new Score();
    score.runRoll(10,0);
    score.getFrameScore();
    expect(score.strikeOrSpare()).toEqual('strike');
  });

  it ('says user rolled a spare when framescore = 10', () => {
    let score = new Score();
    score.runRoll(4,6);
    score.getFrameScore();
    expect(score.strikeOrSpare()).toEqual('spare');
  });

  it ('does not return anything if neither strike nor spare', () => {
    let score = new Score();
    score.runRoll(2,3);
    score.getFrameScore();
    expect(score.strikeOrSpare()).not.toEqual('strike');
    expect(score.strikeOrSpare()).not.toEqual('spare');
    expect(score.strikeOrSpare()).toEqual(undefined)
  });
});

describe ('priorSpareBonus', () => {
  it ('checks if a bonus is due from previous frame and applies first roll of current round', () => {
    let score = new Score();
    score.runRoll(3,4);
    score.runRoll(6,4); // spare in round 2
    score.runRoll(9,0); // first roll
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    expect(score.bonusList.get(3)).toEqual(9);
    expect(score.bonusList.get(4)).toEqual(0);
  });

  it ('checks if a bonus is due from previous frame and does NOT apply first roll of current round', () => {
    let score = new Score();
    score.runRoll(3,4);
    score.currentBonus();
    score.runRoll(1,4); // NO spare in round 2
    score.currentBonus();
    score.runRoll(9,0); // first roll should NOT be applied
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    expect(score.bonusList.get(3)).toEqual(0);
    expect(score.bonusList.get(4)).toEqual(0);
  });
});

describe ('priorSingleStrikeBonus', () => {
  it ('checks if a bonus is due from previous frame strike applies first AND second roll of current round', () => {
    let score = new Score();
    score.runRoll(10,0);
    score.currentBonus();
    score.runRoll(1,4);
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    expect(score.bonusList.get(1)).toEqual(1);
    expect(score.bonusList.get(2)).toEqual(4);
  });

  it ('does not apply bonus when no strike was made on previous frame', () => {
    let score = new Score();
    score.runRoll(9,0);
    score.currentBonus();
    score.runRoll(1,4);
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    expect(score.bonusList.get(1)).toEqual(0);
    expect(score.bonusList.get(2)).toEqual(0);
  });
});

describe ('priorDoubleStrikeBonus', () => {
  it ('applies bonuses to two previous rounds when consecutive strikes are made', () => {
    let score = new Score();
    score.runRoll(10,0);
    score.currentBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    score.runRoll(10,0);
    score.currentBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    score.runRoll(4,3);
    score.currentBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    expect(score.bonusList.get(1)).toEqual(10);
    expect(score.bonusList.get(2)).toEqual(4);
    expect(score.bonusList.get(3)).toEqual(4);
    expect(score.bonusList.get(4)).toEqual(3);
  });
});

describe ('printFrameScore', () => {
  it ('prints the score for any given frame', () => {
    let score = new Score();
    score.runRoll(10,0);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    score.runRoll(10,0);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    score.runRoll(1,4);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikeBonus();
    expect(score.printFrameScore(1)).toEqual(21);
    expect(score.printFrameScore(2)).toEqual(15);
    expect(score.printFrameScore(3)).toEqual(5);
  });
});

describe ('tenthBonusOne', () => {
  it ('adds a bonus for a spare in the 10th frame', () => {
    let score = new Score();
    score.tenthBonusOne(6);
    expect(score.bonusList.get(19)).toEqual(6);
  });

  it ('adds a bonus for a strike in the 10th frame', () => {
    let score = new Score();
    score.scoreList.set(17,10);
    score.scoreList.set(19,10);
    score.tenthBonusOne(3);
    expect(score.bonusList.get(18)).toEqual(3);
    expect(score.bonusList.get(19)).toEqual(3);
  });
});

describe ('tenthBonusTwo', () => {
  it ('adds a bonus for a strike in the 10th frame', () => {
    let score = new Score();
    score.scoreList.set(19,10);
    score.tenthBonusTwo(7)
    expect(score.bonusList.get(20)).toEqual(7);
  });
});