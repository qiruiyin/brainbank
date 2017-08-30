<!-- 
	发布朋友圈
 -->

<template>
	<div class="add-quotation" v-cloak>
    <div class="add-quotation-content">
    	<x-textarea v-model="content" :height="160" placeholder="这一刻的想法..."></x-textarea>
    	
    	<div class="quotation-input">
				<el-priviewer-img @on-remove-img="removeImg" @click.native="showPriviewer(index)" v-for="(item, index) in imageFilePriviwer" :priviewer-data="item" :key="index"></el-priviewer-img>
      	<div v-transfer-dom>
		      <previewer :list="imageFile" ref="previewer"></previewer>
		    </div>
				
				<div class="input-file">				
					<input type="file" name="img" ref="inputer" @change="previewFile" multiple="multiple">
					<div class="input-file-icon">+</div>
				</div>
    	</div>
    </div>
    <div class="btn">    	
      <x-button type="primary" @click.native="submit">提交</x-button>
    </div>
	</div>
</template>

<script type="text/babel">
	import { XTextarea, XButton, TransferDom, Previewer } from 'vux'
  import { mapState } from 'vuex'
  import elPriviewerImg from 'components/quotation/img'

	export default {
		name: 'addQuotation',
		directives: {
	    TransferDom
	  },
		components: { XTextarea, XButton, Previewer, elPriviewerImg },
		data () {
			return {
				imageFilePriviwer: [],
				imageFile: [],
				content: "",
				onUploading: false,
				uploadAll: false
			}
		},
    computed: {
      ...mapState({
        loadbar: state => state.loadbar
      })
    },
		methods: {
			previewFile (val) {
				this.uploadImg(0);
			},
			submit () {
				let _this = this;
				if(!_this.loadbar.isLoading) {
					_this.submitAll();
				}
			},
			uploadImg (ind = 0) {
				let _this = this,
						formData = new FormData();
				if(ind >= _this.$refs.inputer.files.length) {
					_this.$store.commit('updateLoadingStatus', {isLoading: false})
					return false
				}
				formData.append('file', _this.$refs.inputer.files[ind]);
				_this.imgPreview(_this.$refs.inputer.files[ind]);						
				let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };

  			_this.$store.commit('updateLoadingStatus', {isLoading: true})

				this.$http.post('/wechat/quotationsmobile/addQuotations',
						formData,
						config
					).then(function(e) {
						if(e.data.errcode == 1) {
	        		_this.onUploading = false;
							_this.imageFile.push({
								src: _this.resolveImg(e.data.data.result[0])
							});
							_this.uploadImg(ind+1);
						} else {
							_this.$vux.alert.show({
								content: e.data.errmsg
							})
						}
					});
			},
			submitAll () {
				let _this = this,
						imageFile = "";

				if(_this.imageFile.length > 0) {
					_this.imageFile.map(function(item, index){
						if(index > 0) {
							imageFile += ";";
						}
						imageFile += item.data;
					})
				}
				this.$http.post('/wechat/quotationsmobile/save',
						{
							content: _this.content,
							imageFile: imageFile
						}
					).then(function(e) {
						_this.$vux.alert.show({
							content: e.data.errmsg
						})
					});
			},
			showPriviewer (index) {
	      this.$refs.previewer.show(index)
	    },
			imgPreview (file) {
        let self = this;
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        console.log(file);
        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            self.imageFilePriviwer.push({
            	style: {
								backgroundImage: "url(" + this.result + ")"
							},
							name: file.name
						});
          }
        }
      },
      removeImg () {
      	
      }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
	
	$quotationInputW: 60px;
	
	.add-quotation {
		width: 100%;
		height: 100%;
		background: $bgGray;
	}

	.add-quotation-content {
		background: #fff;
	}

	.quotation-input {
		@extend %clearfix;
		text-align: center;
		// padding: 0 $padding;
	}

	.input-file {
		float: left;
		@include halfpxline(0, $fontColorGray, 1px, 1px, 1px, 1px);
		width: $quotationInputW;
		height: $quotationInputW;
		margin: 0 $padding/2;
		margin-bottom: $padding;
		display: inline-block;
	
		input {
			width: 100%;
			height: 100%;
			opacity: 0;
		}

		.input-file-icon {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			line-height: .7;
			color: #ccc;
			font-size: 70px;
			z-index: -1;
		}
	}

	.btn {
		margin: 40px $padding;
	}
</style>
