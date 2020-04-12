<template>

  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item-group>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">发货管理</span>
            </template>

            <el-menu-item @click="handleFilterConfirm()">
              <i class="el-icon-document"></i>
              <span slot="title">面单导入</span>
            </el-menu-item>
            <el-menu-item @click="handleFilterConfirm()">
              <i class="el-icon-document"></i>
              <span slot="title">面单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">退货管理</span>
            </template>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">综合查询</span>
            </template>
            <el-menu-item @click="handleFilterConfirm()">
              <i class="el-icon-document"></i>
              <span slot="title">物流查询</span>
            </el-menu-item>
          </el-submenu>
          <!--          <el-menu-item  @click="openname">按姓名</el-menu-item>-->
          <!--          <el-menu-item  @click="openstuid">按学号</el-menu-item>-->
        </el-menu-item-group>
        <!--        <el-menu-item @click="openidcard">按身份证</el-menu-item>-->


      </el-menu>
    </el-aside>

    <el-container>

      <el-header style="text-align: left; font-size: 8px">
        <span style="font-size: 12px">运单管理</span>
      </el-header>

      <el-main>
        <m-filter :filter="filter" @onSearch="handleFilterConfirm"></m-filter>
        <el-table :data="tableData">
          <el-table-column prop="id" label="id"/>
          <el-table-column prop="outerWaybillNo" label="外部运单号"/>
          <el-table-column prop="createTime" label="新增时间"/>
          <el-table-column prop="logisticsWaybillNo" label="物流运单号"/>
          <el-table-column prop="consignmentTime" label="托运时间"/>
          <el-table-column prop="deliverMan" label="发货人"/>
          <el-table-column prop="deliverCompany" label="发货公司"/>
          <el-table-column prop="delverContact" label="发货人联系电话"/>
          <el-table-column prop="deliverProvince" label="发货省"/>
          <el-table-column prop="deliverCity" label="发货市"/>
          <el-table-column prop="deliverDistract" label="发货区县"/>
          <el-table-column prop="deliverAddress" label="发货详细地址"/>
          <el-table-column prop="receiveMan" label="收货人"/>
          <el-table-column prop="receiveProvince" label="收货省"/>
          <el-table-column prop="receiveCity" label="收货市"/>
          <el-table-column prop="receiveDistract" label="收货区县"/>
          <el-table-column prop="receiveAddress" label="收货详细地址"/>
          <el-table-column prop="originalPlace" label="始发地"/>
          <el-table-column prop="destination" label="目的地"/>
          <el-table-column prop="packgeType" label="包装类型"/>
          <el-table-column prop="quantity" label="件数"/>
          <el-table-column prop="weight" label="重量"/>
          <el-table-column prop="volume" label="体积"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="stuinsert(scope.row)">新增成绩
              </el-button>
              <el-button
                size="mini"
                @click="stuupdate(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="stuDelete(scope.row.studentId)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row>
          <!--<span style="float: left;margin-right: 20px">
            <el-button type="primary" size="small"  @click="handleExport(1)">导出全部筛选值</el-button>
          </span>-->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pagin.currentPage"
            :page-size="pagin.pageSize"
            layout="total, prev, pager, next"
            background
            :total="pagin.total">
          </el-pagination>
        </el-row>
      </el-main>
    </el-container>

  </el-container>
</template>


<script>

  import {cloneDeep} from 'lodash'
  import {waybillFind} from '../api/waybill'
  import MFilter from './filter'

  export default {

    inject: ['reload'],
    name: "SelectInformation",

    components: {MFilter},

    data() {

      return {
        rowId: 0,
        isLoading: true,
        pagin: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        tableData: [],

        filter: {
          id: '',
          outerWaybillNo: '',
          createTime: '',
          logisticsWaybillNo: '',
          consignmentTime: ''
        },
      }
    },

    methods: {

      async getData() {
        let filter = cloneDeep(this.filter)

        filter.createTimeStart = filter.createTime ? filter.createTime[0] : ''
        filter.createTimeEnd = filter.createTime ? filter.createTime[1] : ''

        try {
          this.isLoading = true

          let {data = {}} = await waybillFind({
            pageSize: this.pagin.pageSize,
            currentPage: this.pagin.currentPage, ...filter
          })
          let list = data.items || []
          this.tableData = list
          this.pagin.total = data.totalNum
        } catch (error) {
          console.log(error)
        } finally {
          this.isLoading = false
        }
      },

      handleFilterConfirm() {
        this.pagin.currentPage = 1
        this.getData()
      },

      handleCurrentChange(page) {
        this.pagin.currentPage = page
        this.getData()
      },


      openname() {
        this.$prompt('请输入学生姓名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '姓名格式不正确'
        }).then(({value}) => {
          this.$axios.get(`student/find/name/${value}`).then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data
              this.$notify({
                title: '查询成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '错误',
                message: '没有这个学生'
              });
            }
          })
        }).catch(() => {
          this.$notify.info({
            title: '取消输入',
          });
        });
      },
      openstuid() {
        this.$prompt('请输入学号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.$axios.get(`student/find/id/${value}`).then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data
              this.$notify({
                title: '查询成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '错误',
                message: '没有这个学生'
              });
            }
          })
        }).catch(() => {
          this.$notify.info({
            title: '取消输入',
          });
        });
      },
      openidcard() {
        this.$prompt('请输入身份证号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^([0-9]){7,18}(x|X)?$/,
          inputErrorMessage: '身份证号码格式错误，请输入18位数字字母组合'
        }).then(({value}) => {
          this.$axios.get(`student/find/idcard/${value}`).then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data
              this.$notify({
                title: '查询成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '错误',
                message: '没有这个学生'
              });
            }
          })
        }).catch(() => {
          this.$notify.info({
            title: '取消输入',
          });
        });
      },
      stuDelete(id) {
        this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`student/delete/id/${id}`).then(res => {
            if (res.data.code == 200) {
              this.$notify({
                title: '删除信息成功',
                type: 'success'
              });
              this.reload();
            } else {
              this.$notify.error({
                title: '错误',
                message: '删除信息失败'
              });
            }
          })
        }).then(() => {
          this.$axios.delete(`/score/delete/student/${id}`).then(res => {
            if (res.data.code == 200) {
              this.$notify({
                title: '删除对应成绩成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '错误',
                message: '删除对应成绩失败'
              });
            }
          })
        })

      },
      stuupdate(row) {
        this.$router.push(
          {
            'path': '/information/update',
            query: {
              studentId: row.studentId,
              studentName: row.studentName,
              classId: row.classId,
              sex: row.sex,
              idCard: row.idCard,
              gradeId: row.gradeId
            }
          })
      },
      stuinsert(row) {
        this.$router.push(
          {
            'path': '/score/insert',
            query: {
              studentId: row.studentId,
              studentName: row.studentName,
              classId: row.classId,
              gradeId: row.gradeId
            }
          })
      },
    }
  }
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #003366;
    color: #333;

  }
</style>
