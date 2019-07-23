<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item ><i class="el-icon-search"></i>查询方式</el-menu-item>
        <el-menu-item-group>

          <el-submenu index="1">
            <template slot="title">按班级 </template>
            <el-submenu index="1-1" @click="findgradeid(1)">
              <template slot="title">高一 </template>
              <el-menu-item  @click="findgradeclassid(1,1)">1班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(1,2)">2班</el-menu-item>
              <el-menu-item  @click="findgradeclassid(1,3)">3班</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">高二</template>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">高三</template>
            </el-submenu>
          </el-submenu>

          <el-menu-item  @click="openname">按姓名</el-menu-item>
          <el-menu-item  @click="openstuid">按学号</el-menu-item>
        </el-menu-item-group>
        <el-menu-item @click="openidcard">按身份证</el-menu-item>


      </el-menu>
    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">学生信息列表</span>

      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="studentId" label="学号" width="140">
          </el-table-column>
          <el-table-column prop="gradeId" label="年级" width="140">
          </el-table-column>
          <el-table-column prop="classId" label="班级" width="140">
          </el-table-column>
          <el-table-column prop="studentName" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="sex" label="性别">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="stuinsert(scope.row)">新增成绩</el-button>
              <el-button
                size="mini"
                @click="stuupdate(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="stuDelete(scope.row.studentId)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

    export default {
      inject:['reload'],
      name: "SelectInformation",

      data() {
        this.$axios.get(`student/getAll`).then(res => {
          if(res.data.code==200){
            this.tableData = res.data.data
          }
        })
        return {
          tableData: [],
          gradeclass:{
            gradeId:'',
            classId:'',
          }
        }
      },
      methods:{
        findgradeclassid(grade,classid) {
          if (grade==1) {
            this.gradeclass.gradeId="高一";
            this.gradeclass.classId=`${classid}班`
            this.$axios.post(`student/get/gradeclass`,this.gradeclass).then(res => {
              this.tableData = res.data.data
            })
          }else if (grade==2){
            this.gradeclass.gradeId="高二";
            this.gradeclass.classId=`${classid}班`
            this.$axios.post(`student/get/gradeclass`,this.gradeclass).then(res => {
              this.tableData = res.data.data
            })
          } else{
            this.gradeclass.gradeId="高三";
            this.gradeclass.classId=`${classid}班`
            this.$axios.post(`student/get/gradeclass`,this.gradeclass).then(res => {
              this.tableData = res.data.data
            })
          }
        },
        openname() {
          this.$prompt('请输入学生姓名', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            // inputErrorMessage: '姓名格式不正确'
          }).then(({ value }) => {
            this.$axios.get(`student/find/name/${value}`).then(res => {
              if (res.data.code==200) {
                this.tableData = res.data.data
                this.$notify({
                  title: '查询成功',
                  type: 'success'
                });
              }else {
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
          this.$prompt('请输入学号',  {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$axios.get(`student/find/id/${value}`).then(res => {
              if (res.data.code==200) {
                this.tableData = res.data.data
                this.$notify({
                  title: '查询成功',
                  type: 'success'
                });
              }else {
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
          this.$prompt('请输入身份证号',  {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:/^([0-9]){7,18}(x|X)?$/,
            inputErrorMessage: '身份证号码格式错误，请输入18位数字字母组合'
          }).then(({ value }) => {
            this.$axios.get(`student/find/idcard/${value}`).then(res => {
              if (res.data.code==200) {
                this.tableData = res.data.data
                this.$notify({
                  title: '查询成功',
                  type: 'success'
                });
              }else {
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
        stuDelete(id){
          this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$axios.delete(`student/delete/id/${id}`).then(res => {
              if(res.data.code==200){
                this.$notify({
                  title: '删除信息成功',
                  type: 'success'
                });
                this.reload();
              }else{
                this.$notify.error({
                  title: '错误',
                  message: '删除信息失败'
                });
              }
            })
          }).then(()=>{
            this.$axios.delete(`/score/delete/student/${id}`).then(res => {
              if(res.data.code==200){
                this.$notify({
                  title: '删除对应成绩成功',
                  type: 'success'
                });
              }else{
                this.$notify.error({
                  title: '错误',
                  message: '删除对应成绩失败'
                });
              }
            })
          })

        },
        stuupdate(row){
          this.$router.push(
            {
              'path': '/information/update',
              query: {
                studentId: row.studentId,
                studentName:row.studentName,
                classId:row.classId,
                sex:row.sex,
                idCard:row.idCard,
                gradeId:row.gradeId
              }
            })
        },
        stuinsert(row){
          this.$router.push(
            {
              'path': '/score/insert',
              query: {
                studentId: row.studentId,
                studentName:row.studentName,
                classId:row.classId,
                gradeId:row.gradeId
              }
            })
        },
      }
    }
</script>

<style>
  html,body{
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
