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
			// alert("url"+ location.href);
			let _this = this,
					userCode = hold.storage.get('userCode'),
					urlJson = _this.parseToJson(location.href),
					openId = hold.storage.get("openId");

			if(!openId && urlJson) {
				openId = urlJson.openId
			}
			// alert("url"+ location.href);
			// alert("urlJson" + urlJson);
			// alert("href" + location.href + "urlJson" + urlJson.openId + "openId" + userCode + "user" + openId);
			// alert("userCode" + userCode)
			if(userCode && userCode != "undefined" && userCode != "") {
				_this.login(openId, hold.storage.get('userCode'));
			} else if(!openId) {
				// alert(1)
	      // let ua = window.navigator.userAgent.toLowerCase()
	      // if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        // 跳转到微信授权页面
        _this.$http.post('/wechat/wx/access/generate',{}).then(function(e) {
        	// alert("111")
        	// alert(e.data.data.accessUrl);
	 				window.location.href = e.data.data.accessUrl
	  		});
	    } else {
				// alert(2)
	    	_this.getUserCode(openId)
				// _this.login(openId, hold.storage.get('user'));
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
		  					headerUrl = _this.resolveImg(responseData.headerUrl) ;

		  			_this.$store.commit('updateUserImg', {img: headerUrl});
		  			_this.$store.commit('updateUserName', {name: responseData.name ? responseData.name : '游客'})

		  			if(responseData.userLevelMap) {
	  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns["level"+responseData.userLevelMap.categoryLevel].btns})
		  				_this.$store.commit('updateUserCourse', {course: responseData.userLevelMap.categoryName})
		  			} else {
	  					_this.$store.commit('updateUserBtns', {btns: _this.wordBook.headerBtns.level1.btns})
		  				_this.$store.commit('updateUserCourse', {course: _this.wordBook.headerBtns.level1.course})
		  			}

		  			_this.$router.push({name: "index"})
	  		});
	    }
		}
	}
</script>