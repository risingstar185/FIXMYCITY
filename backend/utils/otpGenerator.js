// otpGenerator.js
import * as math from "mathjs";

export function generateOTP() {
  return math.randomInt(100000, 999999);
}
