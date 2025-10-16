<?php include_once('header.php'); ?>
<?php include_once('left.php'); ?>

<div class="layui-body">
<!-- 内容主体区域 -->

<div class="layui-row content-body">
    <div class="layui-col-lg8 layui-col-md-offset2">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
    <legend>书签导入</legend>
    </fieldset> 
    <!-- 上传 -->
    <div class="layui-upload-drag" id="up_html">
      <i class="layui-icon layui-icon-upload"></i>
      <p>点击上传，或将书签拖拽到此处</p>
      <div class="layui-hide" id="file">
        <hr>
        <img src="" alt="上传成功后渲染" style="max-width: 100%">
      </div>
    </div>
    <!-- 上传END -->
    <form class="layui-form layui-form-pane" >
        <div class="setting-msg"  id='guide' >第一步:请上传数据,支持db3数据库和HTML格式，使用前请参考<a href="https://gitee.com/tznb/OneNav/wikis/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/%E4%B9%A6%E7%AD%BE%E5%AF%BC%E5%85%A5" target="_blank" rel = "nofollow">帮助文档</a></div>
    <div class="layui-form-item" style = "display:none;" id='filed'>
    <label class="layui-form-label">书签路径</label>
    <div class="layui-input-block">
      <input type="text" id = "filename" name="filename" value="" required  lay-verify="required" placeholder="请输入书签路径" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div class="layui-form-item" style = "display:none;" id='fid'>
    <label class="layui-form-label">所属分类</label>
    <div class="layui-input-block">
      <select name="fid" lay-verify="" lay-search>
        <option value=""></option>
        <?php foreach ($categorys as $category) {
        ?>
        <option value="<?php echo $category['id'] ?>"><?php echo ($category['fid'] == 0 ? "":"├ ").$category['name']; ?></option>
        <?php } ?>
      </select>
    </div>
  </div>
   <div class="layui-form-item" style = "display:none;" id='AutoClass'>
    <div class="layui-inline">
      <label class="layui-form-label">自动分类</label>
      <div class="layui-input-inline" style="width: 70px;">
        <input lay-filter="AutoClass" type="checkbox" name="AutoClass" value = "1" lay-skin="switch" lay-text="是|否">
      </div>
      <div class="layui-form-mid layui-word-aux">自动创建分类目录</div>
    </div>
 </div>
   <div class="layui-form-item" style = "display:none;" id='2Class'>
    <div class="layui-inline">
      <label class="layui-form-label">二级分类</label>
      <div class="layui-input-inline" style="width: 70px;">
        <input lay-filter="2Class" type="checkbox" name="2Class" value = "1" lay-skin="switch" lay-text="是|否">
      </div>
      <div class="layui-form-mid layui-word-aux">尝试保留分类层级,无法保留时添加为一级分类</div>
    </div>
 </div> 
   <div class="layui-form-item" style = "display:none;" id='ADD_DATE'>
    <div class="layui-inline">
      <label class="layui-form-label">保留时间</label>
      <div class="layui-input-inline" style="width: 70px;">
        <input type="checkbox" name="ADD_DATE" value = "1" lay-skin="switch" lay-text="是|否">
      </div>
      <div class="layui-form-mid layui-word-aux">尝试保留浏览器书签的添加时间</div>
    </div>
 </div>
 <div class="layui-form-item" style = "display:none;" id='icon'>
    <div class="layui-inline">
      <label class="layui-form-label">提取图标</label>
      <div class="layui-input-inline" style="width: 70px;">
        <input type="checkbox" name="icon" value = "1" lay-skin="switch" lay-text="是|否">
      </div>
      <div class="layui-form-mid layui-word-aux">尝试提取浏览器书签的图标(仅支持小于2kb的png格式)</div>
    </div>
 </div>
   <div class="layui-form-item" style = "display:none;" id='property'>
    <div class="layui-inline">
      <label class="layui-form-label">是否私有</label>
      <div class="layui-input-inline" style="width: 70px;">
        <input  type="checkbox" name="property" value = "1" lay-skin="switch" lay-text="是|否">
      </div>
      <div class="layui-form-mid layui-word-aux" id="propertytxt">导入的链接将设为私有</div>
    </div>
 </div> 
   <div class="layui-form-item" style = "display:none;" id='all'>
    <div class="layui-inline">
      <label class="layui-form-label">保留属性</label>
      <div class="layui-input-inline" style="width: 70px;">
        <input type="checkbox" name="all" value = "1" lay-skin="switch" lay-text="是|否">
      </div>
      <div class="layui-form-mid layui-word-aux">将保留添加时间,修改时间,权重,点击数</div>
    </div>
 </div> 
  <div class="layui-form-item" style = "display:none;" id='imp_link'>
  <button class="layui-btn" lay-submit lay-filter="imp_link">开始导入</button>
  </div>
