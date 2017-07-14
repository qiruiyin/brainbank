import Vue from 'vue'
// 图片链接拼接
Vue.prototype.resolveImg =  function(img) {
	let imgUrl = 'http://192.168.1.170:8080/csm/';
	if(!img) {
		return img
	} else {
		return imgUrl + img.replace(/\\/g, '/');
	}
}
// 处理首页通用的字段转换
Vue.prototype.resolveField =  function (_this, $obj, datas, img) {
	// 获取banner数据并处理
	let arr = [];

	datas.map((item, i) => {
		arr[i] = {
			img: _this.resolveImg(item[img]),
			link: item.ad_link,
			name: item.name,
			desc: item.description,
			price: item.price
		}
	})

	_this[$obj] = arr;
}