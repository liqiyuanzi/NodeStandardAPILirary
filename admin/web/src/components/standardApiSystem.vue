<template>
  <div class='manage-brand-category'>
    <el-dialog :title="modal.title" class="dealog-panel" width="380px" :visible.sync="modal.show" :close-on-click-modal="false">
      <el-form :model="system" status-icon ref="ruleFormBrand">
        <el-form-item label="系统名称：" prop="name">
          <el-input type="text" placeholder="请输入系统名称" v-model="system.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="系统ID：" prop="systemId">
          <el-input type="text" placeholder="请输入系统ID" v-model="system.systemId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select  v-model="system.status" placeholder="请选择系统状态">
            <el-option v-for="i in list" :label="i.name" :value="i.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal.show = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="接口列表" class="mapping-panel" width="480px" :visible.sync="showApi" :close-on-click-modal="false">
      <el-form  status-icon ref="ruleFormBrand">
        <el-form-item label="接口名称：" prop="status">
          <el-select filterable v-model="apiId" placeholder="请选择接口">
            <el-option v-for="item in apiList" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.path }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showApi = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveMapping">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="系统接口映射" class="dealog-panel" width="740px" :visible.sync="showMapping" :close-on-click-modal="false">
      <div class="fr" style="margin-bottom: 20px">
        <el-button type="primary" class='add-button' @click="addMapping()" size="small">添加</el-button>
      </div>
      <div style="height: 260px;overflow: auto;">
        <el-table ref="multipleTable" :data="mappingList" tooltip-effect="dark" style="width: 100%" border size="small">
          <el-table-column prop="api.name" label="接口名称" min-width="180">
          </el-table-column>
          <el-table-column prop="api.path" label="接口路径" min-width="240">
          </el-table-column>
          <el-table-column  label="接口状态" min-width="170">
            <template slot-scope="scope">
              <span >{{scope.row.api.status | apiStatusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column  className="operate" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="deleteMapping(scope.row.id)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showMapping = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class='panel'>
      <span>系统管理</span>
      <div class="fr" >
        <el-button type="primary" class='add-button' @click="add()" size="small">添加</el-button>
      </div>
    </div>
    <div class="table">
      <el-table ref="multipleTable" :data="systemList" tooltip-effect="dark" style="width: 100%;" border size="small">
        <el-table-column prop="name" label="系统名称" min-width="40%">
        </el-table-column>
        <el-table-column prop="systemId" label="系统ID" min-width="40%">
        </el-table-column>
        <el-table-column  label="状态" min-width="40%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.status | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" className="operate" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="medium">编辑</el-button>
            <el-button @click="mapping(scope.row.id)" type="text" size="medium">接口绑定</el-button>
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
export default {
  data() {
    return {
      systemId:'',
      showApi:false,
      apiList:[],
      apiId:'',
      mappingList:[],
      showMapping:false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      systemList:[],
      modal:{
        title:'新建',
        show:false
      },
      list:list,
      system:{
        systemId:'',
        id:'',
        name:'',
        status:''
      }
    };
  },
  filters:{
    apiStatusFilter(x){
      switch(x){
        case 0:
        return '正常'
        case  1:
        return '接口/方法永久失效'
        case 2:
        return '接口/方法临时关闭'
      }
    },
    statusFilter(x){
      switch(x){
        case 1:
        return '启用'
        case 0:
        return '禁用'
      }
    }
  },
  created() {
    this.getList(this.getPageIndex());
  },
  methods: {
    //删除映射关系
    deleteMapping(id){
      var _this = this
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/deleteSystemApiMapping"
        },
        {
          id: id
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.mapping(this.systemId)
            _this.$message.success(res.data.msg);
          } else {
            _this.$message.error(res.data.msg);
          }
        }
      );
    },
    //保存映射关系
    handleSaveMapping(){
      var _this = this
      if(!this.apiId){
        this.$message.error('请选择接口！');
        return
      }
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/addSystemApiMapping"
        },
        {
          apiId: this.apiId,
          systemId: this.systemId
        },
        res => {
          this.apiId = ''
          if (res.data && res.data.code == 200) {
            _this.mapping(this.systemId)
            _this.$message.success(res.data.msg);
          } else {
            _this.$message.error(res.data.msg);
          }
        }
      );
    },
    //获取映射关系
    addMapping(){
      this.showApi = true;
      let _this = this
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/apiList"
        },
        {
          noPage: true
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.apiList = res.data.data
          } else {
            _this.$message.error(res.data.msg);
          }
        }
      );
    },
    //mapping页
    mapping(id){
      let _this = this;
      this.systemId = id;
      this.showMapping = true;
      App.getData(
        {
          type: "post",
          api: "/public/standardApi/getSystemApiMapping"
        },
        {
          id: id
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.mappingList = res.data.data
          } else {
            _this.$message.error(res.data.msg);
          }
        }
      );
    },
    //点击添加按钮
    add(){
      this.modal.show = true;
      this.modal.title = '新建';
      this.system.name = ''
      this.system.systemId = ''
      this.system.path = ''
      this.system.status = ''
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
          api: "/public/standardApi/getSystem"
        },
        {
          id: id
        },
        res => {
          if (res.data && res.data.code == 200) {
            _this.system.systemId = res.data.data.systemId
            _this.system.name = res.data.data.name
            _this.system.path = res.data.data.path
            _this.system.status = res.data.data.status
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
            api: "/public/standardApi/addSystem"
          },
          {
            systemId:this.system.systemId,
            name: this.system.name,
            status: this.system.status
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
            api: "/public/standardApi/editSystem"
          },
          {
            id:this.system.id,
            systemId:this.system.systemId,
            name: this.system.name,
            status: this.system.status
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
          api: "/public/standardApi/systemList"
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

 .dealog-panel .el-input,.dealog-panel .el-select{
    width: 240px
  }
  .el-form-item__label{
    width: 90px;
    text-align: right
  }
  .mapping-panel .el-select{
    width:340px!important;
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
