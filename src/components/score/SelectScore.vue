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
            <el-submenu index="1-2" >
              <template slot="title">高二</template>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">高三</template>
            </el-submenu>
          </el-submenu>

<!--          <el-menu-item  @click="openexamid">按考试编号</el-menu-item>-->
          <el-menu-item  @click="openstuid">学号查询</el-menu-item>
        </el-menu-item-group>



      </el-menu>
    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">成绩列表</span>

      </el-header>

      <el-main>
        <el-table :data="tableData" show-summary :summary-method="getAverage"
                  :default-sort = "{prop: 'total', order: 'descending'}">
          <el-table-column prop="examId" label="成绩编号">
          </el-table-column>

          <el-table-column prop="examInformation" label="考试信息" width="200">
          </el-table-column>
          <el-table-column prop="gradeId" label="年级" >
          </el-table-column>
          <el-table-column prop="classId" label="班级" >
          </el-table-column>
          <el-table-column prop="studentId" label="学号">
          </el-table-column>
          <el-table-column prop="studentName" label="姓名">
          </el-table-column>
          <el-table-column prop="chineseScore" label="语文" sortable>
          </el-table-column>
          <el-table-column prop="mathScore" label="数学" sortable>
          </el-table-column>
          <el-table-column prop="englishScore" label="英语" sortable>
          </el-table-column>
          <el-table-column prop="compositeScore" label="综合" sortable>
          </el-table-column>
          <el-table-column prop="total" label="总分" sortable>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">

              <el-button
                size="mini"
                @click="scoreupdate(scope.row)">编辑</el-button>

              <el-button
                size="mini"
                @click="scoredelete(scope.row.examId)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

  export default {

    name: "SelectScore",
    inject:['reload'],

    data() {
      this.$axios.get(`score/get/all`).then(res => {
        this.tableData = res.data.data
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
          this.$axios.post(`score/get/gradeclass`,this.gradeclass).then(res => {
            this.tableData = res.data.data
          })
        }else if (grade==2){
          this.gradeclass.gradeId="高二";
          this.gradeclass.classId=`${classid}班`
          this.$axios.post(`score/get/gradeclass`,this.gradeclass).then(res => {
            this.tableData = res.data.data
          })
        } else{
          this.gradeclass.gradeId="高三";
          this.gradeclass.classId=`${classid}班`
          this.$axios.post(`score/get/gradeclass`,this.gradeclass).then(res => {
            this.tableData = res.data.data
          })
        }
      },
      openstuid() {
        this.$prompt('请输入学号',  {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$axios.get(`score/get/student/${value}`).then(res => {
            this.tableData = res.data.data
            if (res.data.code==200) {
              this.tableData = res.data.data
              this.$notify({
                title: '查询成功',
                type: 'success'
              });
            }else {
              this.$notify.error({
                title: '错误',
                message: '没有这个学生的成绩'
              });
            }
          })
        }).catch(() => {
          this.$notify.info({
            title: '取消输入',
            // message: '这是一条消息的提示消息'
          });
        });
      },
      scoredelete(id){
        this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$axios.delete(`score/delete/exam/${id}`).then(res => {
            this.reload();
          })
        })
      },
      scoreupdate(row){
        this.$router.push(
          {
            'path': '/score/update',
            query: {
              examId:row.examId,
              examInformation:row.examInformation,
              studentId: row.studentId,
              studentName:row.studentName,
              classId:row.classId,
              gradeId:row.gradeId,
              chineseScore:row.chineseScore,
              mathScore:row.mathScore,
              englishScore:row.englishScore,
              compositeScore:row.compositeScore,
            }
          })
      },
      getAverage(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '平均分';
            return;
          }else if (index===4) {

            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            var i=0;
            sums[index] = values.reduce((prev, curr) => {
              i++;
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index]=sums[index]/i;
          } else {
            sums[index] = '';
          }
        });


        return sums;
      }

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
