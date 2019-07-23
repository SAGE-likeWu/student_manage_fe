<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    </el-aside>
    <el-container >
      <el-header style="text-align: center; font-size: 12px">
        <span style="font-size: 17px">填写学生信息</span>
      </el-header>

      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="student" :rules="rules" ref="student">
        <el-form-item label="姓名" prop="studentName">
          <el-input v-model="student.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="student.sex"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="student.idCard"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
          <el-select  v-model="student.gradeId" placeholder="请选择年级" >
            <el-option label="高一" value="高一"></el-option>
            <el-option label="高二" value="高一"></el-option>
            <el-option label="高三" value="高一"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classId">
          <el-select  v-model="student.classId" placeholder="请选择班级" >
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertstu('student')">立即创建</el-button>
          <el-button @click="cancelin">取消</el-button>
        </el-form-item>
      </el-form>
    </el-container>

  </el-container>
</template>

<script>

    export default {

      name: "InsertInformation",
      data() {
        return {
          labelPosition: 'right',
          student: {
            gradeId:'',
            studentName: '',
            sex: '',
            idCard: '',
            classId: '',
          },
          rules:{
            studentName:[
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2到 5 ', trigger: 'blur' }
              ],
            sex:[
              {required: true, message: '请输入性别', trigger: 'blur' },
              { min: 1, max: 1, message: '长度为1', trigger: 'blur' }
            ],
            idCard:[
              {required: true, message: '请输入身份证', trigger: 'blur' },
              { min: 18, max: 18, message: '长度为18', trigger: 'blur' }
            ],
            gradeId:[
              { required: true, message: '请选择年级', trigger: 'change' }
            ],
            classId:[
              { required: true, message: '请选择班级', trigger: 'change' }
            ]
          }
        };
      },
      methods:{
        insertstu(form) {
          this.$refs[form].validate((valid)=>{
            if (valid){
              this.$axios.post("/student/insert", this.student).then(res => {
                if (res.data.code==200){
                  this.$notify({
                    title: '创建成功',
                    type: 'success'
                  });
                }else {
                  this.$notify.error({
                    title: '创建失败',
                    type:'error'
                  });
                }
                this.$router.push("/information/select")
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        cancelin() {
        this.$axios.get(`student/getAll`).then(res =>{
          this.$router.push("/information/select");
        })


      },
      }
    }
</script>

<style scoped>
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
