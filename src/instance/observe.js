/**
 * Created by WittBulter on 2017/5/14.
 * @description ::
 */
import Utils from '../utils/index'
import Logger from '../utils/logger'

export default class Observe {
  constructor() {
    this.$nameSpace = null
  }
  
  setNameSpace(nameSpace) {
    this.$nameSpace = nameSpace
  }
  
  addKey(key) {
    if (Utils.isInObject(key, this)) {
      return Logger.warn(`${key} is binding!`)
    }
    this[key] = {
      update: [],
    }
  }
  
  addUpdate(key, updateHandle) {
    if (Utils.isInObject(key, this)) {
      this[key].update.push(updateHandle)
    }
  }
  
  update(key) {
    if (!Utils.isInObject(key, this)) {
      return
    }
    const updateHandles = this[key].update
    let length = updateHandles.length
    while (length --) {
      updateHandles[length](this.$nameSpace)
    }
  }
  
}