<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="我的文章"><ArticleList/></el-tab-pane>
            <el-tab-pane label="创建文章"><Editor/></el-tab-pane>
            <el-tab-pane label="文章管理"><ArticleManage/></el-tab-pane>
            <el-tab-pane label="回收站"><RecycleBin/></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ArticleList from "./AtricleList"
    import Editor from "./Editor";
    import ArticleManage from "./ArticleManage";
    import RecycleBin from "./RecycleBin";
    export default {
        name: "UserCenter",
        components:{
            RecycleBin,
            Editor,
            ArticleList,
            ArticleManage
        }
    }
</script>

<style scoped>

</style>