</form>
</div>

<div class="layui-col-lg8 layui-col-md-offset2">
    
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>书签克隆</legend>
    </fieldset> 
    
    <blockquote class="layui-elem-quote" style="margin-top: 30px;border-left: 5px solid #1e9fff;">
    <a  target="_blank" style="cursor:pointer;"  rel = "nofollow" onclick = "bookmarks('link_clone')">书签克隆 ( 输入他人的OneNav站点地址,对其数据进行复制 ) &nbsp;>>&nbsp; 未输入Token时仅对公开数据复制!</a>
    </blockquote>

</div>

<div class="layui-col-lg8 layui-col-md-offset2">
    
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>书签导出</legend>
    </fieldset> 
    
    <blockquote class="layui-elem-quote" style="margin-top: 30px;">
    <a  target="_blank" style="cursor:pointer;"  rel = "nofollow" onclick = "bookmarks('export_db3')">导出数据库 ( 支持导入OneNav Extend ) &nbsp;>>&nbsp; 备份推荐用这个 </a>
    </blockquote>
    
    <blockquote class="layui-elem-quote" style="margin-top: 10px;">
    <a  target="_blank" style="cursor:pointer;"  rel = "nofollow" onclick = "bookmarks('export_html')">导出HTML ( 支持导入浏览器 / OneNav / OneNav Extend ) &nbsp;>>&nbsp; 导出导入都支持层级</a>
    </blockquote>
</div>

<div class="layui-col-lg8 layui-col-md-offset2">
    
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>本地备份 (订阅可用)</legend>
    </fieldset> 
    
    <div class="setting-msg" >1.备份数据库仅保存最近10份数据<br />2.该功能仅辅助备份使用，无法确保100%数据安全，因此定期对整个站点打包备份仍然是必要的<br />3.当前版本仅备份数据库,不会备份用户上传的图标文件,后续版本会支持!</div>
    
      <!-- 数据表格 -->
      <table class="layui-hide" id="list" lay-filter="list"></table>
      <!-- 行操作 -->
      <script type="text/html" id="tooloption">
        <a class="layui-btn layui-btn-xs" lay-event="restore">回滚</a>
        <a class="layui-btn layui-btn-xs" lay-event="download">下载</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
      </script>  

      <!-- 头部工具栏 -->
      <script type="text/html" id="toolbarheader">
        <div class="layui-btn-container">
          <button class="layui-btn layui-btn-sm" lay-event="backup">立即备份</button>
          <button class="layui-btn layui-btn-sm layui-btn-normal" lay-event="upload">上传备份</button>
        </div>
      </script>

</div>

<div class="layui-col-lg8 layui-col-md-offset2">
    
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>数据清空</legend>
    </fieldset> 
    
    <blockquote class="layui-elem-quote" style="margin-top: 30px;border-left: 5px solid #ff5858;">
    <a  target="_blank" style="cursor:pointer;color: #ff5858;"  rel = "nofollow" onclick = "bookmarks('data_empty')">数据清空 ( 仅分类和链接数据 ) &nbsp;>>&nbsp; 不可逆,请提前备份! </a>
    </blockquote>
</div>

</div>
<!-- 内容主题区域END -->
</div>

<!--链接克隆-->
<ul class="backup" style = "margin-top:18px;display:none;padding-right: 10px;" >
    <form class="layui-form" lay-filter="backup">
    <div class="layui-form-item">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
            <input type="text" name="desc" placeholder="您可以对本次备份的描述,也可以留空"  value=""  class="layui-input">
        </div>
    </div>
    
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="backup">立即备份</button>
        </div>
    </div>
  </form>
</ul>

<!--上传备份-->
<ul class="upload_backup" style = "margin-top:18px;display:none;padding-right: 10px;" >
    <form class="layui-form" lay-filter="upload_backup" enctype="multipart/form-data">
    <div class="layui-form-item">
        <label class="layui-form-label">选择文件</label>
        <div class="layui-input-block">
            <input type="file" name="backup_file" id="backup_file" accept=".info,.db3" lay-verify="required" class="layui-input">
            <div class="layui-form-mid layui-word-aux">只允许上传 .info 和 .db3 格式的备份文件</div>
        </div>
    </div>
    
    <div class="layui-form-item">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
            <input type="text" name="desc" placeholder="您可以对本次上传的描述,也可以留空"  value=""  class="layui-input">
        </div>
    </div>
    
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="upload_backup">上传备份</button>
        </div>
    </div>
  </form>
