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

const depth = (record, observe, parent) => {
  const keys = Object.keys(record)
  let length = keys.length
  let current
  while (length--) {
    current = keys[length]
    if (Utils.isObject(record[current])) {
      record[current].__parent__ = parent ? `${parent}.${current}` : current
      record[current] = depth(record[current], observe, record[current].__parent__)
    }
  }
  const proxyInstance = proxy(record, (key, parent) => {
    observe.update(key, parent)
  })
  

  return Object.create(proxyInstance)
}

const install = (instance) => {
  const data = instance.$options.data
  const observe = instance.$observe
  const initData = check(data)
  
  const processed = depth(initData, observe, null)
  for (let key in initData) {
    observe.addKey(key)
  }
  const proxyInstance = proxy(processed, (key, parent) => {
    observe.update(key, parent)
  })
  // const proxyInstance = proxy(initData, updateKey => {
  //   observe.update(updateKey)
  // })
  return Object.create(proxyInstance)
}

export default {
  install,
}