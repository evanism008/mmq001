<template>
	<div class="main">
		<div class="center">
			<el-avatar icon="el-icon-user-solid" size="medium" style="margin-left:45%"></el-avatar>
			<span style="display:block;margin:10px 36%"><h3>后台管理登录</h3></span>
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				class="demo-ruleForm"
				style="margin:20px auto;width:90%"
			>
				<el-form-item prop="admin_name">
					<el-input
						type="text"
						v-model="ruleForm.admin_name"
						autocomplete="off"
						placeholder="请输入您的账号"
					></el-input>
				</el-form-item>
				<el-form-item prop="admin_pwd">
					<el-input
						type="password"
						placeholder="请输入您的密码"
						v-model="ruleForm.admin_pwd"
						autocomplete="off"
						show-password
					></el-input>
				</el-form-item>

				<el-form-item style="margin-top:40px">
					<el-button
						style="width:100px;background-color:#409EFF;color:#ffff;border:0;border-radius:2px"
						@click="submitForm('ruleForm')"
						>提交</el-button
					>
					<el-button @click="resetForm('ruleForm')" style="width:100px;border:0;border-radius:2px">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { setStore } from "@/utils/storage";
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入用户名"));
				} else {
					if (this.ruleForm.admin_pwd !== "") {
						this.$refs.ruleForm.validateField("checkPass");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.ruleForm.admin_pwd !== "") {
						this.$refs.ruleForm.validateField("checkPass");
					}
					callback();
				}
			};
			return {
				ruleForm: {
					admin_name: "",
					admin_pwd: "",
				},
				rules: {
					admin_name: [{ validator: validatePass, trigger: "blur" }],
					admin_pwd: [{ validator: validatePass2, trigger: "blur" }],
				},
				data: [],
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						//获取用户名和密码
						// let {userName,pass}=this.ruleForm;
						this.$http.post("http://localhost:8080/adminlogin", this.ruleForm).then(res => {
							console.log(res);
							this.data = res.data;
							if (res.status === 200) {
								if (this.data.statusCode === 200) {
									let { admin_name, token, admin_id } = this.data;
									//持进化存储数据;
									setStore("token", token);
									setStore("admin_name", admin_name);
									this.$message.success(this.data.msg);
									this.$router.push({ path: "/admin/all_list" });
								} else {
									this.$message.error(this.data.msg);
								}
							}
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.main {
		width: 100%;
		height: 100%;
		background-image: url("../../../assets/img/bg.jpg");
		background-size: 100% 100%;
	}
	.center {
		width: 400px;
		height: 350px;
		color: aliceblue;
		margin: 100px auto 170px;
		border-radius: 3px;
		background: rgba(0, 0, 0, 0.4);
		padding: 20px;
		-moz-box-shadow: 0px 0px 5px #a7a3a3;
		-webkit-box-shadow: 0px 0px 5px #8d8a8a;
		box-shadow: 0px 0px 5px #9c9b9b;
	}
	.el-input {
		opacity: 1;
	}
</style>
