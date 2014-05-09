
Ext.define('AC.model.user', {

	extend : 'Ext.data.Model',
	fields : ['name', 'password'],
	validations : [{
		field : 'name',
		type : 'presence',
		message : '请填写登录名'
	}]
});