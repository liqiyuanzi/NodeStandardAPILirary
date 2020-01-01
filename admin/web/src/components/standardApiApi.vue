<template>
  <div class='manage-brand-category'>
    <el-dialog :title="modal.title" class="dealog-panel" width="380px" :visible.sync="modal.show" :close-on-click-modal="false">
      <el-form :model="api" status-icon ref="ruleFormBrand">
        <el-form-item label="api名称：" prop="name">
          <el-input type="text" placeholder="请输入api名称" v-model="api.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="api地址：" prop="path">
          <el-input type="text" placeholder="请输入api地址" v-model="api.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select  v-model="api.status" placeholder="请选择api状态">
            <el-option v-for="i in list" :label="i.name" :value="i.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal.show = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </div>
    </el-dialog>
    <div class='panel'>
      <span>接口配置</span>
      <div class="fr" >
        <el-button type="primary" class='add-button' @click="add()" size="small">添加</el-button>
      </div>
    </div>
    <div class="table">
      <el-table ref="multipleTable" :data="apiList" tooltip-effect="dark" style="width: 100%" border size="small">
        <el-table-column prop="path" label="地址" min-width="20%">
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="20%">
        </el-table-column>
        <el-table-column  label="状态" min-width="30%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.status | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" className="operate" label="操作" width="200">
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
    {name:'正常',value:0},
    {name:'接口/方法永久失效',value:1},
    {name:'接口/方法临时关闭',value:2}
  ];
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      apiList:[],
      modal:{
        title:'新建',
        show:false
      },
      list:list,
      api:{
        id:'',
        name:'',
        status:'',
        path:''
      }
    };
  },
  filters:{
    statusFilter(x){
      switch(x){
        case 0:
        return '正常'
        case 1:
        return '接口/方法永久失效'
        case 2:
        return '接口/方法临时关闭'
      }
    }
  },
  created() {
    this.getList(this.getPageIndex());
  },
  methods: {
    //点击添加按钮
    add(){
      this.modal.show = true;
      this.modal.title = '新建';
      this.api.name = ''
      this.api.path = ''
      this.api.status = ''
    },
    //点击编辑按钮
    edit(id){
      this.api.id = id;
      this.modal.show = true;
      this.modal.title = '编辑';
      let _this = this;
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/getApi"
        },
        {
          id: id
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.api.name = res.data.data.name
            _this.api.path = res.data.data.path
            _this.api.status = res.data.data.status
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
            api: "/public/standardApi/addApi"
          },
          {
            path: this.api.path,
            name: this.api.name,
            status: this.api.status
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
            api: "/public/standardApi/editApi"
          },
          {
            id:this.api.id,
            path: this.api.path,
            name: this.api.name,
            status: this.api.status
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
          api: "/public/standardApi/apiList"
        },
        {
          currentPage: page ? page : this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.pageInfo.total = res.data.total;
            _this.apiList = res.data.data;
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
  .el-input,.el-select{
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
