import Vue from 'vue'
import headerBtns from './header-btns';
import nav from './nav';

Vue.prototype.wordBook = {
	headerBtns: headerBtns,
	nav: nav,
	pageCount: 10
	// orderType: {}
}