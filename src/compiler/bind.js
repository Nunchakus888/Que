/**
 * Created by WittBulter on 2017/4/26.
 */
import {help} from '../utils/help'
import {exp} from './exp'

export function bind() {
  this.$method = this.$options.method
  
  return {
    model: (node, key) => {
      if (! this.$scope[key]){
        return help.err(`模板中使用的\'${templateKey}\'变量未在'data'中定义`)
      }
      node.addEventListener('input', e => {
        const newValue = e.target.value
        if (this.$scope[key] === newValue) return
        this.$scope[key] = newValue
      })
    },
    
    text: (node, key) => {
      const {value, update} = exp(key)
      const updateNode = function (scope) {
        node.textContent = update(scope)
      }
      
      for (let index = 0; index < value.length; index ++){
        const templateKey = value[index]
        if (! this.$watcher[templateKey]){
          return help.err(`模板中使用的\'${templateKey}\'变量未在'data'中定义`)
        }
        this.$watcher[templateKey].push({
          updateNode: updateNode,
        })
        updateNode(this.$scope)
      }
    },
    
    event: (node, key, bindingMode) => {
      if (! this.$method[key]){
        return help.err(`method中未定义模板中出现的\'${key}\'方法`)
      }
      const handle = this.$method[key].bind(this)
      node.addEventListener(bindingMode, handle)
      this.$$events.push({
        mode: bindingMode,
        node: node,
        handle: handle,
      })
    },
  }
  
  
}