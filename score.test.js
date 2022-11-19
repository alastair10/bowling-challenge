const Score = require('./score')

describe ('runBonus', () => {
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
    score.priorDoubleStrikesBonus();
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
    score.priorDoubleStrikesBonus();
    score.runRoll(4,5);
    score.getFrameScore();
    score.currentBonus();
    score.priorSpareBonus();
    score.priorSingleStrikeBonus();
    score.priorDoubleStrikesBonus();
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


// .toEqual vs .toBe


