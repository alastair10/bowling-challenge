class Score {

  constructor () {
    this.r1 = 0;
    this.r2 = 0;
    this.framescore = 0;
    this.scoreList = new Map();
    this.currentRoll = 0;
  }

  // sets up the frame values (roll 1, roll 2, and map)
  runFrame(r1, r2) {
    this.r1 = r1;
    this.r2 = r2;
    this.currentRoll += 1;
    this.scoreList.set(`r${this.currentRoll}`,this.r1);
    this.currentRoll += 1;
    this.scoreList.set(`r${this.currentRoll}`,this.r2);
  }

  // determines the frame score
  frameScore() {
    this.framescore = this.r1 + this.r2;
    return this.framescore;
  }

  // determines whether a user has hit a strike or spare
  strikeOrSpare() {
    if (this.r1 === 10) {
      return 'strike';
    } else if (this.framescore === 10) {
      return 'spare';
    };
  }

}

module.exports = Score;