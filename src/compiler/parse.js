/**
 * Created by WittBulter on 2017/4/24.
 */
import Utils from '../utils/index'

export default class Parse {
  constructor(el, bindFn, mounted) {
    this._bind = bindFn
    this._mounted = mounted
    this.create(el)
  }
  
  static init(...args) {
    return new Parse(...args)
  }
  
  create(elementString) {
    const el = document.querySelector(elementString)
    const createFragment = el => {
      let fragment = document.createDocumentFragment()
      let nextChild
      while (nextChild = el.firstChild) {
        fragment.appendChild(nextChild)
      }
      return fragment
    }
    const $fragment = createFragment(el)
    // 解析拷贝的$fragment
    this.element($fragment)
    el.appendChild($fragment)
    this._mounted(el)
  }
  
  
  element(el) {
    ;[...el.childNodes].forEach(node => {
      // 直接绑定文本
      if (Utils.isTextNode(node) && Utils.textReg.test(node.textContent)) {
        const str = Utils.textReg.exec(node.textContent)[1]
        
        this._bind.text(node, str)
      }
      if (Utils.isElementNode(node)) {
        this.attr(node)
      }
      // 仍旧存在子元素 继续解析
      if (node.childNodes && node.childNodes.length) {
        this.element(node)
      }
    })
  }
  
  attr(node) {
    ;[...node.attributes].forEach(attr => {
      // 自定义指令
      if (Utils.legalAttribute(attr.name)) {
        const key = attr.value
        const name = attr.name
        const directive = Utils.parseDirective(attr.name)
        // 事件指令
        if (Utils.isEvent(name)) {
          this.event(node, key, directive)
        } else {
          this.directive(node, key, directive)
        }
        node.removeAttribute(attr.name)
      }
    })
    
  }
  
  // 事件绑定
  event(node, key, bindingMode) {
    this._bind.event(node, key, bindingMode)
  }
  
  // 内置指令
  directive(node, key, bindingMode) {
    if (this._bind[bindingMode] && typeof this._bind[bindingMode] === 'function') {
      this._bind[bindingMode](node, key)
    }
  }
}

