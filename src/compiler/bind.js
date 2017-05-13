/**
 * Created by WittBulter on 2017/4/26.
 */
import Logger from '../utils/logger'
import { exp } from './exp'

export default class Bind {
  constructor({ methods, scope, observe, events }) {
    this._methods = methods
    this._scope = scope
    this._observe = observe
    this._events = events
  }
  
  model(node, key) {
    if (!this._scope[key]) {
      return Logger.err(`模板中使用的\'${templateKey}\'变量未在'data'中定义`)
    }
    node.addEventListener('input', e => {
      const newValue = e.target.value
      if (this._scope[key] === newValue) return
      this._scope[key] = newValue
    })
  }
  
  text(node, key) {
    const { value, update } = exp(key)
    const updateNode = function (scope) {
      node.textContent = update(scope)
    }
    
    for (let index = 0; index < value.length; index++) {
      const templateKey = value[index]
      if (!this._observe[templateKey]) {
        return Logger.err(`模板中使用的\'${templateKey}\'变量未在'data'中定义`)
      }
      // 添加更新方法
      this._observe.addUpdate(templateKey, updateNode)
      // 绑定即更新第一次
      updateNode(this._scope)
    }
  }
  
  event(node, key, bindingMode) {
    if (!this._methods[key]) {
      return Logger.err(`method中未定义模板中出现的\'${key}\'方法`)
    }
    const handle = this._methods[key].bind(this._scope)
    node.addEventListener(bindingMode, handle)
    this._events.push({
      mode: bindingMode,
      node: node,
      handle: handle,
    })
  }
  
}