#[huadialog](https://github.com/huajs/huaDialog)
![npm version](https://img.shields.io/npm/v/npm.svg)
![devDependencies](https://img.shields.io/david/dev/strongloop/express.svg)

>huadialog是一款优秀的弹出框插件,旨在替换和统一弹出框,出三种基本的弹出框外，用户可自定义对话框内容(可以使文本也可以是html对象),
同时用户也可以自定义弹出框的样式.当然你也可以下载源码自行扩展.


##三种基本弹出框
###huadialog.alert(string[,isLocked,zIndex]) 
```javascript
  huadialog.alert('nice to meet you,huadialog!');
  
  huadialog.alert('nice to meet you,huadialog!',true);
  
  huadialog.alert('nice to meet you,huadialog!',true,1000);
  
  huadialog.alert({
  string:'nice to meet you,huadialog!',
  isLocked:false,
  zIndex:1000
  });
```

###huadialog.confirm(string[, ok, cancel, isLocked, zIndex])
```javascript
huadialog.confirm(
'good morning!Are you OK?',
function(){
console.log('ok click!');
},
function(){
console.log('you clicked cancel!');
}
);

huadialog.confirm({
string:'good morning! Are you OK?',
ok:function(){
console.log('you clicked ok!');
},
cancel:function(){
console.log('you clicked cancel!');
},
isLocked:false,
zIndex:1000
});

```
###huadialog.prompt(string[, ok, cancel, isLocked, zIndex])
```javascript
huadialog.prompt(
'type what you want!',
function(str){
console.log('user type string is:'+str);
},
function(){
console.log('you clicked cancel!');
}
);

huadialog.confirm({
string:'type what you want!',
ok:function(str){
console.log('user type string is:'+str);
},
cancel:function(){
console.log('you clicked cancel!');
},
isLocked:false,
zIndex:1000
});

```
