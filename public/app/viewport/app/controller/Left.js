

Ext.define("MainPage.controller.Left",{
	extend: 'Ext.app.Controller',
	onLeftMenuTreeItemClick: function(dataview, record, item, index, e, eOpts){
		var url = record.get('url');
		if(url){
			this.addMainTabPanel(record.get('id'), record.get('text'), url);
			
		}
	},
	addMainTabPanel : function(id, title, url){
		var tabpanelMain = Ext.getCmp("tabpanelMain");
		var tabchild = tabpanelMain.queryById("mainpaneltab_" + id);
		if(!tabchild){
			tabchild = tabpanelMain.add({
				xtype : 'panel',
				id : 'mainpaneltab_'+ id,
				title : title,
				frame : true,
				html: '<iframe src="'+url+'" width="100%" height="100%" style="border:0px" frameborder="0"/>',
				closable : true
			});
		}
		tabpanelMain.setActiveTab(tabchild);
	},
	init: function(application){
		this.control({
			"#leftMenuTree": {
				itemclick: this.onLeftMenuTreeItemClick
			}
		});
	}
});