<!--  -->
<template>
	<div>
		<div class="center">
			<el-avatar icon="el-icon-user-solid" size="medium" style="margin-left:45%"></el-avatar>
			<span style="display:block;margin:10px 40%"><h2>用户注册</h2></span>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" status-icon>
				<el-form-item label="用户昵称" prop="cno">
					<el-col :span="20"> <el-input v-model="ruleForm.cno" size="mini"></el-input></el-col>
				</el-form-item>
				<el-form-item label="真实姓名" prop="name"
					><el-col :span="20"> <el-input v-model="ruleForm.name" size="mini"></el-input></el-col>
				</el-form-item>
				<el-form-item label="密码" prop="cpwd">
					<el-col :span="20">
						<el-input type="password" v-model="ruleForm.cpwd" size="mini"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="确认密码" prop="tcpwd">
					<el-col :span="20">
						<el-input type="password" v-model="ruleForm.tcpwd" size="mini"></el-input>
					</el-col>
				</el-form-item>

				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号" prop="phone"
					><el-col :span="20"> <el-input type="number" v-model="ruleForm.phone" size="mini"></el-input></el-col>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-col :span="20"> <el-input type="textarea" v-model="ruleForm.address"></el-input></el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.ruleForm.tcpwd !== "") {
						this.$refs.ruleForm.validateField("tcpwd");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.ruleForm.cpwd) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					cno: "",
					name: "",
					cpwd: "",
					tcpwd: "",
					sex: "",
					phone: "",
					address: "",
				},

				rules: {
					cno: [
						{ required: true, message: "请输入用户昵称", trigger: "blur" },
						{ min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
					],
					name: [{ required: true, message: "请输入真实名字", trigger: "change" }],
					cpwd: [{ required: true, validator: validatePass, trigger: "change" }],
					tcpwd: [{ required: true, validator: validatePass2, trigger: "change" }],
					sex: [{ required: true, message: "请选择性别", trigger: "change" }],
					phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
					address: [{ required: true, message: "请输入地址", trigger: "blur" }],
				},
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$http.post("http://localhost:8080/register", this.ruleForm).then(res => {
							console.log(res);
							this.data = res.data;
							if (res.status === 200) {
								if (this.data.statusCode === 200) {
									this.$message.success(this.data.msg);
									this.$router.push({ path: "/login" });
								} else {
									this.$message(this.data.msg);
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
		//生命周期 - 创建完成（访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {},
	};
</script>
<style scoped>
	/* @import url(); 引入css类 */
	.center {
		width: 500px;
		height: 650px;
		margin: 60px auto;
		/* border-radius: 2px; */
		color: aliceblue;
		background: rgba(0, 0, 0, 0.2);
		padding: 20px 30px;
		-moz-box-shadow: 0px 0px 5px #a7a3a3;
		-webkit-box-shadow: 0px 0px 5px #8d8a8a;
		box-shadow: 0px 0px 5px #9c9b9b;
	}

	el-form-item {
		line-height: 20px;
	}
</style>
