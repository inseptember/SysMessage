Ext.define('MainPage.view.MainTabPanel',{
	extend : 'Ext.tab.Panel',
	alias : 'widget.maintabpanel',
	id : 'tabpanelMain',
	initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
            	items:	[{
    				xtype:	'panel'
    			}]
            }
        });

        me.callParent(arguments);
	}
});