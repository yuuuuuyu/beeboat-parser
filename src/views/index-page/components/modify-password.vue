<template>
    <el-dialog
        title="修改密码"
        v-model="pageData.value"
        @closed="onCloseDialog"
        :draggable="true"
        :close-on-click-modal="false"
        style="width: 500px"
    >
        <div class="bt-modify-view">
            <span class="tips">
                注：用户密码包含字母、数字、特殊字符中的两种，长度至少10位，特殊字符包含_`~!@#$%^&*()-+=|{}:;,[].&lt;>/?
            </span>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                status-icon
                label-width="100px"
            >
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repeatPassword">
                    <el-input
                        type="password"
                        v-model="ruleForm.repeatPassword"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onCloseDialog">取消</el-button>
                <el-button type="primary" @click="onSaveButtonClick(ruleFormRef)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { watch, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { UserApi, AccountApi } from '../../../api/index'
import JSEncrypt from 'jsencrypt'
import { ElMessage } from 'element-plus'

interface IProps {
    value?: boolean
}
const emits = defineEmits(['update:value'])
const props = withDefaults(defineProps<IProps>(), {})
const pageData = reactive({
    value: false,
})
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    oldPassword: '',
    password: '',
    seed: '',
    publicKey: '',
    repeatPassword: '',
})
const validatePass = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入新密码'))
    } else {
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules>({
    oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    password: [
        { required: true, validator: validatePass, trigger: 'blur' },
        {
            pattern:
                '^(?:(?=.*[A-Za-z])(?=.*\\d)|(?=.*[A-Za-z])(?=.*[_`~!@#$%^&*()\\-=|{}:;,\\.\\/\\?])|(?=.*\\d)(?=.*[_`~!@#$%^&*()\\-=|{}:;,\\.\\/\\?])).{10,}$',
            message: '至少包含字母、数字、特殊字符中的两种，长度至少10位',
            trigger: 'blur',
        },
    ],
    repeatPassword: [
        { required: true, validator: validatePass2, trigger: 'blur' },
        {
            pattern:
                '^(?:(?=.*[A-Za-z])(?=.*\\d)|(?=.*[A-Za-z])(?=.*[_`~!@#$%^&*()\\-=|{}:;,\\.\\/\\?])|(?=.*\\d)(?=.*[_`~!@#$%^&*()\\-=|{}:;,\\.\\/\\?])).{10,}$',
            message: '至少包含字母、数字、特殊字符中的两种，长度至少10位',
            trigger: 'blur',
        },
    ],
})

const onCloseDialog = () => {
    ruleFormRef.value.resetFields()
    pageData.value = false
    emits('update:value', pageData.value)
}
const onSaveButtonClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(valid => {
        if (valid) {
            const crypto = new JSEncrypt()
            crypto.setPublicKey(ruleForm.publicKey)
            const oldPasswordEncrypt = crypto.encrypt(ruleForm.oldPassword)
            const passwordEncrypt = crypto.encrypt(ruleForm.password)

            UserApi.changePassword({
                seed: ruleForm.seed,
                password: passwordEncrypt,
                oldPassword: oldPasswordEncrypt,
            }).then(res => {
                let { code } = res
                ElMessage({
                    type: `${code === 0 ? 'success' : 'error'}`,
                    message: '修改成功',
                    onClose: () => {
                        //
                    },
                })
            })
        }
    })
}

watch(
    () => props.value,
    async val => {
        pageData.value = props.value
        if (val) {
            const secret = await AccountApi.getCaptchaAndKey({})

            if (secret.data?.publicKey) {
                ruleForm.seed = secret.data.seed
                ruleForm.publicKey = secret.data.publicKey
            } else {
                console.warn('公钥未获取，请重新刷新请求')
            }
        }
    },
    {
        immediate: false,
    },
)
</script>
<style lang="scss" scoped>
.tips {
    display: inline-block;
    margin-bottom: 24px;
    font-size: 14px;
    color: #999;
}
</style>
