Ext.define('MainPage.view.menuView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.menuview',
    id: 'leftMenuTree',
    title: 'Menu List',
    store: 'menuStore',
    rootVisible: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            }
        });

        me.callParent(arguments);
    }

});