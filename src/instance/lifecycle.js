/**
 * Created by WittBulter on 2017/5/1.
 */

export default class Lifecycle {
  constructor(options, nameSpace) {
    this.nameSpace = nameSpace
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
    return this.$beforeCreate.call(this.nameSpace)
  }
  
  created() {
    return this.$created.call(this.nameSpace)
  }
  
  beforeMount() {
    return this.$beforeMount.call(this.nameSpace)
  }
  
  mounted() {
    return this.$mounted.call(this.nameSpace)
  }
  
  beforeUpdate() {
    return this.$beforeUpdate.call(this.nameSpace)
  }
  
  updated() {
    return this.$updated.call(this.nameSpace)
  }
  
  beforeDestroy() {
    return this.$beforeDestroy.call(this.nameSpace)
  }
  
  destroyed() {
    return this.$destroyed.call(this.nameSpace)
  }
}