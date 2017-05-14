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
  
  // todo
  // 深层对象的绑定需要优化
  model(node, key) {
    let model = key
    let internalScope = this._scope
    let isObjectBinding = false
    let keys = []
    // 对象绑定
    if (key.includes('.')) {
      isObjectBinding = true
      keys = key.split('.')
      model = keys[0]
      for (let i = 0; i < keys.length - 1; i ++) {
        internalScope = internalScope[keys[i]]
      }
    }
    if (!this._scope[model]) {
      return Logger.err(`模板中使用的\'${templateKey}\'变量未在'data'中定义`)
    }
    node.addEventListener('input', e => {
      const newValue = e.target.value
      if (isObjectBinding) {
        internalScope[keys[keys.length - 1]] = newValue
      }else{
        if (this._scope[key] === newValue) return
        this._scope[key] = newValue
      }
      
    })
  }
  
  text(node, key) {
    const { value, update } = exp(key)
    const updateNode = function (scope) {
      node.textContent = update(scope)
    }
    
    for (let index = 0; index < value.length; index++) {
      const { self, key, parent } = value[index]
      if (self && !this._observe[key]) {
        return Logger.err(`模板中使用的\'${key}\'变量未在'data'中定义`)
      }
      // 添加更新方法
      this._observe.addUpdate({ self, parent, key }, updateNode)
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