/**
 * Created by WittBulter on 2017/4/24.
 */
import {config} from '../constant/config'
import Parse from '../compiler/index'
import {ovserver} from './observer'


export default class Que {
  constructor (options){
    this.options = Object.assign(config, options)
    
    // watcher
    this.$watcher = []
    
    // 需要观察的对象
    this.options.data = this.$scope = ovserver(options.data, this.$handle, this)
    new Parse(this.options.el, {
      watcher: this.$watcher,
      scope: this.$scope,
      method: this.options.method,
      handle: this.options
    })
    
    // 生命周期
    this.options.created()
  }
  $handle (key, _this){
    const item = _this.$watcher.find(v => v.key === key)
    const newValue = _this.$scope[key]
    if (item && item.value !== newValue){
      item.value = newValue
      item.update(newValue)
    }
  }
}