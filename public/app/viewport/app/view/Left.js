

Ext.define('MainPage.view.Left', {
	extend:	'Ext.panel.Panel',
	alias: 'widget.LeftPanel',
	title:	'Left',
	collapsible:	true,
	animCollapse:	true,
	margins:	'5 0 5 5',
	layout:	'accordion',
	requires : [
	  'MainPage.view.menuView'
	],
	
	initComponent:	function(){
		Ext.apply(this, {
			items:	[{
				xtype:	'menuview'
			}],
			dockedItems: [{
				xtype: 'toolbar',
				items: [{
					text: 'Tool1',
					action: 'add'
				}, {
					text: 'Tool2',
					disabled: true,
					action: 'remove'
				}]
			}]
		});
		this.callParent(arguments);
	}
});