/**
 * Created by WittBulter on 2017/4/24.
 */
import {config} from '../constant/config'
import {bind} from '../compiler/bind'
import Parse from '../compiler/parse'

import {observer} from './observer'
import Lifecycle from './lifecycle'

export default class Que {
  constructor(options) {
    this.$options = Object.assign(config, options)
    
    // 生命周期
    this.$$lifecycle = new Lifecycle(this.$options, this)
    this.$$lifecycle.beforeCreate()
    
    // 需要观察的对象
    // const setProxy = (data, $handle, _this) =>{
    //   const keys = Object.keys(data)
    //   let i = keys.length
    //   while (i --){
    //     if (typeof data[keys[i]] === 'object'){
    //       data[keys[i]] = setProxy(data[keys[i]], $handle, _this)
    //     }
    //   }
    //   return observer(data, $handle, _this)
    // }
    
    this.$scope = observer(this.$options.data, this.$handle, this)
    
    this.$$events = []
    this.$watcher = {}
    for (let key in this.$scope){
      this.$watcher[key] = []
    }
    
    this.$$lifecycle.created()
    this.$$lifecycle.beforeMount()
    Parse.init(this.$options.el, bind.call(this), el => {
      this.$el = el
      this.$$lifecycle.mounted()
    })
  }
  
  $handle(key, _this) {
    this.$$lifecycle.beforeUpdate()
    const modelValue = _this.$watcher[key]
    for (let index = 0; index < modelValue.length; index ++){
      modelValue[index].updateNode(_this.$scope)
    }
    this.$$lifecycle.updated()
  }
  
  $destroy() {
    this.$$lifecycle.beforeDestroy()
    this.$scope = Object.assign(this.$scope, {})
    for (let key in this.$scope){
      this.$watcher[key] = []
    }
    this.$$lifecycle.destroyed()
  }
  
  $off(eventName, callback) {
    let fnd = false, removedListeners = []
    const hasCallback = callback && typeof callback === 'function'
    if (! this.$$events.length === 0){
      return
    }
    
    if (! eventName){
      this.$$events.forEach(v => v.node.removeEventListener(v.mode))
      return true
    }
  
    this.$$events.forEach((event, i) => {
      if (eventName === event.mode  && (hasCallback? callback === event.handle: true)){
        fnd = true
        event.node.removeEventListener(eventName, event.handle)
        removedListeners.push(i)
      }
    })
    
    if (fnd){
      removedListeners.forEach(v => this.$$events.splice(v, 1))
    }
    return fnd
  }
  
  
  
  
}
