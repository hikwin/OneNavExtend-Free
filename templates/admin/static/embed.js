
 
layui.use(['element','table','layer','form','upload','util'], function(){
    var element = layui.element,
    table = layui.table,
    util = layui.util,
    form = layui.form,
    upload = layui.upload,
    layer = layui.layer,
    $ = layui.$,
    page = _GET("page");

//账号设置>设为默认主页赋值
if (page == 'edit_user'){
    form.val('EditUser', {"DefaultHomePage": getCookie("DefaultDB") === u });
}
//账号设置>设为默认主页设置
form.on('checkbox(DefaultHomePage)', function (data) {
    if(data.elem.checked==true){ 
        document.cookie="DefaultDB="+ u +"; expires=Thu, 18 Dec 2099 12:00:00 GMT";
    }else{
        document.cookie="DefaultDB="+ u +"; expires=Thu, 18 Dec 2000 12:00:00 GMT";
    }
});

//站点设置相关初始化
if (page == 'edit_homepage'){
    $('#urlz').val(document.getElementById('urlz-input').value);
    $('#gotop').val(document.getElementById('gotop-input').value);
    $('#quickAdd').val(document.getElementById('quickAdd-input').value);
    $('#GoAdmin').val(document.getElementById('GoAdmin-input').value);
    $('#LoadIcon').val(document.getElementById('LoadIcon-input').value);
    form.render();//重新渲染
    //Hash地址的定位
    var layid = location.hash.replace(/^#tab=/, '');
    element.tabChange('tab', layid);
    console.log(layid);
    //切换事件
    element.on('tab(tab)', function(elem){
        layid = $(this).attr('lay-id');
        location.hash = 'tab='+ $(this).attr('lay-id');
    });
}

// 主题模板预览图点击放大
$("body").on("click",".img-list img",function(e){
    layer.photos({
        photos: { "data": [{"src": e.target.src,}]}
    });
});

//每页数量检测,超出阈值是恢复20
var limit = String(getCookie('lm_limit'));
if (limit < 10 || limit > 90){
    limit = 20 ;
}

//分类列表
table.render({
    elem: '#category_list'
    ,height: 'full-150' //自适应高度
    ,url: './index.php?c=api&method=category_list&u='+u //数据接口
    ,page: true //开启分页
    ,limit:limit  //默认每页显示行数
    ,even:true //隔行背景色
    ,id:'category_list'
    ,loading:true //加载条
    ,cellMinWidth: 150 //最小宽度
    ,cols: [[ //表头
    {type: 'checkbox'},
      {field: 'id', title: 'ID', width:80, sort: true}
      ,{field: 'name', title: '分类名称', width:160, edit: 'text',templet: function(d){ 
          if ( d.Icon == null){ return d.name; }
          if (d.Icon.substr(0,3) =='lay'){
              return '<i class="layui-icon '+d.Icon+'"></i> '+d.name;
          } else if(d.Icon.substr(0,2) =='fa') {
              return  '<i class="fa '+d.Icon+'"></i> '+d.name;
          } else{
              return d.name;
          }
      }}
      ,{field: 'fname', title: '父级分类', width:160,templet: function(d){ 
          if ( d.fIcon == null ){ if (d.fname == null) {return '';} else { return d.fname;} }
          
          if (d.fIcon.substr(0,3) =='lay'){
              return '<i class="layui-icon '+d.fIcon+'"></i> '+d.fname;
          }else if(d.fIcon.substr(0,2) =='fa') {
              return  '<i class="fa '+d.fIcon+'"></i> '+d.fname;
          }else{
              return d.fname;
          }
      }}
      ,{field: 'add_time', title: '添加时间', width:160, sort: true,templet:function(d){
        var add_time = timestampToTime(d.add_time);
        return add_time;
      }}
      ,{field: 'up_time', title: '修改时间', width:160, sort: true,templet:function(d){
          if(d.up_time != '' && d.up_time != null){
            var up_time = timestampToTime(d.up_time);
            return up_time;}else{return '';}
      }}
      ,{field: 'weight', title: '权重', width: 80, sort: true, edit: 'text' ,align:'center'}
      ,{field: 'count', title: '链接', width: 80, sort: true ,align:'center'}
      ,{field: 'property', title: '私有', width: 100, sort: true,templet: function(d){
        if(d.property == 1) {
         return "<input type='checkbox' value='" + d.id + "' lay-filter='stat' id='property' checked='checked' name='category' lay-skin='switch' lay-text='私有|公开' >";
         }else{
         return "<input type='checkbox' value='" + d.id + "' lay-filter='stat' id='property' name='category'  lay-skin='switch' lay-text='私有|公开' >";}
      }}
      ,{field: 'description', title: '描述', edit: 'text'}
      ,{ title:'操作', toolbar: '#nav_operate', width:150}
    ]]
});
//监听单元格编辑(分类)
table.on('edit(category_list)', function(obj){
var value = obj.value //得到修改后的值
    ,data = obj.data //得到所在行所有键值
    ,field = obj.field; //得到字段
    $.post('./index.php?c=api&method=edit_danyuan&u='+u,{'id':data.id,'field':field,'value':value,'form':'on_categorys'},function(data,status){
    if(data.code == 0){
        layer.msg('修改成功')
        obj.update({up_time:data.t});//修改单元格的更新时间
    } else{layer.msg(data.msg);}});
});
//监听单元格编辑(连接)
table.on('edit(mylink)', function(obj){
var value = obj.value //得到修改后的值
    ,data = obj.data //得到所在行所有键值
    ,field = obj.field; //得到字段
    $.post('./index.php?c=api&method=edit_danyuan&u='+u,{'id':data.id,'field':field,'value':value,'form':'on_links'},function(data,status){
    if(data.code == 0){
        layer.msg('修改成功')
        obj.update({up_time:data.t});
    } else{layer.msg(data.msg);}});
});

//回车和按钮事件
$('#C_keyword').keydown(function (e){if(e.keyCode === 13){category_q();}}); 
$('#link_keyword').keydown(function (e){if(e.keyCode === 13){link_q();}}); 
$('.layui-btn').on('click', function(){
   var type = $(this).data('type');
   active[type] ? active[type].call(this) : '';
});

//事件执行
var active = {
link_reload:function(){link_q();},
link_reset:function(){link_reset();},
C_reload: function(){category_q();},
C_Delete: function(){category_del(0);},
C_ForceDel:function(){category_del(1);},
addcategory:function(){window.open('./index.php?c=admin&page=add_category&u='+u,"_self");},
};
//链接搜索
function link_q(){
var fid = document.getElementById("fid").value;
var tagid = document.getElementById("tagid").value;
var keyword = document.getElementById("link_keyword").value;//获取输入内容
console.log(fid,keyword);
table.reload('link_list', {
  url: './index.php?c=api&method=link_list&u='+u
  ,method: 'post'
  ,request: {
   pageName: 'page' //页码的参数名称
   ,limitName: 'limit' //每页数据量的参数名
  }
  ,where: {
   query : keyword,
   fid : fid,
   tagid : tagid
  }
  ,page: {
   curr: 1
  }
});
}

//链接搜索重置
function link_reset(){
// 重置分类选择框
document.getElementById("fid").value = "0";
// 重置标签选择框
document.getElementById("tagid").value = "-1";
// 重置关键字输入框
document.getElementById("link_keyword").value = "";
// 重新渲染表单
layui.form.render();
// 重新加载表格数据
link_q();
}

//分类删除
function category_del(force){
    var checkStatus = table.checkStatus('category_list')
    var data = checkStatus.data;
    var res = '',id = ''; 
    if( data.length == 0 ) {layer.msg('未选中任何数据');return} //没有选中数据,结束运行!
    if( force == 1){ alert("非必要请勿使用强制删除,已知不会同步删除上传的链接图标！");}
    for (let i = 0; i < data.length; i++) {if (i < data.length-1){id +=data[i].id+','}else{id +=data[i].id;$("div.layui-table-body table tbody ").find("tr:eq(" + data[i].id + ")").remove(); }} //生成id表
    num=randomnum(4);
    layer.prompt({formType: 0,value: '',title: '输入'+num+'确定删除:'},function(value, index, elem){
        if(value == num){
            $.post('./index.php?c=api&method=del_category&u='+u,{'id':id,'batch':'1','force':force},function(data,status){
                if(data.code == 0){
                    layer.closeAll();//关闭所有层
                    category_q(); //刷新数据
                    open_msg('600px', '500px','处理结果',data.res);
            }else{
                layer.msg(data.msg);}
            });
        }else{
            layer.msg('输入内容有误,无需删除请点击取消!', {icon: 5});}
    }); 
}

//分类搜索
function category_q(){
var inputVal = $('.layui-input').val();//获取输入内容
table.reload('category_list', {
  url: './index.php?c=api&method=category_list&u='+u
  ,method: 'post'
  ,request: {
   pageName: 'page' //页码的参数名称
   ,limitName: 'limit' //每页数据量的参数名
  }
  ,where: {
   query : inputVal
  }
  ,page: {
   curr: 1
  }
});
}
//删除结果弹出
function open_msg(x,y,t,c){
    layer.open({ //弹出结果
    type: 1
    ,title: t
    ,area: [x, y]
    ,maxmin: true
    ,shadeClose: true
    ,content: c
    ,btn: ['我知道了'] 
    });
}
//分类列表工具栏事件
table.on('tool(category_list)', function(obj){
    var data = obj.data;
    if(obj.event === 'del'){
      layer.confirm('确认删除？',{icon: 3, title:'温馨提示！'}, function(index){
        $.post('./index.php?c=api&method=del_category&u='+u,{'id':obj.data.id},function(data,status){
            if(data.code == 0){
                obj.del();
            }
            else{
                layer.msg(data.msg);
            }
        });
        layer.close(index);
      });
    } else if(obj.event === 'edit'){ 
      window.location.href ='./index.php?c=admin&page=edit_category&id=' + obj.data.id +'&u='+u;
    }
});

//链接列表
var link_list_cols=[[ //表头
      {type:'checkbox'} //开启复选框
      ,{field: 'id', title: 'ID', width:60, sort: true}
      // ,{field: 'fid', title: '分类ID',sort:true, width:90}
      ,{field: 'category_name', title: '所属分类',sort:true,width:140,event: 'edit_category',templet:function(d){
          if ( icos[d.fid] == null){ return d.category_name; }
          if (icos[d.fid].substr(0,3) =='lay'){
              return '<i class="layui-icon '+icos[d.fid]+'"></i> '+d.category_name;
          } else if(icos[d.fid].substr(0,2) =='fa') {
              return  '<i class="fa '+icos[d.fid]+'"></i> '+d.category_name;
          } else{
              return d.category_name;
          }
      }}
      ,{field: 'url', title: 'URL',templet:function(d){
        var url = '<a color=""   target = "_blank" href = "' + d.url + '" title = "' + d.url + '">' + d.url + '</a>';
        return url;
      }}
      //,{field: 'tagid', title: 'tag', width:80, sort: true}
      ,{field: 'title', title: '链接标题', width:200, edit: 'text'}
      ,{field: 'add_time', title: '添加时间', width:160, sort: true,templet:function(d){
        var add_time = timestampToTime(d.add_time);
        return add_time;
      }}
      ,{field: 'up_time', title: '修改时间', width:160,sort:true,templet:function(d){
          if(d.up_time == null){return '';}
          else{var up_time = timestampToTime(d.up_time); return up_time;}
      }} 
      ,{field: 'weight', title: '权重', width: 75,sort:true, edit: 'text'}
      ,{field: 'property', title: '私有', width: 100, sort: true,templet: function(d){
        if(d.property == 1) {
         return "<input type='checkbox' value='" + d.id + "' lay-filter='stat' id='list' checked='checked' name='status'  lay-skin='switch' lay-text='私有|公开' >";}
         else {
         return "<input type='checkbox' value='" + d.id + "' lay-filter='stat' id='list'  name='status'  lay-skin='switch' lay-text='私有|公开' >";}
      }}
      ,{field: 'click', title: '点击数',width:90,sort:true}
      ,{field: 'detection_status', title: '检测结果', width:100, templet: function(d){
        // 检测结果列，初始状态为空
        return '<span id="detection_' + d.id + '" class="detection-status">-</span>';
      }}
      ,{ title:'操作', toolbar: '#link_operate',width:128}
    ]]
intCols(); //读取筛选列

var link_data=[]; //链接列表的ID和索引
table.render({
    elem: '#link_list'
    ,height: 'full-150' //自适应高度
    ,url: './index.php?c=api&method=link_list&u=' + u + (_GET('tagid').length > 0 ?'&tagid='+_GET('tagid'):'') //数据接口
    ,page: true //开启分页
    ,limit:limit  //默认每页显示行数
    ,even:true //隔行背景色
    ,loading:true //加载条
    ,cellMinWidth: 150 //最小宽度
    ,toolbar: '#linktool'
    ,id:'link_list'
    ,cols: link_list_cols
    ,done: function (res, curr, count) {
        for(var i=0;i<res.data.length;i++){
            link_data[res.data[i].id] = i;
            //$("div[lay-id='link_list'] td .layui-form-checkbox").eq(i).click();
        }
    }
});

//如果页面是链接列表
if( _GET("page")==="link_list"){
    if(_GET('tagid') !=''){ //接收tagid参数
        $('#tagid').val(_GET('tagid')); 
        form.render('select');
    }
//筛选列相关
const targetNode1=document.getElementsByClassName('layui-table-tool-self')[0];const config={attributes:true,childList:true,subtree:true};const callback=function(mutationsList,observer){console.log(mutationsList);for(let mutation of mutationsList){if(mutation.type==='childList'){}else if(mutation.type==='attributes'){console.log(mutation.target.innerText);var field="";for(var i=0;i<link_list_cols[0].length;i++){if(link_list_cols[0][i].title===mutation.target.innerText){field=link_list_cols[0][i].field;break;}}if(field!==""){let localkey='link_list_'+field;if(mutation.target.classList[2]!=undefined){window.localStorage.setItem(localkey,false);}else
{window.localStorage.setItem(localkey,true);}}}}};const observer=new MutationObserver(callback);observer.observe(targetNode1,config);}
function intCols(){for(var i=0;i<link_list_cols[0].length;i++){if(link_list_cols[0][i].field!=undefined){let localfield='link_list_'+link_list_cols[0][i].field;let hidevalue=window.localStorage.getItem(localfield);if(hidevalue==='false'){link_list_cols[0][i].hide=false;}else if(hidevalue==='true'){link_list_cols[0][i].hide=true;}}}}
//筛选列相关End

//链接列表工具栏事件
table.on('toolbar(mylink)', function(obj){
    var checkStatus = table.checkStatus(obj.config.id),id='';
    switch(obj.event){
      case 'getCheckData':
        var data = checkStatus.data;
        if( data.length == 0 ) {
          layer.msg('未选中任何数据！');
        }
        //提交批量删除
        else{
            for (let i = 0; i < data.length; i++) {if (i < data.length-1){id +=data[i].id+','}else{id +=data[i].id}} //生成id表
            console.log(id)
            layer.confirm('确认删除选中数据？',{icon: 3, title:'温馨提示！'}, function(index){
                $.post('./index.php?c=api&method=del_link&u='+u,{'id':id,'batch':'1'},function(data,status){
                    if(data.code == 0){
                         layer.open({title:'温馨提醒',content:'选中数据已删除！',yes:function(index,layero){window.location.reload();layer.close(index)}});
                    }else{
                        console.log('删除失败')
                    }
                });
            });
        }
          break;
      case 'MC':
        var data = checkStatus.data;
        if( data.length == 0 ) {
          layer.msg('未选中任何数据！');
        }
        //提交批量修改分类
        else{
            for (let i = 0; i < data.length; i++) {if (i < data.length-1){id +=data[i].id+','}else{id +=data[i].id}} //生成id表
            var fid=document.getElementById("fid");
            var index=fid.selectedIndex ;
            text=fid.options[index].text;
            fid=fid.options[index].value;
            console.log(fid,text,id);
            if (fid ==0){layer.tips("先在这里选择新分类再点击修改分类","#fidmsg",{tips: [1, "#03a9f4"],time: 9000}); layer.msg('分类不能为全部!', {icon: 2});return;}
            layer.confirm('确定要将所选链接转移到:'+text+'?', {
               title: "批量修改分类",
               btn: ['确定','取消'] //按钮 Mobile_class
               }, function(){
                $.post('./index.php?c=api&method=Mobile_class&u='+u,{'lid':id ,'cid':fid },function(data,status){
                if(data.code == 0){
                link_q();
                layer.msg('转移成功!', {icon: 1});
                }else{
                layer.msg(data.msg, {icon: 2});
                }
             });
             });
        };
          break;
      case 'set_tag':
        var data = checkStatus.data;
        if( data.length == 0 ) {
          layer.msg('未选中任何数据！');
        }else{
            for (let i = 0; i < data.length; i++) {if (i < data.length-1){id +=data[i].id+','}else{id +=data[i].id}} //生成id表
            var tagid=document.getElementById("tagid");
            var index=tagid.selectedIndex ;
            text=tagid.options[index].text;
            tagid=tagid.options[index].value;
            console.log(tagid,text,id);
            if (tagid == '-1'){ 
                layer.tips("先在这里选择标签再点击设标签","#tagidmsg",{tips: [1, "#03a9f4"],time: 9000});
                layer.msg('所属标签不能为全部!', {icon: 2});
                return;
            }
            layer.confirm(tagid == '0'?'所选的链接将去除标签':'所选的链接将被加入:'+text, {
               title: "批量设标签",
               btn: ['确定','取消'] 
               }, function(){
                $.post('./index.php?c=api&method=link_set_tag&u='+u,{'lid':id ,'tagid':tagid },function(data,status){
                if(data.code == 0){
                link_q();
                layer.msg('操作成功', {icon: 1});
                }else{
                layer.msg(data.msg, {icon: 2});
                }
             });
             });
        };
          
          break;
         
      case 'addlink':
          window.open('./index.php?c=admin&page=add_link&u='+u,"_self");
          break;
      case 'zhiding':
        var data = checkStatus.data;
        if( data.length == 0 ) {
          layer.msg('未选中任何数据！');
        }
        //置顶
        else{
            for(var i = data.length-1;i!=-1;i--){ if (i != 0){id +=data[i].id+','}else{id +=data[i].id}}console.log(id); //生成id表(逆向)
            $.post('./index.php?c=api&method=edit_tiquan&u='+u,{'id':id ,'value':'置顶','form':'on_links' },function(data,status){
             if(data.code == 0){
             link_q();
             layer.msg('操作成功!', {icon: 1});
             }else{
             layer.msg(data.msg, {icon: 2});
             }
             });
            };
            break;  
      case 'set_private':
        var data = checkStatus.data;
        for (let i = 0; i < data.length; i++) {if (i < data.length-1){id +=data[i].id+','}else{id +=data[i].id}} //生成id表
        set_link_attribute(id,1);
          break;
      case 'set_public':
        var data = checkStatus.data;
        for (let i = 0; i < data.length; i++) {if (i < data.length-1){id +=data[i].id+','}else{id +=data[i].id}} //生成id表
        set_link_attribute(id,0);
          break;
       case 'testing':
           var data = checkStatus.data;
           if ( data.length == 0 ) {layer.msg("请先选择要检测的链接",{icon:5});return true}
           var open_index = layer.open({
            title:'检测原理/注意事项'
            ,content: "0.将勾选的链接通过服务器获取目标URL的状态码<br /> 1.不能检测内网/备用链接/其他链接(如迅雷等)<br />2.受限于网络的复杂性,检测结果仅供参考<br />3.检测结束有问题的链接处于勾选状态<br />4.短时间的频繁请求可能被服务器视为CC攻击<br />5.本功能订阅可用<br />6.🟢绿色:正常(200) 🟡黄色:重定向(301/302) 🔵蓝色:禁止访问(403) 🔵蓝色:反爬虫限制(406) 🔴红色:其他错误<br />7.本功能不会修改和删除任何数据<br />8.检测结果仅供参考，方面二次排查，请以实际访问为准<br />"
            ,btn: ['开始检测', '取消']
            ,yes: function(index, layero){
                console.log($("#subscribe").text());
                // 订阅检查已通过后端处理，前端不再需要检查
                // if($("#subscribe").text() != '1' && data.length > 3){
                //     layer.msg("未检测到有效订阅,无法使用此功能!",{icon:5});
                //     return true;
                // }
                var current = 0 ,fail = 0 ;
                layer.load(2, {shade: [0.1,'#fff']});//加载层
                $("#testing").show();//显示进度提示
                layer.close(open_index); //关闭小窗口
                layer.tips("正在检测中,请勿操作页面...","#testing",{tips: [3, "#3595CC"],time: 9000});
                for (let i = 0; i < data.length; i++) {
                    $.post("./index.php?c=api&method=testing_link&u="+u,{id:data[i].id},function(re,status){
                        current++;
                        $("#testing").text('正在检测中 '+current +"/"+data.length +',异常数:'+fail);
                        // 添加详细的调试信息
                        console.log('检测响应:', re);
                        console.log('StatusCode:', re.StatusCode, '类型:', typeof re.StatusCode);
                        console.log('link_data[re.link.id]:', link_data[re.link.id]);
                        
                        // 确保状态码是数字类型进行比较
                        var statusCode = parseInt(re.StatusCode);
                        console.log('转换后的状态码:', statusCode);
                        
                        // 先检查403状态码，确保优先级最高
                        if(statusCode === 403){
                            console.log('进入403分支 - 应该显示蓝色');
                            // 403状态码显示蓝色（禁止访问）
                            $("div[lay-id='link_list'] td .layui-form-checkbox").eq(link_data[re.link.id]).click(); // 取消勾选
                            $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("color","blue");
                            $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("font-weight","bold");
                            // 更新检测结果列
                            $("#detection_" + re.link.id).html('<span style="color: blue; font-weight: bold;">禁止访问</span>');
                            console.log('状态码: ' + re.StatusCode + ' (禁止访问) > ID/URL >'+ re.link.id +' ' + re.link.url);
                            console.log('已设置蓝色');
                        }else if(statusCode === 200 || statusCode === 301 || statusCode === 302){
                            console.log('进入正常/重定向分支');
                            $("div[lay-id='link_list'] td .layui-form-checkbox").eq(link_data[re.link.id]).click();
                            if (statusCode === 200){
                                $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("color","limegreen");
                                // 更新检测结果列
                                $("#detection_" + re.link.id).html('<span style="color: limegreen; font-weight: bold;">正常</span>');
                                console.log('设置绿色');
                            }else{
                                $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("color","#ffb800");
                                // 更新检测结果列
                                $("#detection_" + re.link.id).html('<span style="color: #ffb800; font-weight: bold;">重定向</span>');
                                console.log('设置黄色');
                            }
                        }else if(statusCode === 406){
                            console.log('进入406分支 - 反爬虫限制');
                            // 406状态码显示蓝色（反爬虫限制）
                            $("div[lay-id='link_list'] td .layui-form-checkbox").eq(link_data[re.link.id]).click(); // 取消勾选
                            $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("color","blue");
                            $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("font-weight","bold");
                            // 更新检测结果列
                            $("#detection_" + re.link.id).html('<span style="color: blue; font-weight: bold;">反爬虫限制</span>');
                            console.log('状态码: ' + re.StatusCode + ' (反爬虫限制) > ID/URL >'+ re.link.id +' ' + re.link.url);
                            console.log('已设置蓝色(406)');
                        }else{
                            console.log('进入其他错误分支');
                            fail++;
                            //$("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("background-color","red");
                            $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("color","red");
                            $("div[lay-id='link_list'] .layui-table-body tr").eq(link_data[re.link.id] ).css("font-weight","bold");
                            // 更新检测结果列
                            $("#detection_" + re.link.id).html('<span style="color: red; font-weight: bold;">错误(' + statusCode + ')</span>');
                            
                            console.log('状态码: ' + re.StatusCode + ' > ID/URL >'+ re.link.id +' ' + re.link.url);
                            console.log('已设置红色');
                        }
                        if( current == data.length ) {
                            $("#testing").text('检测完毕,异常数:'+fail);
                            layer.closeAll();//关闭所有
                            layer.msg("检测完毕",{icon:1});
                        }
                    });
                    
                }
                return false;
            },btn2: function(index, layero){
                return true;
            },cancel: function(){ 
                return true;
            }
          })
           break;
    }
});




//设置链接属性，公有或私有
function set_link_attribute(ids,property) {
    if( ids.length === 0 ) {
      layer.msg("请先选择链接!",{icon:5});
    }else{
      $.post("./index.php?c=api&method=set_link_attribute&u="+u,{ids:ids,property:property},function(data,status){
        if( data.code == 200 ){
            link_q();
            layer.msg("设置已更新！",{icon:1});
        }else{
            layer.msg("设置失败！",{icon:5});
        }
      });
    }
}
//链接表头部工具栏事件
  table.on('tool(mylink)', function(obj){
    var data = obj.data;
    console.log(obj.event)
    if(obj.event === 'del'){
      layer.confirm('确认删除？',{icon: 3, title:'温馨提示！'}, function(index){
        $.post('./index.php?c=api&method=del_link&u='+u,{'id':obj.data.id},function(data,status){
            if(data.code == 0){
                obj.del();
            }
            else{
                layer.msg(data.msg);
            }
        });
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
        window.location.href = './index.php?c=admin&page=edit_link&id=' + obj.data.id+'&u='+u;
    } else if(obj.event === 'edit_category'){
        window.location.href = './index.php?c=admin&page=edit_category&id=' + obj.data.fid+'&u='+u;
    }
  });
//分类和连接开关事件
form.on('switch(stat)',
function(obj) {
	var sta;
	var contexts;
	var x = obj.elem.checked; //判断开关状态
	console.log(x) 
	obj.elem.checked = x;
	if (x == true) {
		sta = 1;
		contexts = "私有";
	} else {
		sta = 0;
		contexts = "公开";
	}
	if (obj.elem.id === 'list') {
		$.post('./index.php?c=api&method=edit_property&u=' + u, {
			'id': obj.value,
			'property': sta,
			'form': 'on_links'
		},
		function(data, status) {
			if (data.code == 0) {
			    //obj.elem.checked = x;
			    //form.render();
				layer.msg('ID:' + obj.value + ',已转为' + contexts + '!');
			} else {
				layer.msg('ID:' + obj.value + ',转为' + contexts + '失败!');
				obj.elem.checked = !x;
				form.render();
				layer.close(index);
			}
		});
	} else if (obj.elem.id === 'property') {
		$.post('./index.php?c=api&method=edit_property&u=' + u, {
			'id': obj.value,
			'property': sta,
			'form': 'on_categorys'
		},
		function(data, status) {
			if (data.code == 0) {
				layer.msg('ID:' + obj.value + ',已转为' + contexts + '!');
			} else {
				layer.msg('ID:' + obj.value + ',转为' + contexts + '失败!');
				obj.elem.checked = !x;
				form.render();
				layer.close(index);
			}
		});
	}
});

//添加分类目录
form.on('submit(add_category)', function(data){
    $.post('./index.php?c=api&method=add_category&u='+u,data.field,function(data,status){
      //如果添加成功
      if(data.code == 0) {
        layer.msg('已添加！', {icon: 1});
      }
      else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false; 
});

//首页设置
form.on('submit(edit_homepage)', function(data){
    data.field.layid = layid;
    $.post('./index.php?c=api&method=edit_homepage&u='+u,data.field,function(data,status){
      if(data.code == 0) {
        layer.msg('已修改！', {icon: 1});
      }else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false; 
});



//账号设置
form.on('submit(edit_user)', function(data){
    if(data.field.password ==''){layer.msg('为了您账号安全,请输入密码在提交!', {icon: 5});return;}
    data.field.password = $.md5(data.field.password);
    if(data.field.newpassword !=''){
        data.field.newpassword = $.md5(data.field.newpassword);
    }
    console.log(data.field) 
    $.post('./index.php?c=api&method=edit_user&u='+u,data.field,function(data,status){
      if(data.code == 0) {
          if(data.logout == 1){alert("修改成功,请重新登陆!点击确定返回首页!"); window.location.href = './index.php?u='+data.u;  return false;}//修改了账号密码,跳到主页!
          layer.msg(data.msg, {icon: 1});
      }
      else{
          layer.msg(data.msg, {icon: 5});
      }
    });
    return false; 
});  
//生成令牌
 form.on('submit(Gtoken)', function(data){
    var Token=randomString(32);
    document.getElementById("NewToken").value = Token;
    open_msg('320px', '250px','API Token(令牌) 使用说明','<div style="padding: 15px;">'+Token+'<br>↑这是您的令牌,请妥善保管↑<br>点击保存配置即刻生效!<br></div>');
    return false; 
  }); 

//修改分类目录
form.on('submit(edit_category)', function(data){
    $.post('./index.php?c=api&method=edit_category&u='+u,data.field,function(data,status){
      //如果添加成功
      if(data.code == 0) {
        layer.msg('已修改！', {icon: 1});
      }
      else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false; 
});
//全局配置
form.on('submit(edit_root)', function(data){
    console.log(data.field) 
    $.post('./index.php?c=api&method=edit_root&u='+u,data.field,function(data,status){
      if(data.code == 0) {
        layer.msg('已修改！', {icon: 1});
      }
      else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    return false; 
});  
//添加链接
form.on('submit(add_link)', function(data){
    $.post('./index.php?c=api&method=add_link&u='+u,data.field,function(data,status){
      //如果添加成功
      if(data.code == 0) {
        if(data.path != '' ){$("#iconurl").val(data.path);}
        layer.msg('已添加！', {icon: 1});
        setTimeout(() => {location.reload();}, 500);
      }else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false; 
});
//识别链接信息
form.on('submit(get_link_info)', function(data){
    $.post('./index.php?c=api&method=get_link_info&u='+u,data.field.url,function(data,status){
      if(data.code == 0) {
        console.log(data);
      }else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false; 
});
//更新链接
form.on('submit(edit_link)', function(data){
    $.post('./index.php?c=api&method=edit_link&u='+u,data.field,function(data,status){
      if(data.code == 0) {
        if(data.path != '' ){$("#iconurl").val(data.path);}
        layer.msg('已更新！', {icon: 1});
        setTimeout(() => {location.reload();}, 500);
      }else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false;
});
//识别链接信息
form.on('submit(get_link_info)', function(data){
    //是用ajax异步加载
    $.post('./index.php?c=api&method=get_link_info&u='+u,data.field,function(data,status){
      if(data.code == 0) {
        console.log(data);
      }else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    console.log(data.field) 
    return false; 
});

//书签管理 
window.bookmarks = function(name){
    // 清空数据库
    if( name === "data_empty"){
        layer.prompt({formType: 1,value: '',title: '输入OneNavExtend确定清空数据:',shadeClose: true},function(value, index, elem){
            if (value === "OneNavExtend"){
                layer.prompt({formType: 1,value: '',title: '输入登录密码:',shadeClose: true},function(value, index, elem){
                    $.get('./index.php?c=api&method=data_empty&u='+ u +'&pass=' + $.md5(value),function(data,status){
                        if(data.code == 0) {
                            layer.msg("清空成功", {icon: 1});
                        }else{
                            layer.msg(data.msg, {icon: 5});
                        }
                    });
                    layer.closeAll();
                }); 
            }else{
                layer.msg("输入错误,请注意大小写!", {icon: 5});
            }
        });
        return false; 
    }
    if ( name === "link_clone"){
        if(document.body.clientWidth < 768){area = ['100%' , '100%'];}else{area = ['768px' , '350px'];}
        layer.open({
                type: 1,
                shadeClose: true,
                title: '书签克隆',
                area : area,
                content: $('.link_clone')
        });
        return false; 
    }
    // 导出数据
    layer.prompt({formType: 1,value: '',title: '输入登录密码:',shadeClose: true},function(value, index, elem){
        window.open('./index.php?c=api&method='+ name +'&u='+u +'&pass=' + $.md5(value));
        layer.closeAll();
    }); 
}
    //开始克隆
    form.on('submit(link_clone)', function(data){
        console.log(data.field);
        layer.load(2, {shade: [0.1,'#fff']});//加载层
        $.post('./index.php?c=api&method=link_clone' + "&u=" + u ,data.field,function(data,status){
            layer.closeAll('loading');//关闭加载层
            console.log(data,status);
            if(data.code == 0){
                layer.msg(data.msg, {icon: 1});
                //setTimeout(() => {location.reload();}, 700);
            }else{
                layer.msg(data.msg, {icon: 5});
            }
            
        });
        return false; 
    });

//导入书签
form.on('submit(imp_link)', function(data){
    layer.msg('数据导入中,请稍后...', {offset: 'b',anim: 0,time: 60*1000});
    layer.load(1, {shade:[0.1,'#fff']});//加载层
    //用ajax异步加载
    $.post('./index.php?c=api&method=imp_link&u='+u,data.field,function(data,status){
        layer.closeAll();//关闭所有层
      //如果添加成功
      if(data.code == 0) {
          if (data.fail > 0){
              open_msg('800px', '600px',data.msg,data.res);
          }else{
              layer.open({title:'导入完成',content:data.msg});
          }
      }else{
        layer.msg(data.msg, {icon: 5});
      }
    });
    
    console.log(data.field) 
    return false; 
});
//书签上传
//执行实例
upload.render({
    elem: '#up_html' //绑定元素
    ,url: './index.php?c=api&method=upload&u='+u //上传接口
    ,exts: 'html|HTML|db3'
    ,accept: 'file'
    ,done: function(res){
      //console.log(res);
      //上传完毕回调
      if( res.code == 0 ) {
        $("#filename").val(res.file_name);
        if(res.suffix == 'html'){
            $("#fid").show();
            $("#AutoClass").show();
            $("#property").show();
            $("#all").hide();
        }else if(res.suffix == 'db3'){
            $("#fid").hide();
            $("#AutoClass").hide();
            $("#property").hide();
            $("#all").show();
        }else{
            $("#fid").show();
            $("#AutoClass").show();
            $("#property").show();
            $("#all").show();
        }
        
        $("#imp_link").show();
        //$("#filed").show();
        $('#guide').text('第二步:选择好您需要的选项,并点击开始导入!导入过程中请勿刷新或关闭页面!');
        $("#up_html").hide();
      }
      else if( res.code < 0) {
        layer.msg(res.msg, {icon: 5});
        layer.close();
      }
    }
    ,error: function(){
      //请求异常回调
    }
  });
  
 //监听指定开关
  form.on('switch(AutoClass)', function(data){
    if(this.checked){
        $('#propertytxt').text('导入的链接和创建的分类将设为私有!');
        $("#2Class").show();
        $("#ADD_DATE").show();
        $("#icon").show();
    }else{
        $('#propertytxt').text('导入的链接将设为私有!');
        $("#2Class").hide();
        $("#ADD_DATE").hide();
        $("#icon").hide();
    }
  });
  
form.on('select(session)', function (data) {
    //获取当前选中下拉项的索引
    var indexGID = data.elem.selectedIndex;
    //获取当前选中下拉项的 value值
    var goodsID = data.value;
    //判断是否选的0
    if(goodsID == '0'){
        open_msg('320px', '250px','注意','<div style="padding: 15px;">超过24小时未关闭浏览器也会失效<br></div>');
    }
    });
    
//上传图标
  var uploadRender = upload.render({
    elem: '#up_icon'
    ,exts: 'jpg|png|ico|svg'
    ,acceptMime:  'image/*'
    ,accept: 'file'
    ,size: 1024 
    ,auto: false 
    ,bindAction: ''
    ,choose: function(obj){  //选择文件回调
        layer.closeAll('dialog');//关闭信息层
        var files = obj.pushFile();
        obj.preview(function(index, file, result){
            console.log(index); //得到文件索引
            console.log(file); //得到文件对象
            $('#icon').attr('src', result); //预览图Base64
            $("#icon_base64").val(result); //提交的Base64
            uploadRender.config.elem.next()[0].value = ''; //解决上传相同文件只触发一次
            if(_GET('page') == 'edit_link'){ //若是编辑页面则点击更新
                $("#edit_link").click();
            }
        });
    }
  });


//结束
});



//删除图标
function del_icon(key){
    var src = $("#icon")[0].src; //获取图标内容
    var img = 'data:image/bmp;base64,Qk1CAAAAAAAAAD4AAAAoAAAAAQAAAAEAAAABAAEAAAAAAAQAAADEDgAAxA4AAAAAAAAAAAAAAAAAAP///wCAAAAA' //空图标
    
    if( src != '' && src != img ){
        $("#iconurl").val(''); //清除图标URL
        $("#icon_base64").val('del'); //写删除标记
        $('#icon').attr('src', img); //清除预览图
        if(key == 'edit_link'){
            $("#edit_link").click(); //点击更新
        }else{
            layer.msg("删除成功", {icon: 1});
        }
    }else{
        layer.msg("您还未上传图标", {icon: 2});
    }
}
//主题详情
function theme_detail(name,description,version,update,author,homepage,screenshot,key){
    layer.open({type: 1,maxmin: false,shadeClose: true,resize: false,title: name + ' - 主题详情',area: ['60%', '59%'],content: '<body class="layui-fluid"><div class="layui-row" style = "margin-top:1em;"><div class="layui-col-sm9" style = "border-right:1px solid #e2e2e2;"><div style = "margin-left:1em;margin-right:1em;"><img src="'+screenshot+'" alt="" style = "max-width:100%;"></div></div><div class="layui-col-sm3"><div style = "margin-left:1em;margin-right:1em;"><h1>'+name+'</h1><p>描述：'+description+'</p><p>版本：'+version+'</p><p>更新时间：'+update+'</p><p>作者：'+author+'</p><p>主页：<a style = "color:#01AAED;" href="'+homepage+'" target="_blank" rel = "nofollow">访问主页</a></p></div></div></div></body>'});
                    
}

//打开主题预览页面
function theme_preview(key,name){
    window.open('./index.php?Theme='+key+'&u=' + u);
}

//载入主题配置
function theme_config(key,name){
    if(document.body.clientWidth < 768){area = ['100%' , '100%'];}else{area = ['550px' , '99%'];}
    layer.open({
        type: 2,
        title: name + ' - 主题配置',
        shadeClose: true, //点击遮罩关闭层
        area : area,
        anim: 5,
        offset: 'rt',
        content: './index.php?c=admin&page=config&u='+u+'&Theme='+key+'&source=admin'
        });
}
//下载主题
function download_theme(dir,name,desc){
    if (desc.length != 0){
        console.log(desc);
        layer.open({
            title:name
            ,content: desc
            ,btn: ['下载', '取消']
            ,yes: function(index, layero){
                download_theme2(dir,name,desc);
            },btn2: function(index, layero){
                return true;
            },cancel: function(){ 
                return true;
        }
        });
    }else{
        download_theme2(dir,name,desc);
    }
    
}
//删除主题
function theme_del(dir){
    layer.load(1, {shade:[0.1,'#fff']});//加载层
    layer.msg('正在删除,请稍后..', {offset: 'b',anim: 1,time: 60*1000});
    $.post("./index.php?c=api&method=del_theme&u="+u,{dir:dir},function(data,status){
        layer.closeAll();
        if( data.code == 200 ) {
            layer.msg(data.msg, {icon: 1});
            setTimeout(() => {
                location.reload();
            }, 500);
        }
        else{
            layer.msg(data.msg, {icon: 5});
        }
    });
}
function download_theme2(dir,name,desc){
    layer.load(1, {shade:[0.1,'#fff']});//加载层
    layer.msg('下载安装中,请稍后..', {offset: 'b',anim: 1,time: 60*1000});
    $.post("./index.php?c=api&method=download_theme&u="+u,{dir:dir,name:name},function(data,status){
        layer.closeAll();
        if( data.code == 0 ) {
            layer.msg(data.msg, {icon: 1});
            setTimeout(() => {
                location.reload();
            }, 500);
        }
        else{
            layer.msg(data.msg, {icon: 5});
        }
    });
}
function set_theme(key,name) {
    layer.open({
        title:name
        ,content: '请选择要应用的设备类型 ?'
        ,btn: ['全部', 'PC', 'Pad']
        ,yes: function(index, layero){
            set_theme2(key,'PC/Pad');
        },btn2: function(index, layero){
            set_theme2(key,'PC');
        },btn3: function(index, layero){
            set_theme2(key,'Pad');
        },cancel: function(){ 
            return true;
        }
    });
}
function set_theme2(name,type) {
    console.log(type,name);
    $.post("./index.php?c=api&method=set_theme&u="+u,{type:type,name:name},function(data,status){
        if( data.code == 0 ) {
            layer.msg(data.msg, {icon: 1});
            setTimeout(() => {
                location.reload();
            }, 500);
        }
        else{
            layer.msg(data.msg, {icon: 5});
        }
    });
}

//异步识别链接信息
function get_link_info() {
    var url = $("#url").val();
    var index = layer.load(1);
    $.post('./index.php?c=api&method=get_link_info&u='+u,{url:url},function(data,status){
      //如果添加成功
      if(data.code == 0) {
        if(data.data.title != null) {
          $("#title").val(data.data.title);
        }
        if(data.data.description != null) {
          $("#description").val(data.data.description);
        }
        
        layer.close(index);
      }
      else{
        layer.msg(data.msg, {icon: 5});
        layer.close(index);
      }
    });
}

