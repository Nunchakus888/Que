/**
 * Created by WittBulter on 2017/4/26.
 */


export default {
  err: str =>{
    throw str
  },
  warn: str => {
    return console.warn(str)
  },
  log: str => {
    return console.log(str)
  },
  time: str => {
    return console.time(str)
  },
  timeEnd: str => {
    return console.timeEnd(str)
  }
}