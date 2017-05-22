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
      self: true,
      
    }
  }
  
  addUpdate(watchObject, updateHandle) {
    const { self, parent, key } = watchObject
    if (Utils.isInObject(key, this)) {
      const existent = this[key].update.find(v => v === updateHandle)
      if (!existent) {
        this[key].self = self
        this[key].parent = parent
        this[key].update.push(updateHandle)
      }
    }
  }
  
  update(key, parent) {
    if (parent) {
      // 取到了父级对象
      // 未绑定父级对象
      // todo
    }
    // console.log(key)
    return ;
    if (!Utils.isInObject(key, this)) {
      
      return
    }
    if (!this[key].self) {
      const next = this[key].parent
      console.log(1)
      return this.update(next)
    }
    const updateHandles = this[key].update
    let length = updateHandles.length
    while (length --) {
      updateHandles[length](this.$nameSpace)
    }
  }
  
}