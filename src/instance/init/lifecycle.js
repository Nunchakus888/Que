/**
 * Created by WittBulter on 2017/5/1.
 *
 */

const install = (instance) => {
  const options = instance.$options
  const nameSpace = instance.$nameSpace
  let lifecycle = {}
  ;({
    beforeCreate: lifecycle.beforeCreate,
    created: lifecycle.created,
    beforeMount: lifecycle.beforeMount,
    mounted: lifecycle.mounted,
    beforeUpdate: lifecycle.beforeUpdate,
    updated: lifecycle.updated,
    beforeDestroy: lifecycle.beforeDestroy,
    destroyed: lifecycle.destroyed,
  } = options)
  const keys = Object.keys(lifecycle)
  let length = keys.length
  let key
  while (length --) {
    key = keys[length]
    lifecycle[key] = lifecycle[key].bind(nameSpace)
  }
  return lifecycle
}


export default {
  install,
}