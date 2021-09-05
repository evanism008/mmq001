const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const { db } = require("./db");
const userApi = require("./api/user");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var $sql = require("./sqlMap");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("./routes/util");
// app.use("/api/user", userApi);

//连接数据库
var connection = mysql.createConnection({
	database: "eshop",
	user: "root",
	password: "mysql123456",
});

//处理跨域问题
app.all("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
	);
	res.header("X-Powered-By", " 3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// app.get("/get", (req, resp) => {
// 	const sql = "select * from shop_goods";
// 	db(sql, null).then(res => {
// 		resp.send(res);
// 	});
// });
// app.get("/add", (req, resp) => {
// 	const sql = "insert into admin set ?";
// 	const sqlParams = { admin_id: 5, admin_name: "蒙巧", admin_pwd: "123", authonty: "经理" };
// 	db(sql, sqlParams).then(res => {
// 		resp.send(res);
// 	});
// });
// 登录
// app.post("/login", (req, resp) => {
// 	var sqlParams = req.body;
// 	var sql = $sql.user.select_name;
// 	if (sqlParams.userName) {
// 		sql += " where name = '" + sqlParams.userName + "'";
// 	}
// 	db(sql, sqlParams).then(res => {
// 		resp.send(res);
// 	});
// });

//登录
app.post("/login", function(req, resp, next) {
	// 把从客户端传来的名字，密码赋值到新的变量
	let cno = req.body.cno; //post是body
	let pwd = req.body.pass;
	// 通过名字查询数据库用户表得到密码  password是数据表字段名，表名user_info
	connection.query("SELECT * FROM customer WHERE cno = '" + cno + "'", function(err, res, fields) {
		// 当没有查找到密码时
		if (err) {
			throw err;
			return;
		} else {
			console.log(res);
			if (res.length > 0) {
				//将数据库传来的数据转化为JSON格式
				let uPasswordString = JSON.stringify(res);
				let userPassword = JSON.parse(uPasswordString)[0].cpwd;
				if (userPassword == pwd) {
					//将数据库的密码userPassword 和服务端 传来的密码相等
					resp.send({
						token: jwt.sign({ cno: cno }, "abcd", {
							expiresIn: "300000000s",
						}),
						statusCode: 200,
						msg: "登录成功",
						cno: uPasswordString.cno,
					});
					return;
				} else {
					resp.send({ statusCode: 0, msg: "密码不正确" });
					return;
				}
			}
		}
		//如果没有数据，说明用户名填写错误
		resp.send({ statusCode: 0, msg: "用户名不正确" });
	});
});

//注册
app.post("/register", function(req, resp, next) {
	// 把从客户端传来的名字，密码赋值到新的变量
	let sqlParams = req.body;
	let cno = sqlParams.cno;
	let cpwd = sqlParams.cpwd;
	let name = sqlParams.name;
	let sex = sqlParams.sex;
	let address = sqlParams.address;
	let phone = sqlParams.phone;
	connection.query("SELECT * FROM customer WHERE cno = '" + cno + "'", function(err, res, fields) {
		if (res.length > 0) {
			return resp.send({ statusCode: 0, msg: "该昵称已被占用，请重新输入！" });
		} else {
			connection.query(
				"INSERT INTO customer SET  ?",
				{ cno: cno, cpwd: cpwd, name: name, sex: sex, address: address, phone: phone },
				function(err, res, fields) {
					if (err) {
						resp.send({ statusCode: 0, msg: "注册失败，请重试" });
						return;
					} else {
						resp.send({ statusCode: 200, msg: "注册成功" });
						return;
					}
				}
			);
		}
	});
});

/**
 *
 * @param {*当前页的数量} pageSize
 * @param {*当前页} currentPage
 * @param {*当前数组} arr
 *
 * 总32条
 * 8
 * 1 2
 */
function pagination(pageSize, currentPage, arr) {
	let skipNum = (currentPage - 1) * pageSize;
	let newArr =
		skipNum + pageSize >= arr.length ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
	return newArr;
}

// 升序还是降序
/**
 *
 * @param {*排序的属性} attr
 * @param {*true表示升序排序 false表示降序排序} rev
 */

function sortBy(attr, rev) {
	if (rev === undefined) {
		rev = 1;
	} else {
		rev = rev ? 1 : -1;
	}
	return function(a, b) {
		a = a[attr];
		b = b[attr];
		if (a < b) {
			return rev * -1;
		}
		if (a > b) {
			return rev * 1;
		}
		return 0;
	};
}
function range(arr, gt, lte) {
	let newArr = arr.filter(function(item) {
		return item.goods_price <= gt && item.goods_price >= lte;
	});
	return newArr;
}
app.post("/allGoods", (req, resq) => {
	const sort = req.body.sort;
	const gt = parseInt(req.body.max);
	const lte = parseInt(req.body.min);

	let newData = [];
	connection.query("SELECT * FROM shop_goods", function(err, res, next) {
		newData = res;

		if (sort === 1) {
			//价格由低到高
			newData = newData.sort(sortBy("goods_price", true));
		} else if (sort === -1) {
			//价格由高到低
			newData = newData.sort(sortBy("goods_price", false));
		}
		if (gt && lte) {
			// 过滤 10~1000

			newData = range(newData, gt, lte);
			// console.log(gt, lte);
			// console.log(newData);
		}

		resq.send(newData);
	});
});

//后台管理登录
app.post("/adminlogin", function(req, resp, next) {
	// 把从客户端传来的名字，密码赋值到新的变量
	let admin_name = req.body.admin_name; //post是body
	let admin_pwd = req.body.admin_pwd;
	// 通过名字查询数据库用户表得到密码  password是数据表字段名，表名user_info
	connection.query("SELECT * FROM admin WHERE admin_name = '" + admin_name + "'", function(err, res, fields) {
		// 当没有查找到密码时
		if (err) {
			throw err;
			return;
		} else {
			console.log(res);
			if (res.length > 0) {
				//将数据库传来的数据转化为JSON格式
				let uPasswordString = JSON.stringify(res);
				let userPassword = JSON.parse(uPasswordString)[0].admin_pwd;
				if (userPassword == admin_pwd) {
					//将数据库的密码userPassword 和服务端 传来的密码相等
					resp.send({
						token: jwt.sign({ admin_name: admin_name }, "abcd", {
							expiresIn: "300000000s",
						}),
						statusCode: 200,
						msg: "登录成功",
						admin_name: uPasswordString.admin_name,
						authonty: uPasswordString.authonty,
					});
					return;
				} else {
					resp.send({ statusCode: 0, msg: "密码不正确" });
					return;
				}
			}
		}
		//如果没有数据，说明用户名填写错误
		resp.send({ statusCode: 0, msg: "用户名不正确" });
	});
});

app.post("/validate", function(req, res) {
	let token = req.headers.authorization;
	console.log(token);

	//验证token合法性 对token进行解码
	jwt.verify(token, "abcd", function(err, decode) {
		console.log(decode);
		if (err) {
			res.send({
				msg: "当前用户未登录",
			});
		} else if (decode.admin_name) {
			// 证明用户已经登录
			res.send({
				token: jwt.sign({ admin_name: decode.admin_name }, "abcd", {
					// 过期时间
					expiresIn: "300000000s",
				}),
				admin_name: decode.admin_name,
				msg: "已登录",
				statusCode: 200,
			});
		} else {
			res.send({
				token: jwt.sign({ cno: decode.cno }, "abcd", {
					// 过期时间
					expiresIn: "3000s",
				}),
				cno: decode.cno,
				msg: "已登录",
				statusCode: 200,
			});
		}
	});
});

//请求产品数据接口
app.get("/goodsdata", function(req, resp, next) {
	connection.query(
		"SELECT * FROM shop_goods,goods_stype where shop_goods.goods_stype_id=goods_stype.goods_stype_id",
		function(err, res, fields) {
			resp.send(res);
		}
	);
});

//搜索
app.post("/getsearchData", function(req, resp, next) {
	let search = req.body.search;
	connection.query(
		`SELECT * FROM shop_goods where goods_name LIKE '%${search}%' or goods_price LIKE '%${search}%' or goods_canshu LIKE '%${search}%'`,
		function(err, res, fields) {
			if (err) {
				throw err;
			} else {
				resp.send(res);
			}
		}
	);
});

// 添加数据
app.post("/addData", function(req, resp, next) {
	let platform = "112"; //平台变化 622代表当前系统平台的码
	let r1 = Math.floor(Math.random() * 10); // 获取两个0-9的随机数
	let r2 = Math.floor(Math.random() * 10);
	let sysDate = new Date().Format("yyyyMMddhhmmss"); // 生成系统时间
	let goods_no = platform + r1 + sysDate + r2; // 生成订单编号

	let goods_name = req.body.goods_name;
	let goods_price = req.body.goods_price;
	let goods_origin = req.body.goods_origin;
	let goods_img = req.body.goods_img;
	let goods_canshu = req.body.goods_canshu;
	let goods_content = req.body.goods_content;
	let goods_total = req.body.goods_total;
	let goods_stype_id = req.body.goods_stype_id;
	connection.query(
		"INSERT INTO shop_goods SET  ?",
		{
			goods_content: goods_content,
			goods_no: goods_no,
			goods_name: goods_name,
			goods_price: goods_price,
			goods_origin: goods_origin,
			goods_total: goods_total,
			goods_stype_id: goods_stype_id,
			goods_canshu: goods_canshu,
			goods_img: goods_img,
			hotType: false,
		},
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "添加失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "添加成功" });
				return;
			}
		}
	);
});
//是否为热门
app.post("/hotType", function(req, resp, next) {
	console.log(req);
	let hotType = req.body.hotType;
	let no = req.body.no;

	connection.query(
		`UPDATE shop_goods SET hotType = '${hotType}' WHERE goods_no = '${no}'`,
		// `UPDATE shop_goods SET hotType = 'true' WHERE goods_no = '${no}'`,
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "修改失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "修改成功" });
				return;
			}
		}
	);
});
//查看数据
app.post("/viewData", function(req, resp, next) {
	let no = req.body.goods_no;
	connection.query("SELECT * FROM shop_goods where goods_no = '" + no + "'", function(err, res, fields) {
		if (err) {
			throw err;
		} else {
			resp.send(res);
		}
	});
});

