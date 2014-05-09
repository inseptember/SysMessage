
Ext.define('MainPage.view.Bottom', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.BottomPanel',
	closable: false,
	layout: {
		type: 'fit',
		align: 'stretch'
	},

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				title : 'xx'
			}]
		});

		this.callParent(arguments);
	}
});