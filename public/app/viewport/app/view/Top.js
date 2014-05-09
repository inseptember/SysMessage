
Ext.define('MainPage.view.Top', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TopPanel',
	closable: false,
	layout: {
		type: 'fit',
		align: 'stretch'
	},

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				title : 'header'
			},
			{
				xtype : 'box',
				html : '<h1>Head2</h1>',
				height : 30,
				region : 'north',
				cls : 'header'
			}]
		});

		this.callParent(arguments);
	}
});