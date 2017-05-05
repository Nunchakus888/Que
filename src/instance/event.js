/**
 * Created by WittBulter on 2017/5/5.
 */

export default class Event {
  constructor(_instance) {
    this._instance = _instance
  }
  
  $off(eventName, callback) {
    let fnd = false, removedListeners = []
    const hasCallback = callback && typeof callback === 'function'
    if (!this._instance.$$events.length === 0) {
      return
    }
    
    if (!eventName) {
      this._instance.$$events.forEach(v => v.node.removeEventListener(v.mode))
      return true
    }
    
    this._instance.$$events.forEach((event, i) => {
      if (eventName === event.mode && (hasCallback ? callback === event.handle : true)) {
        fnd = true
        event.node.removeEventListener(eventName, event.handle)
        removedListeners.push(i)
      }
    })
    
    if (fnd) {
      removedListeners.forEach(v => this._instance.$$events.splice(v, 1))
    }
    return fnd
  }
}