<template>
  <div class="mt4-overview-page">
    <a-modal
      title="Title"
      :visible="showModal"
      @ok="onCreateOK"
      :confirmLoading="confirmLoading"
      @cancel="onCreateCancel"
      okText="确认开户"
      cancelText="取消"
    >
      <div class="choose-type">
        <a-radio-group name="radioGroup" v-model="createType" >
          <a-radio value="live">实名账户</a-radio>
          <a-radio value="demo">虚拟账户</a-radio>
          <a-radio value="bind">绑定账户</a-radio>
          <!-- <a-radio :value="3">C</a-radio> -->
        </a-radio-group>
      </div>
    </a-modal>
    <div class="header">
      <p class="text">**实名认证后方可开户</p>
      <div class="colum-filter"  v-if=false>
        <label for="" class="label">
          可配置项：
        </label>
        <a-tree-select
          showSearch
          style="width: 100%"
          :value="columnsShow"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder='Please select'
          allowClear
          multiple
          treeDefaultExpandAll
          @change="onChange"
          @search="onSearch"
          @select="onSelect"
        >
          <a-tree-select-node v-for="colum in allColumns" 
            :title="colum.title"
            :key="colum.dataIndex"
            />
            <!-- <a-tree-select-node value='leaf1' title='my leaf' key='random' />
            <a-tree-select-node value='leaf2' title='your leaf' key='random1' />
            <a-tree-select-node value='parent 1-1' title='parent 1-1' key='random2'/>
            <a-tree-select-node value='sss'  title='parent 1-1' key='random3'/> -->
        </a-tree-select>
      </div>
      <a-button type="primary" @click.native="selectCreation">立即开户</a-button>
    </div>
    <a-table :columns="columns"
        :rowKey="rowKey"
        :dataSource="list"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        v-if="isPC"
      >
      <template slot="balanceFee" slot-scope="balanceFee">
        {{balanceFee|money}}
      </template>
      <template slot="createTime" slot-scope="createTime">
        {{createTime|timeFull}}
      </template>
      <template slot="action" slot-scope="action">
        <a-button type="primary">登录</a-button>
        <a-button type="primary">立即入金</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import helper from '../utils/helper.js'
  //PC可配置 显示列
  //
  const allColumns = {
   
    gmtUser:{
      title: 'gmtUser',
      dataIndex: 'gmtUser',
      // scopedSlots: { customRender: 'time' },
    },
    // "gmtUser": 1534386421, //最后一次更新账户余额时间戳
    // "gmtOpenOrder": 1534343721, //最后一次更新持仓时间戳
    // "gmtClosedOrder": 1533889310, //最后一次更新历史交易时间戳
    // "gmtFollowSettlement": 0, //最后一次结算跟单手续费时间戳
    gmtOpenOrder:{
      title: 'gmtOpenOrder',
      dataIndex: 'gmtOpenOrder',
      // scopedSlots: { customRender: 'time' },
    },
    gmtClosedOrder:{
      title: 'gmtClosedOrder',
      dataIndex: 'gmtClosedOrder',
      // scopedSlots: { customRender: 'time' },
    },
    gmtFollowSettlement:{
      title: 'gmtFollowSettlement',
      dataIndex: 'gmtFollowSettlement',
      // scopedSlots: { customRender: 'time' },
    },
    createTime:{
      title: 'createTime',
      dataIndex: 'createTime',
      scopedSlots: { customRender: 'createTime' },
    },
  }
  const staticColums = [
  {
    title: 'MT4 ID',
    dataIndex: 'mt4Uid',
  },
  {
    title: '余额',
    dataIndex: 'balanceFee',
    scopedSlots: { customRender: 'balanceFee' },
  },
  {
    title: '账户名',
    dataIndex: 'fullName',
  },
  {
    title: '杠杆',
    dataIndex: 'leverage',
  },
  {
    title: "action",
    dataIndex: "action",
    scopedSlots: {
      customRender: 'action'
    },
  },
  ]
  const columns = [{
    title: 'MT4 ID',
    dataIndex: 'mt4Uid',
    // sorter: true,
    width: '20%',
    // scopedSlots: { customRender: 'name' },
  }, {
    title: '名字',
    dataIndex: 'fullName',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '20%',
  },{
    title:"action",
    dataIndex:"action",
    scopedSlots: { customRender: 'action' },

  }];
var allIndex = []
// for(let key in allColumns){
//   allIndex.push(allColumns[key].dataIndex)
// }
export default {
  name:'mt4_overview',
  data() {
    return {
      createType:'live',
      showModal: false,
      confirmLoading:false,
      columnsShow:allIndex,
      value: undefined,
      data: [{
        name:{
          first:'1',
          last:'str',
        },
        gender:'female',
        email:'912143546@qq.com',
        uid:1,
      }],
      pagination: {
        defaultPageSize:10,
        showSizeChanger:true,
        current:3,
      },
      loading: false,
      // columns,
      allColumns,
    }
  },
  created(){
    // this.fetch()
  },
  methods: {
    selectCreation(){
      this.showModal = true

    },
    onCreateOK(e){
      if(this.createType==="bind"){
        helper.goPage('/mt4_bind')
      }else{
        helper.goPage('/mt4_create/'+this.createType)
      }
      this.showModal = false
    },
    onCreateCancel(){
      this.showModal = false
    },
    rowKey(record){
      return record.mt4Uid
    },
    onChange(value){
      console.log(arguments)
      this.columnsShow = value
    },
    onSearch(e){
      
    },
    onSelect(e){
      
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination,filters,sorter);
      this.pagination = Object.assign({},pagination)
    },
  },
  computed: {
    columns(){
      let arr = this.columnsShow.map((item) => {
        return this.allColumns[item]
      })
      return arr.concat(staticColums)
    },
    ...mapState('mt4AC',['list']),
    ...mapState('app',['isPC']),
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.mt4-overview-page{
  .header{
    text-align: right;
    margin-bottom: 24px;
    position: relative;
    .colum-filter,.text{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width:100%;
      padding-right: 200px;
      padding-left: 100px;

    }
    .text{
      text-align: left;
      line-height: 32px;
      padding-left: 0;
    }
    .label{
      position: absolute;;
      left: 0;
      top: 0;
      display: inline-block;
      height: 100%;
      line-height: 32px;
    }
  }
}
</style>