//删除数据
app.post("/deleteData", function(req, resp, next) {
	let no = req.body.goods_no;
	connection.query("delete FROM shop_goods where goods_no = '" + no + "'", function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "删除失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "删除成功" });
			return;
		}
	});
});
//编辑数据
app.post("/updateData", function(req, resp, next) {
	let no = req.body.goods_no;
	let name = req.body.goods_name;
	let price = req.body.goods_price;
	let canshu = req.body.goods_canshu;
	let stype_id = req.body.goods_stype_id;
	let content = req.body.goods_content;
	let total = req.body.goods_total;
	let origin = req.body.goods_origin;
	let img = req.body.goods_img;
	connection.query(
		`UPDATE shop_goods SET goods_name = '${name}',goods_price ='${price}',goods_img='${img}',goods_canshu='${canshu}',goods_stype_id='${stype_id}',goods_content = '${content}',goods_total='${total}',goods_origin='${origin}'
	WHERE goods_no = '${no}'`,
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "修改失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "修改成功" });
				return;
			}
		}
	);
});

// 加入购物车
app.post("/addCart", function(req, resp, next) {
	let cno = req.body.cno;
	let amount = req.body.amount;
	let price = req.body.price;
	let no = req.body.no;
	connection.query(
		"INSERT INTO shopping_cart SET  ?",
		{
			cno: cno,
			goods_no: no,
			goods_amount: amount,
			goods_prices: price,
		},
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "添加失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "添加成功" });
				return;
			}
		}
	);
});
//显示购物车内容
app.post("/viewCart", function(req, resp, next) {
	let cno = req.body.cno;
	// let no = req.body.no;
	connection.query(
		`select * from shop_goods,shopping_cart where shopping_cart.cno="${cno}" and shop_goods.goods_no=shopping_cart.goods_no`,
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "查询失败" });
				return;
			} else {
				resp.send(res);
				return;
			}
		}
	);
});

