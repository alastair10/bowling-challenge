const Score = require('./score')

describe ('frameScore', () => {
  it ('returns the sum of 2 rolls as a frame score', () => {
    let score = new Score();
    expect(score.frameScore(2,5)).toEqual(7)
  });
});

describe ('strikeOrSpare', () => {
  it ('says user rolled a strike when first roll in frame = 10', () => {
    let score = new Score();
    score.frameScore(10,0);
    expect(score.strikeOrSpare()).toEqual('strike');
  });

  it ('says user rolled a spare when framescore = 10', () => {
    let score = new Score();
    score.frameScore(4,6);
    expect(score.strikeOrSpare()).toEqual('spare');
  });

  it ('does not return anything if neither strike nor spare', () => {
    let score = new Score();
    score.frameScore(2,3);
    expect(score.strikeOrSpare()).not.toEqual('strike');
    expect(score.strikeOrSpare()).not.toEqual('spare');
    expect(score.strikeOrSpare()).toEqual(undefined)
  });

});


// .toEqual vs .toBe


