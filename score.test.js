const Score = require('./score')


describe ('runFrame', () => {
  it ('adds user scores to the scoreList map', () => {
    let score = new Score();
    score.runFrame(9,1);
    expect(score.scoreList.get('r1')).toEqual(9);
    expect(score.scoreList.get('r2')).toEqual(1);
  });
});

describe ('frameScore', () => {
  it ('returns the sum of 2 rolls as a frame score', () => {
    let score = new Score();
    score.runFrame(2,5);
    expect(score.frameScore()).toEqual(7)
  });
});

describe ('strikeOrSpare', () => {
  it ('says user rolled a strike when first roll in frame = 10', () => {
    let score = new Score();
    score.runFrame(10,0);
    score.frameScore();
    expect(score.strikeOrSpare()).toEqual('strike');
  });

  it ('says user rolled a spare when framescore = 10', () => {
    let score = new Score();
    score.runFrame(4,6);
    score.frameScore();
    expect(score.strikeOrSpare()).toEqual('spare');
  });

  it ('does not return anything if neither strike nor spare', () => {
    let score = new Score();
    score.runFrame(2,3);
    score.frameScore();
    expect(score.strikeOrSpare()).not.toEqual('strike');
    expect(score.strikeOrSpare()).not.toEqual('spare');
    expect(score.strikeOrSpare()).toEqual(undefined)
  });
});


// .toEqual vs .toBe


