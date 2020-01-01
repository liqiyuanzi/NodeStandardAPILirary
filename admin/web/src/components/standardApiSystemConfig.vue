<template>
  <div class='manage-brand-category'>
    <el-dialog :title="modal.title" class="dealog-panel" width="380px" :visible.sync="modal.show" :close-on-click-modal="false">
      <el-form :model="system" status-icon ref="ruleFormBrand">
        <el-form-item label="系统：" prop="status">
          <el-select  v-model="system.systemId" placeholder="请选择系统状态">
            <el-option v-for="i in systems" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Key：" prop="accessKey">
          <el-input type="text" placeholder="请输入系统名称" v-model="system.accessKey" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Secret：" prop="accessSecret">
          <el-input type="text" placeholder="请输入系统名称" v-model="system.accessSecret" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效期：" prop="expired">
          <el-date-picker v-model="system.expired" type="date" placeholder="有效期">
        </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal.show = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </div>
    </el-dialog>
    <div class='panel'>
      <span>系统配置</span>
      <div class="fr" >
        <el-button type="primary" class='add-button' @click="add()" size="small">添加</el-button>
      </div>
    </div>
    <div class="table">
      <el-table ref="multipleTable" :data="systemList" tooltip-effect="dark" style="width: 100%" border size="small">
        <el-table-column prop="system.name" label="系统名称" min-width="15%">
        </el-table-column>
		<el-table-column prop="system_id" label="系统ID" min-width="10%">
        </el-table-column>
        <el-table-column prop="system.status" label="系统状态" min-width="15%">
           <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.system.status | statusFilter}}</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="access_key" label="accessKey" min-width="15%">
        </el-table-column>
         <el-table-column prop="access_secret" label="accessSecret" min-width="15%">
        </el-table-column>
        <el-table-column  label="有效期" min-width="15%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.expired_time | timeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" className="operate" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="medium">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
import  moment from 'moment';
import App from "@/codes/App";
const list = [
    {name:'启用',value:1},
    {name:'禁用',value:0},
  ];
const format = function(fmt,date) {
  var time = new Date(date);
  var o = {
    "M+": time.getMonth() + 1,
    "d+": time.getDate(),
    "H+": time.getHours(),
    "m+": time.getMinutes(),
    "s+": time.getSeconds(),
    "q+": Math.floor((time.getMonth() + 3) / 3),
    "S": time.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      systems:[],
      systemList:[],
      modal:{
        title:'新建',
        show:false
      },
      list:list,
      system:{
        expired:'',
        id:'',
        systemId:'',
        accessSecret:'',
        accessKey:''
      }
    };
  },
  filters:{
    statusFilter(x){
      switch(x){
        case 1:
        return '启用'
        case 0:
        return '禁用'
      }
    },
    timeFilter(date){
      return format('yyyy-MM-dd HH:mm:ss',date)
    }
  },
  created() {
    this.getList(this.getPageIndex());
    this.getSystem();
  },
  methods: {
    getSystem(){
      let _this = this;
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/systemList"
        },
        {
          noPage:true
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.systems = res.data.data;
          }
        }
      );
    },
    //点击添加按钮
    add(){
      this.modal.show = true;
      this.modal.title = '新建';
      this.system.expired = ''
      this.system.id = ''
      this.system.systemId = ''
      this.system.accessSecret = ''
      this.system.accessKey = ''
    },
    //点击编辑按钮
    edit(id){
      this.system.id = id;
      this.modal.show = true;
      this.modal.title = '编辑';
      let _this = this;
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/getSystemConfig"
        },
        {
          id: id
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.system.systemId = res.data.data.system_id
            _this.system.accessKey = res.data.data.access_key
            _this.system.accessSecret = res.data.data.access_secret
            _this.system.expired = res.data.data.expired_time
          } else {
            _this.$message.error(res.data.msg);
          }
        }
      );
    },
    handleSave(){
      var _this = this
      if(this.modal.title == '新建'){
        App.getData(
          {
            type: "post",
            api: "/public/standardApi/addSystemConfig"
          },
          {
            systemId:this.system.systemId,
            accessKey: this.system.accessKey,
            accessSecret: this.system.accessSecret,
            expiredTime:this.system.expired
          },
          res => {
           if (res.data && res.data.code == 200) {
              _this.$message.success(res.data.msg);
              _this.modal.show = false
              this.getList(this.getPageIndex());
            } else {
              _this.$message.error(res.data.msg);
            }
          }
        );
      }else{
          App.getData(
          {
            type: "post",
            api: "/public/standardApi/editSystemConfig"
          },
          {
            id:this.system.id,
            systemId:this.system.systemId,
            accessKey: this.system.accessKey,
            accessSecret: this.system.accessSecret,
            expiredTime:this.system.expired
          },
          res => {
           if (res.data && res.data.code == 200) {
              _this.$message.success(res.data.msg);
              _this.modal.show = false
              this.getList(this.getPageIndex());
            } else {
              _this.$message.error(res.data.msg);
            }
          }
        );
      }
    },
    getPageIndex() {
      let currentPageIndex = window.location.hash.split("=")[1];
      currentPageIndex = /^[0-9]+$/.test(currentPageIndex)
        ? currentPageIndex
        : 1;
      if (currentPageIndex != 1) {
        this.pageInfo.currentPage = currentPageIndex
          ? Number(currentPageIndex)
          : 1;
      }
      return this.pageInfo.currentPage;
    },
    handleCurrentChange(page) {
      window.location.hash = "page=" + page;
      this.getList(page);
    },
    getList(page) {

      let _this = this;
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/systemConfigList"
        },
        {
          currentPage: page ? page : this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.pageInfo.total = res.data.total;
            _this.systemList = res.data.data;
          }
        }
      );
    },
    getLocalTime(time){     
      return moment(time).format("YYYY-MM-DD HH:mm:ss")
    }
  }
};
</script>
<style>

 .el-dialog .el-input,.el-select{
    width: 240px
  }
  .el-form-item__label{
    width: 90px;
    text-align: right
  }
</style>
<style lang="less" rel="stylesheet/less" scoped>
.search-box {
  padding: 15px 10px 0px 15px;
}

.search-box-input {
  width: 300px;
  display: inline-block;
}

.manage-brand-category {
  background: #fff;
  .panel {
    form {
      float: left;
      margin-right: 20px;
    }
    .header {
      height: 45px;
      line-height: 45px;
    }
    padding: 20px 40px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
    .fr {
      float: right;
    }
  }
  .table {
    padding: 15px 40px;
    .el-table__body-wrapper {
      min-height: 200px;
    }
    th {
      background: #f9f9f9;
      line-height: 40px;
      text-align: center;
    }
    td {
      padding: 6px 0;
    }
    .operate {
      .cell {
        text-align: center;
      }
    }
  }
  .el-pagination {
    text-align: center;
    padding-bottom: 10px;
  }
  .el-dialog__body {
    padding: 15px 20px;
  }
  .dialog-footer {
    button {
      padding: 10px 14px;
    }
  }
}
</style>