</ul>

<!--链接克隆-->
<ul class="link_clone" style = "margin-top:18px;display:none;padding-right: 10px;" >
    <form class="layui-form" lay-filter="link_clone">
    <div class="layui-form-item">
    <label class="layui-form-label">url</label>
    <div class="layui-input-block">
    <input type="text" name="url" required   lay-verify="required" placeholder="https://nav.rss.ink"  value=""  class="layui-input">
    </div>
    </div>
    
    <div class="layui-form-item">
    <label class="layui-form-label">Token</label>
    <div class="layui-input-block">
    <input type="text" name="token" placeholder="OneNav Extend 默认不允许匿名(游客)访问API接口" class="layui-input">
    </div>
    </div>
    
    <div class="layui-form-item">
    <label class="layui-form-label">user</label>
    <div class="layui-input-block">
    <input type="text" name="user" placeholder="OneNav Extend 参数,原版留空!" value="" class="layui-input">
    </div>
    </div>
    <div class="layui-form-item">
    <label class="layui-form-label">id:</label>
    <div class="layui-form-mid layui-word-aux">当数据库为空时,会连id也一起克隆,否则使用新id</div>
    </div>  
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="link_clone">开始克隆</button>
            </div>
        </div>
  </form>
</ul>

<?php $md5=true; include_once('footer.php'); ?>


