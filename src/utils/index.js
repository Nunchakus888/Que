/**
 * Created by WittBulter on 2017/4/25.
 */
const check = {
  isElementNode: node => {
    return node && node.nodeType == 1
  },
  isTextNode: node => {
    return node && node.nodeType == 3
  },
  legalAttribute: attr => {
    return attr.includes('q-') || attr.includes(':') || attr.includes('on')
  },
  
  isEvent: str => {
    return str && str.includes('on') && (!str.includes('q-'))
  },
  isObject: str => {
    return Object(str) === str
  },
  isFunction: str => {
    return Object.prototype.toString.call(str) === '[object Function]'
      || typeof value === 'function'
  },
}

export default {
  isElementNode: check.isElementNode,
  isTextNode: check.isTextNode,
  legalAttribute: check.legalAttribute,
  
  isEvent: check.isEvent,
  isObject: check.isObject,
  isFunction: check.isFunction,
  
  isInObject: (value, obj) => {
    if (!check.isObject(obj)) return false
    return typeof obj[value] !== undefined && obj[value] !== undefined
  },
  
  parseDirective: str => {
    const shorthandKey = str.includes(':')
    if (shorthandKey) {
      return str.split(':')[1]
    }
    return str.split('-')[1]
  },
  textReg: /\{\{(.*)\}\}/,
}