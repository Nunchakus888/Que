/**
 * Created by WittBulter on 2017/5/14.
 * @description ::
 */
import Logger from '../../utils/logger'
import Utils from '../../utils/index'
import { proxy } from '../proxy'

export default {
  install: (data, observe) => {
    if (!Utils.isFunction(data)) {
      return Logger.err('data must be a Function')
    }
    
    const initData = data()
    if (!Utils.isObject(initData)) {
      return Logger.err('data require return object')
    }
    
    // const keys = Object.keys(initData)
    // let length = keys.length
    // let thisKey = keys[length]
    
    // while (length--) {
    //   thisKey = keys[length]
    // }
    
    for (let key in initData) {
      observe.addKey(key)
    }
    const proxyInstance = proxy(initData, (key) => {
      observe.update(key)
    })
    return Object.create(proxyInstance)
  },
}