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
            <el-menu-item>
              <i class="el-icon-document"></i>
              <span slot="title">物流查询</span>
            </el-menu-item>
          </el-submenu>

        </el-menu-item-group>
      </el-menu>
    </el-aside>


    <el-container>
      <el-header style="text-align: left; font-size: 8px">
        <span style="font-size: 12px">运单管理</span>
      </el-header>

      <el-main>
        <t-filter :filter="filter" @onSearch="getData()"></t-filter>
        <el-table :data="tableData">
          <el-table-column prop="time" label="时间"/>
          <el-table-column prop="context" label="内容"/>
        </el-table>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

  import TFilter from './filter'
  import {cloneDeep} from 'lodash'
  import {getWaybillTrace } from '../api/waybill'

  export default {

    name: 'SelectTrace',
    components: {TFilter},
    inject: ['reload'],

    data() {
      return {
        rowId: 0,
        isLoading: true,
        tableData: [],
        filter: {
          waybillNo: '',
          logisticCompanyCode: ''
        },

      }
    },

    methods: {
      async getData () {
        let filter = cloneDeep(this.filter)

        try {
          this.isLoading = true

          let {data = {}} = await getWaybillTrace({ ...filter})
          let list = data || []
          this.tableData = list
        } catch (error) {
          console.log(error)
        } finally {
          this.isLoading = false
        }
      }
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
