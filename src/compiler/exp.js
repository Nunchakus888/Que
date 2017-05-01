/**
 * Created by WittBulter on 2017/4/29.
 */
import {charCode} from '../constant/charCode'

export const exp = (expString) => {
  const PLACEHOLDER = '__Q-U-E'
  let str = expString.replace(/\s/g, '')
  let watchKey = []
  let notes = {
    includesObject: 0,
    includesArray: 0,
    includesString: 0,
    includesConditional: 0,
    firstIsString: false,
  }
  let chr = '', resultString = str, resultExp
  for (let index = 0; index < str.length; index ++){
    const code = str.charCodeAt(index)
    switch (code){
      case charCode['\'']:
        if (index === 0){
          notes.firstIsString = true
        }
        if (notes.includesString){
          notes.includesString --
        } else{
          notes.includesString ++
          if (addToWatchKey(watchKey, chr)){
            resultString = resultString.replace(chr, PLACEHOLDER)
          }
          chr = ''
        }
        break
      case charCode['.']:
        notes.includesObject ++
        if (addToWatchKey(watchKey, chr)){
          resultString = resultString.replace(chr, PLACEHOLDER)
        }
        chr = ''
        break
      case charCode['[']:
        notes.includesArray ++
        if (addToWatchKey(watchKey, chr)){
          resultString = resultString.replace(chr, PLACEHOLDER)
        }
        chr = ''
        break
      case charCode[']']:
        notes.includesArray --
        chr = ''
        break
      default:
        if (hasOperator(code) || hasConditional(code)){
          if (hasConditional(code)){
            notes.includesConditional ++
          }
          if (addToWatchKey(watchKey, chr)){
            resultString = resultString.replace(chr, PLACEHOLDER)
          }
          chr = ''
          break
        }
        if (! notes.includesString && ! notes.includesArray){
          chr += str[index]
        }
        // 最后一位非符号
        if (str.length - 1 === index){
          if (addToWatchKey(watchKey, chr)){
            resultString = resultString.replace(chr, PLACEHOLDER)
          }
          chr = ''
        }
    }
  }
  
  for (let i = 0; i < watchKey.length; i ++){
    resultString = resultString.replace(PLACEHOLDER, `\`\$\{${'scope.' + watchKey[i]}\}\``)
  }
  
  if (notes.includesConditional > 0){
    resultString = includesConditional(resultString)
  }
  
  return {
    value: watchKey,
    update: eval.call(null, '(scope) => (' + resultString + ')'),
  }
}

const addToWatchKey = (target, value) => {
  if (value){
    target.push(value)
    return true
  }
  return false
}

const hasOperator = c => {
  if (! c){
    return false
  }
  if (charCode['+'] === c
    || charCode['-'] === c
    || charCode['*'] === c
    || charCode['/'] === c
    || charCode['?'] === c
    || charCode[':'] === c
    || charCode['('] === c
    || charCode[')'] === c
  ){
    return true
  }
  return false
}

const hasConditional = c => {
  if (charCode['?'] === c || charCode[':'] === c){
    return true
  }
  return false
}

const includesConditional = resultString => {
  let arr = resultString.split('?')
  for (let i = 0; i < arr.length; i ++){
    if (i !== arr.length - 1){
      arr[i] = `eval(${arr[i]})?`
    }
  }
  return arr.join('')
}