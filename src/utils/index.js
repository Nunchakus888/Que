/**
 * Created by WittBulter on 2017/4/25.
 */
export const utils = {
  isElementNode: node =>{
    return node&& node.nodeType == 1
  },
  isTextNode: node =>{
    return node&& node.nodeType == 3
  },
  legalAttribute: attr =>{
    return attr.includes('q-')|| attr.includes(':')|| attr.includes('on')
  },
  isEvent: str =>{
    return str&& str.includes('on')&& (!str.includes('q-'))
  },
  parseDirective: str =>{
    const shorthandKey = str.includes(':')
    if (shorthandKey){
      return str.split(':')[1]
    }
    return str.split('-')[1]
  },
  textReg: /\{\{(.*)\}\}/
}