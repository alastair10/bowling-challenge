class Score {

  constructor () {
    this.r1 = 0;
    this.r2 = 0;
    this.b1 = 0;
    this.b2 = 0;
    this.framescore = 0;
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
    this.framescore = this.r1 + this.r2;
    return this.framescore;
  }

  // assigns bonus scores
  runCurrentBonus () {
    // this frame < 10, set bonuses to 0
    if (this.framescore < 10) {
      this.bonusList.set(this.currentRoll-1,0)
        .set(this.currentRoll,0);
    }
  };

  runPriorBonus () {
    // previous frame = spare, add currentRoll 1 to previous frame bonus 1
    if ((this.scoreList.get(this.currentRoll-3) + (this.scoreList.get(this.currentRoll-2))) === 10) {
      this.bonusList.set(this.currentRoll-3, this.r1)
        .set(this.currentRoll-2,0);
    // prior two strikes in a row
    } else if ((this.scoreList.get(this.currentRoll-5) === 10) && (this.scoreList.get(this.currentRoll-3) === 10)) {
      this.bonusList.set(this.currentRoll-5, 10)
        .set(this.currentRoll-4, 10);
    // previous frame = strike and this frame != strike, add both rolls this frame to previous frame bonuses
    } else if (this.scoreList.get(this.currentRoll-3) === 10) {
      this.bonusList.set(this.currentRoll-3, this.r1)
        .set(this.currentRoll-2, this.r2);
    }
  };

  // determines whether a user has hit a strike or spare
  strikeOrSpare() {
    if (this.r1 === 10) {
      return 'strike';
    } else if (this.framescore === 10) {
      return 'spare';
    };
  };

  


}

module.exports = Score;