/**
 * Created by WittBulter on 2017/5/6.
 */
const limitTo = (input, index) => {
  const length = input.length
  let index = Math.abs(index) > input.length ? 0 : index
  index = index < 0 ? length + index : index - (index === 0 ? 0 : 1)
  return input[index]
}