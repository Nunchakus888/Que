/**
 * Created by WittBulter on 2017/2/6.
 */
import Que from './instance/index'

(function(){
	if (window){
		window.Que = Que;
	}
	if (typeof module === "object") return module.exports = Que;
	if (typeof define === "function" && define.amd ) define('Que',[], () => Que);
})()