//生产订单
app.post("/addOrder", function(req, resp, next) {
	let platform = "622"; //平台变化 622代表当前系统平台的码
	let r1 = Math.floor(Math.random() * 10); // 获取两个0-9的随机数
	let r2 = Math.floor(Math.random() * 10);
	let sysDate = new Date().Format("yyyyMMddhhmmss"); // 生成系统时间
	let createDate = new Date().Format("yyyy-MM-dd hh:mm:ss"); // 生成订单创建时间
	let orderId = platform + r1 + sysDate + r2; // 生成订单编号
	let cno = req.body.cno;
	let no = req.body.no;
	let num = req.body.num;
	let price = req.body.price;
	let name = req.body.name;
	connection.query(
		"INSERT INTO shop_order SET  ?",
		{
			cno: cno,
			goods_name: name,
			orderId: orderId,
			goods_no: no,
			goods_amount: num,
			goods_price: price,
			createDate: createDate,
			address: "",
			processingState: 1,
		},
		function(err, res, fields) {
			if (err) {
				// console.log(err);
				resp.send({ statusCode: 0, msg: "添加失败", orderId: orderId });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "添加成功", orderId: orderId });
				return;
			}
		}
	);
});
// 删除购物车
app.post("/deleteCart", function(req, resp, next) {
	let no = req.body.no;
	connection.query("delete FROM shopping_cart where goods_no = '" + no + "'", function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "删除失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "删除成功" });
			return;
		}
	});
});
//获取订单
app.post("/getOrder", function(req, resp, next) {
	let orderId = req.body.orderId;
	connection.query(`select * from shop_order where orderId="${orderId}"`, function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "查询失败" });
			return;
		} else {
			resp.send(res);
			return;
		}
	});
});
//支付成功
app.post("/payFor", function(req, resp, next) {
	// console.log(req);
	let address = req.body.address;
	let orderId = req.body.orderId;
	let phone = parseInt(req.body.phone);
	connection.query(
		`UPDATE shop_order SET address = '${address}', phone = '${phone}' WHERE orderId = '${orderId}'`,
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "支付失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "支付成功" });
				return;
			}
		}
	);
});

