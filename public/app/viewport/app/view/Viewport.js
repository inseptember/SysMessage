Ext.define('MainPage.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'MainPage.view.Main',
        'MainPage.view.Left',
        'MainPage.view.Right',
        'MainPage.view.Top',
        'MainPage.view.Bottom'
    ],
	layout: 'fit',        
    hideBorders: false,  
    items: [  
        {     
            layout: 'border',     
            items: [  
                {  
                    xtype: 'TopPanel',      
                    region: 'north'   
                },  
                {  
                    xtype: 'BottomPanel',  
                    region : 'south'  
                },  
                {  
                    xtype: 'MainPanel',  
                    region: 'center'  
                },  
                {  
                    xtype: 'LeftPanel',  
                    region : 'west',
                    width: 300
                },  
                {  
                    xtype: 'RightPanel',  
                    region : 'east',
                    width: 300
                }  
            ]  
        }  
    ] 
});

