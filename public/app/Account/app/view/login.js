
Ext.define('AC.view.login', {

	extend : 'Ext.form.Panel',
	alias : 'widget.loginPanel',
	defaultType: 'textfield',
	title : 'Login',
	initComponent : function(){
		Ext.apply(this, {
			items : [{
				fieldLabel : 'Login Name',
				fieldWidth : 60,
				name : 'name'
			},{
				fieldLabel : 'Password',
				fieldWidth : 60,
				inputType: 'password',
				name : 'password'
			}],
			buttons : [{
				text : 'Login',
				action : 'loginAction'
			}]
		});
		this.callParent(arguments);
	}
});