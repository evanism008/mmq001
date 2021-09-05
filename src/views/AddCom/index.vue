<!--  -->
<template>
	<div style="padding-top:60px">
		<el-divider content-position="center"><h2 style="font-size:28px">添加评论</h2></el-divider>
		<div class="center">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="评论图片">
					<div class="upLoad">
						<el-upload
							class="avatar-uploader"
							action="/index/upload"
							ref="upload"
							:show-file-list="false"
							:on-change="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
							:auto-upload="false"
						>
							<img v-if="imageUrl" :src="imageUrl" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="评论内容">
					<div style="width: 600px;	height: 100px;	margin: 10px auto;">
						<el-input type="textarea" v-model="form.content" size="medium"></el-input>
					</div>
				</el-form-item>
				<el-form-item align="center" style="margin-top:100px">
					<el-button type="primary" @click="onSubmit">提交</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					content: "",
					imgs: "",
				},
				imageUrl: "",
			};
		},
		methods: {
			handleAvatarSuccess(file, fileList) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.form.imgs = file.name;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === "image/jpeg";
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error("上传图片只能是 JPG 格式!");
				}
				if (!isLt2M) {
					this.$message.error("上传图片大小不能超过 2MB!");
				}
				return isJPG && isLt2M;
			},
			onSubmit() {
				this.$http
					.post("http://localhost:8080/addCom", {
						cno: this.$route.query.cno,
						content: this.form.content,
						imgs: this.form.imgs,
						orderId: this.$route.query.orderId,
					})
					.then(res => {
						if (res.data.statusCode === 200) {
							this.$message.success(res.data.msg);
							window.history.go(-1);
						} else {
							this.$message.error(res.data.msg);
						}
					});
			},
		},
	};
</script>
<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #252222;
		border-radius: 6px;
		cursor: pointer;
		/* position: relative; */
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 48px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.center {
		width: 800px;
		height: 800px;
		margin: -50px auto;
		border-left: 2px solid #cccc;
		border-right: 2px solid #cccc;
		border-bottom: 2px solid #cccc;
		padding: 40px;
	}
	.el-divider {
		margin: 20px 0 60px 0;
		background: 0 0;
		border-top: 3px solid #f66f0052;
	}
	.upLoad {
		width: 600px;
		height: 300px;
		margin: 15px auto;
		border: 2px dashed #409eff;
	}
	.el-input {
		width: 300px !important;
	}
</style>
