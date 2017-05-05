/**
 * Created by WittBulter on 2017/5/6.
 */

export const currecy = (input, currecySymbol) => {
  const currecySymbol = currecySymbol || '￥'
  return currecySymbol + Number.parseFloat(input, 10).toFixed(2)
}