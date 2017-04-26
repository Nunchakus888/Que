/**
 * Created by WittBulter on 2017/4/26.
 */

export const ovserver = (model = {}, handle, _this) =>{
  return new Proxy(model, {
    get: function(target, key, receiver){
      console.log('get');
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver){
      console.log('set');
      setTimeout(() =>{
        handle(key, _this)
      }, 0)
      return Reflect.set(target, key, value, receiver)
    }
  })
}

