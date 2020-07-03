<template>
    <div>
        <el-table :stripe="true" :data="articles">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="标题" prop="articleTitle"></el-table-column>
            <el-table-column label="标签" prop="tags">
                <template slot-scope="scope">
                    <el-tag v-for="tag in scope.row['tags']" type="warning"
                            size="medium" style="margin-right: 2px">
                        {{ tag['tagName']}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="articleId">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-refresh-left" circle
                               @click="recoverArticle(scope.row)"></el-button>

                    <el-button type="danger" icon="el-icon-delete" circle
                               @click="delBackup(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    export default {
        name: "RecycleBin",
        data() {
            return {
                articles: []
            }
        },
        methods: {
            delBackup(article) {
                this.$confirm("确定永久删除“" + article['articleTitle'] + "”?")
                    .then(_ => {
                        let articleId = article['articleId'];
                        this.axios.get("/article/deleteBackup", {
                            params: {
                                "userId": JSON.parse(sessionStorage.getItem("user"))['userId'],
                                "articleId": articleId
                            }
                        }).then(response => {
                            if (response.data === true) {
                                this.articles = this.articles.filter(article => article.articleId !== articleId);
                                this.$message.success("删除成功");
                            } else {
                                this.$message.error("删除失败，请稍后重试");
                            }
                        }).catch(error => console.log(error))
                    })
            },

            recoverArticle(article) {
                this.$confirm("确定恢复“" + article['articleTitle'] + "”?")
                    .then(_ => {
                        let articleId = article['articleId'];
                        this.axios.get("/article/recoverArticle", {
                            params: {
                                articleId
                            }
                        }).then(response => {
                            if (response.status === 200) {
                                this.articles = this.articles.filter(article => article.articleId !== articleId);
                                this.$message.success("已恢复");
                            } else {
                                this.$message.error("恢复失败，请稍后重试");
                            }
                        }).catch(error => console.log(error))
                    })
            }
        },

        created() {
            this.axios.get("/article/getBackup", {
                params: {
                    userId: JSON.parse(sessionStorage.getItem("user"))["userId"]
                }
            }).then(response => {
                this.articles = response.data;
            }).catch(error => console.log(error));
        }
    }
</script>

<style scoped>

</style>
