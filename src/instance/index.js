/**
 * Created by WittBulter on 2017/4/24.
 */
import { config } from '../constant/config'
import * as Init from './init'
import Bind from '../compiler/bind'
import Observe from './observe'
import Parse from '../compiler/parse'

class Que {
  constructor(options) {
    this.$options = Object.assign(config, options)
    this.$observe = new Observe()
    
    // 绑定数据 生成新的命名空间
    this.$nameSpace = Init.data.install(this)
    this.$lifecycle = Init.lifecycle.install(this)
    this.$lifecycle.beforeCreate()
    
    // 设置命名空间 每次更新data后都应当手动设置一次
    this.$observe.setNameSpace(this.$nameSpace)
    this.$events = []
    this.$lifecycle.created()
    
    const bindFn = new Bind({
      methods: this.$options.method,
      scope: this.$nameSpace,
      observe: this.$observe,
      events: this.$events,
    })
    this.$lifecycle.beforeMount()
    Parse.init(this.$options.el, bindFn, (el) => {
      this.$nameSpace.$el = el
      this.$lifecycle.mounted()
    })
  
    Init.hook.install(this)
  }
}


export default Que
