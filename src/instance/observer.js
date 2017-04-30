/**
 * Created by WittBulter on 2017/4/26.
 */

export const observer = (model = {}, handle, _this) => {
  return new Proxy(model, {
    get: function (target, key, receiver) {
      // todo
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      if (window["Promise"]){
        Promise.resolve()
          .then(() => {
            handle(key, _this)
          })
      } else{
        setTimeout(() => {
          handle(key, _this)
        }, 0)
      }
      
      return Reflect.set(target, key, value, receiver)
    },
  })
}

