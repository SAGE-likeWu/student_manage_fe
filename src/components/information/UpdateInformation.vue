<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写学生信息</span>

      </el-header>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="student">
        <el-form-item label="学号" >

          <el-input v-model="student.studentId"  ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="student.studentName" ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="student.sex" ></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="student.idCard"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
          <el-select  v-model="student.gradeId" placeholder="请选择年级" >
            <el-option label="高一" value="高一"></el-option>
            <el-option label="高二" value="高一"></el-option>
            <el-option label="高三" value="高一"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级">
          <el-select  v-model="student.classId" placeholder="请选择班级" >
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatestu">立即创建</el-button>
          <el-button @click="cancelint">取消</el-button>
        </el-form-item>
      </el-form>

    </el-container>

  </el-container>
</template>

<script>

    export default {
        name: "UpdateInformation",

      data(){
          return{
            student: {
              studentId:'',
              studentName: '',
              sex: '',
              idCard: '',
              classId: '',
            }
        }
      },

      //打开页面默认执行的函数
      created(){
          this.student.studentId=this.$route.query.studentId
          this.student.studentName=this.$route.query.studentName
          this.student.sex=this.$route.query.sex
          this.student.idCard=this.$route.query.idCard
          this.student.classId=this.$route.query.classId
          this.student.gradeId=this.$route.query.gradeId
      },

     methods:{
       updatestu() {
         this.$axios.post("/student/update", this.student).then(res => {

           if(res.data.code==200){
             this.$message({
               message: '修改成功',
               type: 'success'
             });
           }else {
             this.$message({
               message: '创建失败',
               type: 'error'
             });
           }
           this.$router.push("/information/select")
         });
       },
       cancelint() {
         this.$axios.get(`student/getAll`).then(res =>{
           this.$router.push("/information/select");
         })


       },

     }
    }
</script>

<style scoped>

</style>
