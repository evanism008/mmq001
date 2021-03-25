// var models = require("../db");
// var express = require("express");
// var router = express.Router();
// var mysql = require("mysql");
// var $sql = require("../sqlMap");

// var conn = mysql.createConnection(models.db);

// conn.connect();

// var jsonWrite = function(res, ret) {
// 	if (typeof ret === "undefined") {
// 		res.send("err");
// 	} else {
// 		console.log(ret);
// 		res.send(ret);
// 	}
// };

// var dateStr = function(str) {
// 	return new Date(str.slice(0, 7));
// };

// router.post("/login", (req, resp) => {
// 	var sql = $sql.user.select_name;
// 	var sqlParams = req.body;
// 	db(sql, sqlParams).then(res => {
// 		resp.send(res);
// 	});
// });

// module.exports = router;
