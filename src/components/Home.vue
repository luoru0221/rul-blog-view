<template>
    <el-container>
        <el-aside width="180px">
            <div style="text-align: center;background-color: #1b1b22;line-height: 2.5">
                <a class="blog-title" href="/">RuL个人博客</a>
            </div>
            <el-menu
                    :default-active="this.$route.matched[1].path"
                    class="el-menu-vertical-demo"
                    background-color="#2A2935"
                    text-color="#FDFDFD"
                    active-text-color="#ffc402"
                    :router="true">
                <el-menu-item index="/customer">
                    <i class="rulfont rul-icon-navicon-wzgl"></i>
                    <span slot="title">文章</span>
                </el-menu-item>
                <el-menu-item index="/management">
                    <i class="rulfont rul-icon-gaojian-zuozhe"></i>
                    <span slot="title">个人中心</span>
                </el-menu-item>
                <el-menu-item index="/about">
                    <i class="rulfont rul-icon-guanyu"></i>
                    <span slot="title">关于</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
    }

    .blog-title {
        color: #ffc402;
        font-size: 16px;
        text-decoration: none;
    }

    .el-aside {
        background-color: #2A2935;

        .el-menu-item {
            span {
                font-size: 14px;
                font-family: "Microsoft YaHei", serif;
                letter-spacing: normal;
                margin-left: 5px;
            }
        }
    }

</style>
