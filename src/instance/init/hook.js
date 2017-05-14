/**
 * Created by WittBulter on 2017/5/14.
 * @description ::
 */
const destroy = function () {
  this.$lifecycle.beforeDestroy()
  this.$scope = Object.assign(this.$scope, {})
  for (let key in this.observe) {
    this.observe[key] = []
  }
  this.$lifecycle.destroyed()
}
const off = function (eventName, callback) {
  let fnd = false, removedListeners = []
  const hasCallback = callback && typeof callback === 'function'
  if (!this.$events.length === 0) {
    return
  }
  
  if (!eventName) {
    this.$events.forEach(v => v.node.removeEventListener(v.mode))
    return true
  }
  
  this.$events.forEach((event, i) => {
    if (eventName === event.mode && (hasCallback ? callback === event.handle : true)) {
      fnd = true
      event.node.removeEventListener(eventName, event.handle)
      removedListeners.push(i)
    }
  })
  
  if (fnd) {
    removedListeners.forEach(v => this.$events.splice(v, 1))
  }
  return fnd
}


const install = (instance) => {
  instance.$nameSpace.$destroy = destroy.bind(instance)
  instance.$nameSpace.$off = off.bind(instance)
}


export default {
  install,
}