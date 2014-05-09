Ext.application({
    name: 'MainPage',
    appFolder: 'app/viewport/app',
    controllers: [
        'Left',
        'Top',
        'Main',
        'Right',
        'Bottom'
    ],
    stores :['menuStore'],
    models :['menu'],
    views: [
        'Main',
        'Left',
        'Right',
        'Top','Bottom','menuView','MainTabPanel'
    ],
    launch: function(){
    },
    autoCreateViewport: true
});