/**
 * Created by WittBulter on 2017/4/24.
 */
import {config} from "../constant/config"
import {observer} from "./observer"
import Parse from "../compiler/parse"
import {bind} from '../compiler/bind'


export default class Que {
  constructor(options) {
    this.$options = Object.assign(config, options);
    this.$method = this.$options.method
    this.$data = {};
    for (let key in this.$options.data){
      this.$data[key] = this.$options.data[key];
    }
    const {beforeCreate, created, beforeMount, mounted, update, beforeDestroy, destroyed} = this.$options;
    
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
    
    this.$scope = observer(this.$data, this.$handle, this);
  
    this.$watcher = {}
    for (let key in this.$scope){
      this.$watcher[key] = []
    }
    
    new Parse(this.$options.el, bind.call(this))
    
    
    // 生命周期
    // todo
    created.call(this);
  }
  
  $handle(key, _this) {
    const modelValue = _this.$watcher[key]
    for (let index = 0; index < modelValue.length; index ++){
      modelValue[index].updateNode(_this.$scope)
    }
  }
  
}
