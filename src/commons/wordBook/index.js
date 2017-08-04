// 字典
import Vue from 'vue'
import headerBtns from './header-btns.js';
import nav from './nav.js';

Vue.prototype.wordBook = {
	headerBtns: headerBtns,
	nav: nav,
	pageCount: 10
	// orderType: {}
}