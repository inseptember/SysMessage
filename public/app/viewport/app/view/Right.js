
Ext.define('MainPage.view.Right', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.RightPanel',
	margins:	'5 5 5 0',
	closable: false,
	collapsible:	true,
	collapsed:	true,
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