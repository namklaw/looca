<template>
  <div class="mine-real-vue">
    <p class="status">
      当前认证状态：{{authInfo.status|authStatus}}
    </p>
    <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 18 }" label='姓名' :labelCol="{ span: 6 }" :validateStatus="input.status.name.validateStatus" :help="input.status.name.help">
        <a-input :placeholder="editing?'请输入真实姓名':'未填写'" ref="inputname" v-model="input.values.name" @blur="validate('name')" @focus="clearValidation('name')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证' :labelCol="{ span: 6 }" :validateStatus="input.status.idCardNo.validateStatus" :help="input.status.idCardNo.help">
        <a-input :placeholder="editing?'请输入身份证号码':'未填写'" ref="inputidCardNo" v-model="input.values.idCardNo" @blur="validate('idCardNo')" @focus="clearValidation('idCardNo')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='邮箱' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <a-input :placeholder="editing?'请输入邮箱地址':'未填写'" ref="inputemail" v-model="input.values.email" @blur="validate('email')" @focus="clearValidation('email')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证正面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <ImageUpload :editing="editing" v-model="idCardUrl" label="身份证正面 " />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证反面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <ImageUpload :editing="editing" v-model="idCardUrl2" label="身份证反面 " />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" v-if="editing">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" v-if="!editing">
        <div class="bttn-box">
          <a-button @click="editing=true">
            编辑
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
import ImageUpload from './../components/container/imageUpload.vue'


export default {
  name: 'mine_real',
  mixins: [inputMixin],
  data() {
    var newInput = new inputHelper.newInput(['name', 'email', 'idCardNo'])
    return {
      input: newInput,
      editing: true,
      idCardUrl:'',
      idCardUrl2:'',
    }
  },
  created() {
    if(this.isRealNamed){
      this.initData()
    }
   
  },
  methods: {
    initData(){
      this.idCardUrl2=this.authInfo.idCardUrl2
      this.idCardUrl=this.authInfo.idCardUrl
      this.formData.name = this.authInfo.name
      this.formData.email = this.authInfo.email
      this.formData.idCardNo = this.authInfo.idCardNo
      this.editing = false
    },
    handleSubmit() {
      let params = this.getParams()
      this.authVerify(params)
      .then(res=>{
        this.editing = false
        this.$message.info('提交成功，等待审核')
      })
    },
    getParams() {
      return {
        idCardUrl: this.idCardUrl,
        idCardUrl2: this.idCardUrl2,
        idCardNo: this.formData.idCardNo,
        name: this.formData.name,
        email: this.formData.email,
      }
    },
    ...mapActions('account', ['authVerify']),
  },
  watch:{
    isRealNamed(v){
      if(v){
        this.initData()
      }
    },
  },
  computed: {
    ...mapState('account', ['authInfo', 'isRealNamed']),
  },
  components: {
    ImageUpload,
  },
}

</script>
<style lang='scss' scoped>
.pic {
  width: 128px;
  height: 128px;
}

</style>
<style lang="scss">
.mine-real-vue {
  
}

</style>