//计算订单总数+订单列表

app.post("/getOrderCount", function(req, resp, next) {
	connection.query("select * from shop_order", function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "查询失败" });
			return;
		} else {
			resp.send(res);
			return;
		}
	});
});
//处理订单状态
app.post("/proState", function(req, resp, next) {
	let orderId = req.body.orderId;
	let processingTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
	connection.query(
		`UPDATE shop_order SET  processingState= 0,processingTime='${processingTime}' where orderId="${orderId}"`,
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "处理失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "处理成功" });
				return;
			}
		}
	);
});
//删除订单
app.post("/deleteOrder", function(req, resp, next) {
	let orderId = req.body.orderId;
	connection.query(`delete from shop_order where orderId="${orderId}"`, function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "删除失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "删除成功" });
			return;
		}
	});
});
// 查询处理订单处理其情况
app.post("/getUnPre", function(req, resp, next) {
	let val = req.body.value;
	if (val === "2") {
		connection.query("select * from shop_order where 	processingState = 0 ", function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "查询失败" });
				return;
			} else {
				resp.send(res);
				return;
			}
		});
	} else {
		connection.query("select * from shop_order where 	processingState = 1 ", function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "查询失败" });
				return;
			} else {
				resp.send(res);
				return;
			}
		});
	}
});
//统计今天的订单
app.post("/todayOrder", function(req, resp, next) {
	connection.query("SELECT * FROM shop_order WHERE TO_DAYS( createDate) = TO_DAYS( NOW( ) )", function(
		err,
		res,
		fields
	) {
		if (err) {
			resp.send({ statusCode: 0, msg: "查询失败" });
			return;
		} else {
			resp.send(res);
			return;
		}
	});
});
//搜索订单

