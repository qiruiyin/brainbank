// 字典
import Vue from 'vue'
import headerBtns from './header-btns.js';
import nav from './nav.js';
import visitRouter from './visit-router.js';

Vue.prototype.wordBook = {
	headerBtns: headerBtns, // 已废弃
	nav: nav,
	visitRouter: visitRouter,
	pageCount: 10, // 分页条数
	tabChangeW: 160, // tab+swiper切换滚动多少距离切换，
	bannerWidthHeight: 600/1500, // banner图片宽高比
	urlLink: {
		img: 'http://r.yoao.com/',  // 图片域名地址拼接
		richText: 'http://r.yoao.com/', // 富文本内图片域名地址拼接
		file: 'http://r.yoao.com/', // 文件域名地址拼接
		share: 'http://m.yoao.com/' // 分享域名地址拼接
	}
	// orderType: {}
}