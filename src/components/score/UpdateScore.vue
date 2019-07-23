<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

    </el-aside>

    <el-container >

      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写学生信息</span>

      </el-header>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="score">

        <el-form-item label="成绩编号">

          <el-input v-model="score.examId" ></el-input>
        </el-form-item>
        <el-form-item label="考试信息">
          <el-input v-model="score.examInformation" ></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="score.studentName" ></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="score.studentId" ></el-input>
        </el-form-item>
        <el-form-item label="语文">
          <el-input v-model="score.chineseScore"></el-input>
        </el-form-item>
        <el-form-item label="数学">
          <el-input v-model="score.mathScore"></el-input>
        </el-form-item>
        <el-form-item label="英语">
          <el-input v-model="score.englishScore" ></el-input>
        </el-form-item>
        <el-form-item label="综合">

          <el-input v-model="score.compositeScore" ></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select  v-model="score.gradeId" placeholder="请选择年级" >
            <el-option label="高一" value="高一"></el-option>
            <el-option label="高二" value="高二"></el-option>
            <el-option label="高三" value="高三"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select  v-model="score.classId" placeholder="请选择班级" >
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatestu">立即创建</el-button>
          <el-button @click="cancelup">取消</el-button>
        </el-form-item>
      </el-form>

    </el-container>

  </el-container>
</template>

<script>

  export default {
    name: "UpdateInformation",
    inject:['reload'],
    data(){
      return{
        score: {
          examId:'',
          gradeId:'',
          classId: '',
          studentName: '',
          studentId:'',
          chineseScore: '',
          mathScore: '',
          englishScore:'',
          compositeScore:'',
          examInformation:'',
        }
      }
    },
    created(){
      this.score.studentId=this.$route.query.studentId
      this.score.studentName=this.$route.query.studentName
      this.score.classId=this.$route.query.classId
      this.score.gradeId=this.$route.query.gradeId

      this.score.examId=this.$route.query.examId
      this.score.chineseScore=this.$route.query.chineseScore
      this.score.mathScore=this.$route.query.mathScore
      this.score.englishScore=this.$route.query.englishScore
      this.score.compositeScore=this.$route.query.compositeScore
      this.score.examInformation=this.$route.query.examInformation
    },


    methods:{
      updatestu() {
        this.$axios.post("/score/update", this.score).then(res => {

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
          this.$router.push("/score/select")
        });
      },
      cancelup(){
        this.$router.push("/score/select")
      }

    }
  }
</script>
<style scoped>
</style>
