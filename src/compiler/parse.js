/**
 * Created by WittBulter on 2017/4/24.
 */
import {utils} from "../utils/index"

export default class Parse {
  constructor (elementString, bind){
    this.$bind = bind
    this.init(elementString)
  }
  
  init(elementString) {
    const el = document.querySelector(elementString)
    const createFragment = el => {
      let fragment = document.createDocumentFragment()
      let nextChild
      while (nextChild = el.firstChild){
        fragment.appendChild(nextChild)
      }
      return fragment
    }
    const $fragment = createFragment(el)
    // 解析拷贝的$fragment
    this.element($fragment)
    el.appendChild($fragment)
    
  }
  
  element(el) {
    ;[...el.childNodes].forEach(node => {
      // 直接绑定文本
      if (utils.isTextNode(node) && utils.textReg.test(node.textContent)){
        const str = utils.textReg.exec(node.textContent)[1]
        
        this.$bind.text(node, str)
      }
      if (utils.isElementNode(node)){
        this.attr(node)
      }
      // 仍旧存在子元素 继续解析
      if (node.childNodes && node.childNodes.length){
        this.element(node)
      }
    });
  }
  
  attr(node) {
    ;[...node.attributes].forEach(attr => {
      // 自定义指令
      if (utils.legalAttribute(attr.name)){
        const key = attr.value
        const name = attr.name
        const directive = utils.parseDirective(attr.name)
        // 事件指令
        if (utils.isEvent(name)){
          this.event(node, key, directive)
        } else{
          this.directive(node, key, directive)
        }
        node.removeAttribute(attr.name)
      }
    })
    
  }
  
  // 事件绑定
  event(node, key, bindingMode) {
    this.$bind.event(node, key, bindingMode)
  }
  
  // 内置指令
  directive(node, key, bindingMode) {
    if (this.$bind[bindingMode]&& typeof this.$bind[bindingMode] === 'function'){
      this.$bind[bindingMode](node, key)
    }
  }
}

