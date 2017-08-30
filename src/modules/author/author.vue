<!-- 
	微信授权
 -->

<template>
	<div class="author" v-cloak>
		
	</div>
</template>

<script type="text/babel">
	import hold from 'src/commons/hold'
	
	export default {
		name: 'author',
		data () {
			return {

			}
		},
		mounted () {
			let _this = this,
					urlJson = _this.parseToJson(location.href),
					openId = "",
					paramP = "";

			if(urlJson) {
				openId = urlJson.openId;
				paramP = urlJson.p;
			}

			if(!openId) {
        // 跳转到微信授权页面
        _this.$http.post('/wechat/wx/access/generate',{
        		p: paramP
        	}).then(function(e) {
	 				window.location.href = e.data.data.accessUrl
	  		});
	    } else {
	    	_this.getUserCode(openId, {name: 'index'});
	    }
		},
		methods: {
			parseToJson (url) {
				if(url != "" && url.indexOf("?") != -1){
					let	url_json = {};
					url = url.replace("#/author", "");
					url = url.split("?");
					url = url[1].split('&');
					for (let i = 0; i<url.length ; i++) {
				    let str = url[i].split('=');
				    url_json[str[0]]=str[1];
					}
					return url_json;
				} else {
					return "";
				}
			}
		}
	}
</script>