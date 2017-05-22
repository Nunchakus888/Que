/**
 * Created by WittBulter on 2017/4/26.
 */
import Utils from '../utils'

export const proxy = (model = {}, handle) => {
  return new Proxy(model, {
    get: function (target, key, receiver) {
      // todo
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      Utils.tick( handle(key, (target['__parent__'] ? target['__parent__'] : null)))
      // 如果key已被代理 优先修改代理
      // 目标对象可操作 默认会在目标对象操作
      if (target.hasOwnProperty(key)) {
        return Reflect.set(target, key, value)
      }
      return Reflect.set(target, key, value, receiver)
    },
  })
}

