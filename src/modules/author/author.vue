<!-- 
	微信授权
 -->

<template>
	<div class="author">
		
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
			// alert(location.href);
			let _this = this,
					userCode = hold.storage.get('userCode') || this.$store.state.user.userCode,
					urlJson = _this.parseToJson(location.href),
					openId = hold.storage.get("openId");

			if(!openId && urlJson) {
				openId = urlJson.openId
			}
			// alert("url"+ location.href);
			// alert("urlJson" + urlJson);
			// alert("openId" + openId);
			// alert("userCode" + userCode)
			if(userCode){
				_this.login(openId, hold.storage.get('userCode'));
			} else if(!openId) {
	      // let ua = window.navigator.userAgent.toLowerCase()
	      // if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        // 跳转到微信授权页面
        _this.$http.post('/wechat/wx/access/generate',{}).then(function(e) {
	 				window.location.href = e.data.data.accessUrl
	  		});
	    } else {
	    	_this.getUserCode(openId)
				// _this.login(openId, hold.storage.get('user'));
	    }
		},
		methods: {
			parseToJson (url) {
				// alert(url)
				// alert(url.indexOf("?") != -1)
				// alert(url.)
				// alert(url != "")
				// alert(location.search != "")
				if(url != "" && url.indexOf("?") != -1){
				// alert(1)
					let	url_json = {};
					url = url.replace("#/author", "");
				// alert(url)
					url = url.split("?");
				// alert(url)
					url = url[1].split('&');
				// alert(url)
					for (let i = 0; i<url.length ; i++) {
				    let str = url[i].split('=');
				    url_json[str[0]]=str[1];
					}
				// alert(url_json)
				// alert(JSON.stringify(url_json))
					// url_json = JSON.stringify(url_json);
					return url_json;
				} else {
					return "";
				}
			},
			getUserCode (openId) {
				let _this = this;
				_this.$http.post('/wechat/discover/usercode/get',
		  			{
		  				"openId": openId
		  			}
		  		).then(function(e) {
		  			_this.login(openId, e.data.data.userCode);
		  	});
			},
			login (openId, code) {
				let _this = this;

  			hold.storage.set("openId", openId);
				hold.storage.set("userCode", code);
				_this.$store.commit("updateUserUserCode", { userCode: code });
				_this.$store.commit("updateUserOpenId", { openId: openId });

				if(code) {
  				_this.$store.commit('updateUserBangdingStatus', {bangdingStatus: true});
				}

				// alert("storageOpenID: " + hold.storage.get("openId"));
				// alert("storageUserCode: " + hold.storage.get("userCode"));
				// alert("storeOpenId: " + _this.$store.state.user.openId);
				// alert("storeUserCode: " + _this.$store.state.user.userCode);

				_this.$http.post('/wechat/discover/userinfo/get',
		  			{
		  				"userCode": code,
		  				"openId": openId
		  			}
		  		).then(function(e) {
		  			let responseData = e.data.data,
		  					headerUrl;
		  			if(responseData.headerUrl.substr(0, 4) == "http") {
		  				headerUrl = responseData.headerUrl;
		  			} else {
		  				headerUrl = _this.resolveImg(responseData.headerUrl) ;
		  			}

		  			_this.$store.commit('updateUserImg', {img: headerUrl});
		  			_this.$store.commit('updateUserName', {name: responseData.name ? responseData.name : '游客'})

		  			if(responseData.userLevelMap) {
		  				if( responseData.userLevelMap.categoryLevel == 1 ) {
		  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[1].btns})
			  			} else if ( responseData.userLevelMap.categoryLevel == 2 ) {
		  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[2].btns})
			  			} else if ( responseData.userLevelMap.categoryLevel > 2 ) {
		  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[3].btns})
			  			}
		  				_this.$store.commit('updateUserCourse', {course: responseData.userLevelMap.categoryName})
		  			} else {
	  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns[0].btns})
		  				_this.$store.commit('updateUserCourse', {course: _this.wordBook.headerBtns[0].course})
		  			}

		  			_this.$router.push({name: "index"})
	  		});
	    }
		}
	}
</script>