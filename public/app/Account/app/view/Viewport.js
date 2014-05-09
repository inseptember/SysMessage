Ext.define('AC.view.Viewport', {
    extend: 'Ext.container.Viewport',
	requires : [
		'AC.view.login'
	],
    layout: 'absolute',
    hideBorders: false,
    items: [{
    	top : 50,
        xtype: 'loginPanel',
        region: 'center',
        height : 200,
        width : 270
    }]
});