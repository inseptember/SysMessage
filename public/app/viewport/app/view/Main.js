
Ext.define('MainPage.view.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.MainPanel',
	margins:	'5 5 5 5',
	id : 'mainpanel',
	closable: false,
	layout: {
		type: 'fit',
		align: 'stretch'
	},

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				 xtype: 'maintabpanel'
			}]
		});

		this.callParent(arguments);
	}
});