<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="logo">
            </div>

            <!-- 登录表单 :model绑定数据对象，:rules绑定验证规则对象，ref引用-->
            <el-form label-width="0px" :model="loginForm" :rules="rules" ref="loginFormRef" class="login_form">
                <!-- 用户名 prop属性用于指定对应的验证规则-->
                <el-form-item prop="email">
                    <el-input placeholder="请输入登录邮箱" v-model="loginForm.email">
                        <i slot="prefix" class="iconfont icon-user"></i>
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
                        <i slot="prefix" class="iconfont icon-3702mima"></i>
                    </el-input>
                </el-form-item>
                <!-- 按钮-->
                <el-form-item class="btns">
                    <el-button type="primary">登录</el-button>
                    <el-button type="info">重置</el-button>
                    <el-button type="warning" @click="dialogFormVisible = true">注册</el-button>
                </el-form-item>
            </el-form>

            <!--注册表单-->
            <el-dialog title="注册" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef">
                    <el-form-item label="姓名" prop="username" label-width="80px">
                        <el-input v-model="registerForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" label-width="80px">
                        <el-input v-model="registerForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" label-width="80px">
                        <el-input v-model="registerForm.code" autocomplete="off" style="width: 120px"></el-input>
                        <el-button type="primary" style="margin-left: 15px" :disabled="registerForm.disable"
                                   @click="getMessageCode">
                            {{registerForm.buttonTxt}}
                        </el-button>
                    </el-form-item>
                    <el-form-item label="密码" prop="password1" label-width="80px">
                        <el-input v-model="registerForm.password1" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2" label-width="80px">
                        <el-input v-model="registerForm.password2" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    email: "",
                    password: ""
                },
                registerForm: {
                    username: "",
                    email: "",
                    code: "",
                    password1: "",
                    password2: "",
                    disable: false,
                    buttonTxt: "获取验证码"
                },
                rules: {
                    //表单验证规则
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '请填写正确的邮箱',trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                },
                registerRules: {
                    //表单验证规则
                    username: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '请填写正确的邮箱',trigger: 'blur'}
                    ],
                    password1: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                dialogFormVisible: false
            }
        },
        methods: {
            getMessageCode() {
                this.countDown();
            },
            countDown() {
                let timeCount = 60;
                this.registerForm.disable = true;
                this.registerForm.buttonTxt = '重新发送(' + timeCount + ')';
                let clock = window.setInterval(() => {
                    timeCount--;
                    this.registerForm.buttonTxt = '重新发送(' + timeCount + ')';
                    if (timeCount === 0) {
                        window.clearInterval(clock);
                        this.registerForm.buttonTxt = '重新发送';
                        this.registerForm.disable = false;
                    }
                }, 1000)
            },
        },
        created() {

        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2A2935;
        height: 100%;
        width: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 39%;
        top: 25%;

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>
