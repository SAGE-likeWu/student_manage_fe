<template>
  <div class="filter-box">
    <el-row>
      <el-col class="flex" :span="8">
        <label class="label">订单编号：</label>
        <el-input v-model="filter.id" size="small"></el-input>
      </el-col>
    </el-row>
    <!--<el-row>
      <el-col class="flex" :span="8">
        <label class="label">物流单号：</label>
        <el-input v-model="filter.logisticsWaybillNo" size="small"></el-input>
      </el-col>
    </el-row>-->

    <el-row>
      <span class="label">下单时间：</span>
      <el-date-picker
        size="small"
        v-model="filter.createTime"
        type="daterange"
        range-separator="至"
        start-placeholder="起始时间"
        end-placeholder="截止时间">
      </el-date-picker>
      <el-button class="filter-btn" type="primary" size="small" @click="$emit('onSearch')">搜索</el-button>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: 'infomationFilter',
      props: {
        filter: {
          required: true,
          type: Object
        }
      }
    }
</script>

<style lang="less" scoped>
  .filter-box {
    margin-bottom: 10px;
    .label {
      display: inline-block;
      text-align: right;
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #000;
    }
  }
  .el-row {
    margin-bottom: 10px;
    .filter-btn {
      margin-left: 0;
      margin-right: 10px;
    }
    .flex {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: nowrap;
    }
  }

</style>

