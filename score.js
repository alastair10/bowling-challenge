class Score {

  constructor (r1, r2, framescore) {
    this.r1 = 0;
    this.r2 = 0;
    this.framescore = 0;
  }

  // returns the frame score
  frameScore(r1, r2) {
    this.r1 = r1;
    this.r2 = r2;
    this.framescore = (r1+r2);
    return this.framescore;
  }

  // determins whether a user has hit a strike or spare
  strikeOrSpare() {
    if (this.r1 === 10) {
      return 'strike';
    } else if (this.framescore === 10) {
      return 'spare';
    };
  }





}

module.exports = Score;