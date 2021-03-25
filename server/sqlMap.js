var sqlMap = {
	user: {
		add: "insert into user (cno, cpwd, name,sex,address,phone) values (?,?,?,?,?,?)",
		select_name: "select * from customer",
		update_user: "update customer set",
	},
};

module.exports = sqlMap;
