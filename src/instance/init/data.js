/**
 * Created by WittBulter on 2017/5/14.
 * @description ::
 */
import Logger from '../../utils/logger'
import Utils from '../../utils/index'
import { proxy } from '../proxy'

const check = (data) => {
  if (!Utils.isFunction(data)) {
    return Logger.err('data must be a Function')
  }
  
  const initData = data()
  if (!Utils.isObject(initData)) {
    return Logger.err('data require return object')
  }
  
  return initData
}

const depth = (record, observe) => {
  const keys = Object.keys(record)
  let length = keys.length
  let current
  while (length--) {
    current = keys[length]
    if (Utils.isObject(record[current])) {
      record[current] = depth(record[current], observe)
    }
  }
  const proxyInstance = proxy(record, updateKey => {
    observe.update(updateKey)
  })
  return Object.create(proxyInstance)
}

const install = (instance) => {
  const data = instance.$options.data
  const observe = instance.$observe
  const initData = check(data)
  
  const processed = depth(initData, observe)
  for (let key in initData) {
    observe.addKey(key)
  }
  const proxyInstance = proxy(processed, (key) => {
    observe.update(key)
  })
  return Object.create(proxyInstance)
}

export default {
  install,
}