<script>
  layui.use(['table','form'],function(){
    var table = layui.table;
    var form = layui.form;
    // 渲染表格
    table.render({
    elem: '#list'
    ,id: 'list'
    ,url:'./index.php?c=api&method=backup_db_list&u='+u 
    ,toolbar: '#toolbarheader'
    ,defaultToolbar: false
    ,cols: [[
      {field:'id', width:60, title: '序号'}
      ,{field:'name', title:'数据库文件名 / 备注',templet:function(d){
          if(d.desc != '' && d.desc != null){
            return d.name + '&emsp;&emsp;[&nbsp;' + d.desc+'&nbsp;]';
          }else{return d.name;}
      }}
      //,{field:'desc', width:180, title:'备注'}
      ,{field:'mtime', width:180, title: '备份时间'}
      ,{field:'size', width:80, title: '大小'}
      ,{field:'category_cont', width:70, title: '分类'}
      ,{field:'link_cont', width:80, title: '链接'}
      ,{width:180, title:'操作', toolbar: '#tooloption'}
    ]]
    
  });

  // 表头工具栏
  table.on('toolbar(list)', function(obj){
    var checkStatus = table.checkStatus(obj.config.id);
    switch(obj.event){
      case 'backup':
        if(document.body.clientWidth < 768){area = ['100%' , '100%'];}else{area = ['568px' , '250px'];}
        layer.open({
                type: 1,
                shadeClose: true,
                title: '数据备份',
                area : area,
                content: $('.backup')
        });
        return false; 
      break;
      case 'upload':
        if(document.body.clientWidth < 768){area = ['100%' , '100%'];}else{area = ['500px' , '300px'];}
        layer.open({
                type: 1,
                shadeClose: true,
                title: '上传备份文件',
                area : area,
                content: $('.upload_backup')
        });
        return false; 
      break;
    };
  });

  //行事件
  table.on('tool(list)', function(obj){ 
    var data = obj.data; //获得当前行数据
    if(obj.event === 'restore'){ //回滚
      layer.confirm('确定回滚吗？', {icon:3,title:'温馨提示'},function(index){
        $.get("./index.php?c=api&method=restore_db&u="+u,{name:data.name},function(data,status){
            layer.close(index);
            if(data.code == 200) {
                layer.msg('回滚成功！',{icon:1})
            }else{
                layer.msg(data.msg,{icon:5})
            }
        });
      });
    } else if(obj.event === 'del'){ //删除
      layer.confirm('确定删除吗？', {icon:3,title:'温馨提示'},function(index){
        $.get("./index.php?c=api&method=del_backup_db&u="+u,{name:data.name},function(data,status){
            layer.close(index);
            if(data.code == 200) {
                layer.msg('删除成功！',{icon:1})
                obj.del(); // 删除行
            }else{
                layer.msg(data.msg,{icon:5})
            }
        });
      });
    } else if(obj.event === 'download'){
        layer.prompt({formType: 1,value: '',title: '输入登录密码:',shadeClose: true},function(value, index, elem){
            // 创建下载选择弹窗
            var downloadContent = '<div style="padding: 20px;">' +
                '<div style="margin-bottom: 15px; color: #666; font-size: 14px;">' +
                '<strong>建议两个文件都下载，方便后续恢复：</strong><br/>' +
                '• 数据库文件(.db3)：包含所有链接和分类数据<br/>' +
                '• 信息文件(.info)：包含备份元数据和版本信息<br/>' +
                '• 文件包(.zip)：包含上述两个文件的压缩包' +
                '</div>' +
                '<div style="text-align: center;">' +
                '<button type="button" class="layui-btn layui-btn-normal" onclick="downloadBackupFile(\'db\', \'' + data.name + '\', \'' + $.md5(value) + '\')" style="margin-right: 10px;">' +
                '<i class="layui-icon layui-icon-download-circle"></i> 下载数据库文件' +
                '</button>' +
                '<button type="button" class="layui-btn layui-btn-warm" onclick="downloadBackupFile(\'info\', \'' + data.name + '\', \'' + $.md5(value) + '\')">' +
                '<i class="layui-icon layui-icon-file"></i> 下载信息文件' +
                '</button>' +
                '</div>' +
                '<div style="text-align: center; margin-top: 15px;">' +
                '<button type="button" class="layui-btn layui-btn-primary" onclick="downloadBothFiles(\'' + data.name + '\', \'' + $.md5(value) + '\')">' +
                '<i class="layui-icon layui-icon-download"></i> 下载文件包(ZIP)' +
                '</button>' +
                '</div>' +
                '</div>';
            
            layer.open({
                type: 1,
                title: '选择下载文件',
                area: ['500px', '300px'],
                content: downloadContent,
                shadeClose: true
            });
            layer.close(index);
        }); 
    }
    
  });
  
//立即备份
form.on('submit(backup)', function(data){
    $.get("./index.php?c=api&method=backup_db&u="+u,{desc:data.field.desc},function(data,status){
        if( data.code == 200 ) {
            layer.closeAll('page');
            layer.msg('备份成功！',{icon:1});
            table.reload('list'); //刷新表格
         }else{
            layer.msg(data.msg,{icon:5});
          }
    });
    return false; 
});

//上传备份
form.on('submit(upload_backup)', function(data){
    var formData = new FormData();
    var fileInput = document.getElementById('backup_file');
    var file = fileInput.files[0];
    
    if (!file) {
        layer.msg('请选择要上传的文件', {icon: 5});
        return false;
    }
    
    // 检查文件扩展名
    var fileName = file.name;
    var fileExt = fileName.split('.').pop().toLowerCase();
    if (fileExt !== 'info' && fileExt !== 'db3') {
        layer.msg('只允许上传 .info 和 .db3 格式的文件', {icon: 5});
        return false;
    }
    
    formData.append('backup_file', file);
    formData.append('desc', data.field.desc);
    
    $.ajax({
        url: "./index.php?c=api&method=upload_backup&u=" + u,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response.code == 200) {
                layer.closeAll('page');
                layer.msg('上传成功！', {icon: 1});
                table.reload('list'); //刷新表格
            } else {
                layer.msg(response.msg, {icon: 5});
            }
        },
        error: function() {
            layer.msg('上传失败，请重试', {icon: 5});
        }
    });
    return false; 
});

  });

// 下载备份文件函数
function downloadBackupFile(type, fileName, password) {
    var url = '';
    if(type === 'db') {
        url = './index.php?c=api&method=download_backup_db&u=' + u + '&pass=' + password + '&name=' + fileName;
    } else if(type === 'info') {
        url = './index.php?c=api&method=download_backup_info&u=' + u + '&pass=' + password + '&name=' + fileName;
    }
    window.open(url);
    // 不关闭弹窗，让用户可以继续下载其他文件
}

// 同时下载两个文件（打包为ZIP）
function downloadBothFiles(fileName, password) {
    var zipUrl = './index.php?c=api&method=download_backup_package&u=' + u + '&pass=' + password + '&name=' + fileName;
    window.open(zipUrl);
    // 不关闭弹窗，让用户可以继续下载其他文件
}
</script>