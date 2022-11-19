class Score {

  constructor () {
    this.r1 = 0;
    this.r2 = 0;
    this.b1 = 0;
    this.b2 = 0;
    this.frameScore = 0;
    this.currentRoll = 0;
    this.bonusList = new Map();
    this.scoreList = new Map();
  }

  // sets up the roll scores)
  runRoll(r1, r2) {
    this.r1 = r1;
    this.r2 = r2;
    this.currentRoll += 2;
    this.scoreList.set(this.currentRoll-1,this.r1)
      .set(this.currentRoll,this.r2);
  }

  // determines the frame score
  getFrameScore() {
    this.frameScore = this.r1 + this.r2;
    return this.frameScore;
  }

  // assigns bonus scores of zero if frame < 10
  currentBonus () {
    // this frame < 10, set bonuses to 0
    if (this.frameScore < 10) {
      this.bonusList
        .set(this.currentRoll-1,0)
        .set(this.currentRoll,0);
    }
  };
  // checks if bonus for spare on round n-1 is due
  priorSpareBonus () {
    if ((this.scoreList.get(this.currentRoll-3) + (this.scoreList.get(this.currentRoll-2))) === 10) {
      this.bonusList
        .set(this.currentRoll-3, this.r1)
        .set(this.currentRoll-2,0);
    }
  };
  // checks if bonus for strike on round n-1 is due
  priorSingleStrikeBonus () {
    if ((this.scoreList.get(this.currentRoll-3) === 10) && (this.r1 != 10)) {
      this.bonusList
        .set(this.currentRoll-3, this.r1)
        .set(this.currentRoll-2, this.r2);
    }
  };

  // checks for 2 strikes in a row. 
  // bonuses due for frames n-1 and n-2 
  priorDoubleStrikeBonus () {
    if (this.currentRoll > 4) {
      if ((this.scoreList.get(this.currentRoll-5) === 10) && (this.scoreList.get(this.currentRoll-3) === 10)) {
        this.bonusList.set(this.currentRoll-4, this.r1);
      };
    };
  };
    
  // determines whether a user has hit a strike or spare
  strikeOrSpare() {
    if (this.r1 === 10) {
      return 'strike';
    } else if (this.frameScore === 10) {
      return 'spare';
    };
  };

  // prints total frame scores = scores + bonus
  printFrameScore (n) {
    let scoreTotal = this.scoreList.get(n*2) + this.scoreList.get(n*2-1);
    let bonusTotal = this.bonusList.get(n*2) + this.bonusList.get(n*2-1);
    return scoreTotal + bonusTotal;
  };

  // only called if strike or spare in 10th frame
  tenthBonusOne (roll21) {
    if ((this.scoreList.get(17) === 10) && (this.scoreList.get(19) === 10)) {
      this.bonusList
        .set(18, roll21)
        .set(19, roll21);
    };
  };

  // only called if strike in 10th frame
  // assigns last bonus
  tenthBonusTwo (roll22) {
    this.bonusList.set(22, roll22);
  };

};

module.exports = Score;