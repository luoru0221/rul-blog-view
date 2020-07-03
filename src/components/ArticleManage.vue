<template>
    <div>
        <el-table :stripe="true" :data="articles">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="标题" prop="articleTitle"></el-table-column>
            <el-table-column label="发布时间" prop="articleTime"></el-table-column>
            <el-table-column label="操作" prop="articleId">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle
                               @click="edit(scope.row)"></el-button>

                    <el-button type="danger" icon="el-icon-delete" circle
                               @click="del(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="确认" :visible.sync="dialogVisible" width="30%">
            <span>{{dialogMessage}}</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDel">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ArticleManage",
        data() {
            return {
                articles: [],
                dialogVisible: false,
                dialogMessage: "",
                willDelArticleId: ""
            }
        },
        methods: {
            edit(row) {
                let articleId = row.articleId;
                this.$router.push({path: `/management/editor/${articleId}`});
            },
            del(row) {
                this.dialogMessage = "确定删除“" + row.articleTitle + "”?";
                this.willDelArticleId = row.articleId;
                this.dialogVisible = true;
            },
            confirmDel() {
                let articleId = this.willDelArticleId;
                this.axios.get("/article/deleteArticle", {
                    params: {
                        articleId
                    }
                }).then(response => {
                    this.$message.success("已删除");
                    this.articles = this.articles.filter(article => article.articleId !== this.willDelArticleId);
                    this.willDelArticleId = "";
                    this.dialogVisible = false;
                }).catch(error => console.log(error));
            }
        },
        created() {
            let userId = JSON.parse(sessionStorage.getItem("user"))['userId'];
            this.axios.get("/article/getArticleByAuthor", {
                params: {
                    userId
                }
            }).then(response => {
                this.articles = response.data;
            }).catch(error => console.log(error))
        }
    }
</script>

<style scoped>

</style>
