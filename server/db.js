const mysql = require("mysql");
//连接上数据库(连接池)
const config = {
	database: "eshop",
	user: "root",
	password: "mysql123456",
};
exports.db = (sql, sqlParams) => {
	sqlParams = sqlParams || [];
	sqlParams = sqlParams == null ? [] : sqlParams;
	return new Promise((resolve, resject) => {
		const pool = mysql.createPool(config);
		pool.getConnection((err, conn) => {
			if (!err) {
				conn.query(sql, sqlParams, (er, results) => {
					if (!er) {
						console.log(results);
						resolve(results);
						conn.destroy();
					} else {
						console.log("sql:", er);
						resject(er);
					}
				});
			} else {
				console.log("conn error:", err);
			}
		});
	});
};
