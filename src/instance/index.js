/**
 * Created by WittBulter on 2017/4/24.
 */
import {config} from '../constant/config'
import {bind} from '../compiler/bind'
import {observer} from './observer'

import Event from './event'
import Parse from '../compiler/parse'
import Lifecycle from './lifecycle'

export default class Que {
  constructor(options) {
    this.$options = Object.assign(config, options)
    
    this.$$lifecycle = new Lifecycle(this.$options, this)
    this.$$lifecycle.beforeCreate()
    
    this.$scope = observer(this.$options.data(), this.$handle, this)
    
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
    new Event(this)
  }
  
  $handle(key, _this) {
    _this.$$lifecycle.beforeUpdate()
    const modelValue = _this.$watcher[key]
    for (let index = 0; index < modelValue.length; index ++){
      modelValue[index].updateNode(_this.$scope)
    }
    _this.$$lifecycle.updated()
  }
  
  $destroy() {
    this.$$lifecycle.beforeDestroy()
    this.$scope = Object.assign(this.$scope, {})
    for (let key in this.$scope){
      this.$watcher[key] = []
    }
    this.$$lifecycle.destroyed()
  }
  
}
