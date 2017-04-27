/**
 * Created by WittBulter on 2017/4/26.
 */
import {help} from '../utils/help'

export default class Bind {
  constructor({watcher, scope, method, handle}) {
    this.$watcher = watcher
    this.$scope = scope
    this.$method = method
    this.$handle = handle
  }
  
  model(node, key) {
    const hasWatcher = this.$watcher.find(v => v.key === key);
    const addHandle = () => {
      node.addEventListener("input", e => {
        const newValue = e.target.value;
        const watch = this.$watcher.find(v => v.key === key);
        if (watch && watch.value === newValue) return;
        this.$scope[key] = newValue;
      });
    };
    if (!hasWatcher){
      const watch = {
        node: undefined,
        value: "",
        key: key,
        update: (value) => {},
      };
      this.$watcher.push(watch);
      node.value = this.$scope[key];
      addHandle();
      return;
    }
    this.$watcher.forEach(v => {
      if (v.key === key){
        node.value = v.value;
        addHandle(v.value);
      }
    });
  }
  
  text(node, key) {
    const hasWatcher = this.$watcher.find(v => v.key === key);
    if (this.$scope[key]){
      node.textContent = this.$scope[key];
    }
    if (!hasWatcher){
      return this.$watcher.push({
        node: node,
        value: "",
        key: key,
        update: (value) => {
          node.textContent = value;
        },
      });
    }
    const item = this.$watcher.find(v => v.key === key);
    if (item){
      item.node = node;
      item.update = (value) => {
        node.textContent = value;
      };
    }
  }
  
  event(node, key, bindingMode) {
    if (!this.$method[key]){
      return help.err(`method中未定义模板中出现的\'${key}\'方法`);
    }
    node.addEventListener(bindingMode, event =>{
      this.$method[key].call(this.$handle, event)
    })
  }
}