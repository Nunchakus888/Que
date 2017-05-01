/**
 * Created by WittBulter on 2017/5/1.
 */

export default class Lifecycle {
  constructor(options, _this) {
    this.__que = _this
    ;({
      beforeCreate: this.$beforeCreate,
      created: this.$created,
      beforeMount: this.$beforeMount,
      mounted: this.$mounted,
      beforeUpdate: this.$beforeUpdate,
      updated: this.$updated,
      beforeDestroy: this.$beforeDestroy,
      destroyed: this.$destroyed,
    } = options)
  }
  
  beforeCreate() {
    return this.$beforeCreate.call(this.__que)
  }
  
  created() {
    return this.$created.call(this.__que)
  }
  
  beforeMount() {
    return this.$beforeMount.call(this.__que)
  }
  
  mounted() {
    return this.$mounted.call(this.__que)
  }
  
  beforeUpdate() {
    return this.$beforeUpdate.call(this.__que)
  }
  
  updated() {
    return this.$updated.call(this.__que)
  }
  
  beforeDestroy() {
    return this.$beforeDestroy.call(this.__que)
  }
  
  destroyed() {
    return this.$destroyed.call(this.__que)
  }
}