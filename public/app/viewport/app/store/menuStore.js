Ext.define('MainPage.store.menuStore', {
	extend : 'Ext.data.TreeStore',
	requires : 'MainPage.model.menu',
	model : 'MainPage.model.menu',
	defaultRoodId : '1',
	autoLoad : true,
	storeId : "menuStore",
	root : {
		expanded : true,
		leaf : false
	},
	proxy : {
		type : 'ajax',
		url : 'cache/menu.json',
		reader : {
			type : 'json'
		}
	}
});