app.post("/searchOrder", function(req, resp, next) {
	let search = req.body.search;
	connection.query(
		`SELECT * FROM shop_order where goods_name LIKE '${search}%' or orderId LIKE '${search}%' `,
		function(err, res, fields) {
			if (err) {
				throw err;
			} else {
				resp.send(res);
			}
		}
	);
});
//商品排名
// "select goods_name,goods_price,goods_no, sum(goods_amount) from shop_order group by goods_no order by 1",
app.post("/getRank", function(req, resp, next) {
	connection.query(
		"SELECT goods_name,goods_price,goods_no, sum(goods_amount) FROM shop_order GROUP  BY goods_no order by sum(goods_amount) DESC LIMIT 0,10",

		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "查询失败" });
				return;
			} else {
				resp.send(res);
				return;
			}
		}
	);
});
//计算用户人数
app.post("/getCustomerCount", function(req, resp, next) {
	connection.query("select * from customer", function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "查询失败" });
			return;
		} else {
			resp.send(res);
			return;
		}
	});
});
// 删除用户
app.post("/deleteCustomer", function(req, resp, next) {
	let cno = req.body.cno;
	connection.query(`delete from customer where cno="${cno}"`, function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "删除失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "删除成功" });
			return;
		}
	});
});
// 搜索用户
app.post("/getsearchCustomer", function(req, resp, next) {
	let search = req.body.search;
	connection.query(
		`SELECT * FROM customer where cno LIKE '${search}%' or 	name LIKE '${search}%' or phone LIKE '${search}' `,
		function(err, res, fields) {
			if (err) {
				throw err;
			} else {
				resp.send(res);
			}
		}
	);
});
//展示订单列表
app.post("/showMyOrder", function(req, resp, next) {
	let cno = req.body.cno;
	connection.query(
		`SELECT * FROM shop_order,shop_goods where shop_order.cno ='${cno}' and shop_goods.goods_no=shop_order.goods_no `,
		function(err, res, fields) {
			if (err) {
				throw err;
			} else {
				resp.send(res);
			}
		}
	);
});
//获取用户
app.post("/getAdmin", function(req, resp, next) {
	connection.query(`SELECT * FROM admin `, function(err, res, fields) {
		if (err) {
			throw err;
		} else {
			resp.send(res);
		}
	});
});
//删除管理员
app.post("/deleteAdmin", function(req, resp, next) {
	let admin_id = req.body.admin_id;
	connection.query(`delete from admin where admin_id="${admin_id}"`, function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "删除失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "删除成功" });
			return;
		}
	});
});
//管理员注册
app.post("/addAdmin", function(req, resp, next) {
	let admin_name = req.body.admin_name;
	let admin_pwd = req.body.admin_pwd;
	let authonty = req.body.authonty;

	connection.query(
		"INSERT INTO admin SET  ?",
		{
			admin_name: admin_name,
			admin_pwd: admin_pwd,
			authonty: authonty,
		},
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "添加失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "添加成功" });
				return;
			}
		}
	);
});

//添加评论
app.post("/addCom", function(req, resp, next) {
	// let imgs = req.body.imgs;
	let cno = req.body.cno;
	let content = req.body.content;
	let orderId = req.body.orderId;
	let imgs = req.body.imgs;
	let comDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
	connection.query(
		"INSERT INTO pinglun SET  ?",
		{
			cno: cno,
			content: content,
			orderId: orderId,
			commentsStatus: 1, //未审核
			comDate: comDate,
			imgs: imgs,
		},
		function(err, res, fields) {
			if (err) {
				resp.send({ statusCode: 0, msg: "评论失败" });
				return;
			} else {
				resp.send({ statusCode: 200, msg: "评论成功" });
				return;
			}
		}
	);
});
//获取评论信息
app.post("/getCom", function(req, resp, next) {
	connection.query(`SELECT * FROM pinglun,shop_order where pinglun.orderId=shop_order.orderId`, function(
		err,
		res,
		fields
	) {
		if (err) {
			throw err;
		} else {
			resp.send(res);
		}
	});
});
// 删除评论
app.post("/deleteCom", function(req, resp, next) {
	let commentsId = req.body.commentsId;
	connection.query(`delete from pinglun where commentsId="${commentsId}"`, function(err, res, fields) {
		if (err) {
			resp.send({ statusCode: 0, msg: "删除失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "删除成功" });
			return;
		}
	});
});
// 处理评论状态
app.post("/comState", function(req, resp, next) {
	let commentsId = req.body.commentsId;
	// let processingTime = req.body.processingTime;
	connection.query(`UPDATE pinglun SET  commentsStatus= 0 where commentsId="${commentsId}"`, function(
		err,
		res,
		fields
	) {
		if (err) {
			resp.send({ statusCode: 0, msg: "处理失败" });
			return;
		} else {
			resp.send({ statusCode: 200, msg: "处理成功" });
			return;
		}
	});
});

// 监听端口
app.listen(8080, () => {
	console.log("服务已经启动了");
});
