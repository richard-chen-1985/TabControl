TabControl
================

原生JavaScript实现tab切换，兼容FF, chrome, IE6+

使用方法
================

TabControl({
    tabBars: aTabBar,
    tabPages:  aTabPages,
    switchEvent: 'click',
    index: 1
});

参数
================

<ul>
  <li>tabBars：tab控制按钮</li>
  <li>tabPages：tab切换页面</li>
  <li>autoPlay：是否自动切换，默认false</li>
  <li>interval：自动切换时间间隔(ms)，默认3000</li>
  <li>switchEvent：切换触发事件[ hover | click ]</li>
  <li>before：切换前回调函数</li>
  <li>after：切换后回调函数</li>
  <li>index：当前选中的项，默认为0</li>
</ul>
