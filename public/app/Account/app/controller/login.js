
Ext.define('AC.controller.login', {

	extend : 'Ext.app.Controller',
	
	models : [
		'user@AC.model'
	],
	views : [
		'login'
	],
	refs: [{
		ref: 'loginPanel',
		selector: 'panel'
    }],
	init : function(){
		this.control({
			'loginPanel button[action=loginAction]' : {
				click : this.loginAction
			}
		});
	},
	
	loginAction : function(button){
		var form   = button.up('form'),
            record = form.getRecord(),
            values = form.getValues();
		console.log(values)
	}
	
});