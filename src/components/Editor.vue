<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input v-model="articleTitle" placeholder="请输入文章标题"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="dialog.dialogVisible=true">发布</el-button>
            </el-col>
        </el-row>
        <mavon-editor v-model="articleContent" ref="md" :scrollStyle="true" @imgAdd="imgAdd"/>

        <el-dialog title="标签" :visible.sync="dialog.dialogVisible">
            <el-tag
                    :key="tag"
                    v-for="tag in dialog.tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="dialog.inputVisible"
                    v-model="dialog.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogVisible= false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Editor",
        data() {
            return {
                dialog: {
                    dialogVisible: false,
                    tags: [],
                    inputVisible: false,
                    inputValue: ''
                },
                tags: [],
                articleId: "",
                articleTitle: "",
                articleContent: ""
            }
        },
        methods: {
            handleClose(tag) {
                this.dialog.tags.splice(this.dialog.tags.indexOf(tag), 1);
            },

            showInput() {
                this.dialog.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.dialog.inputValue;
                if (inputValue) {
                    this.dialog.tags.push(inputValue);
                }
                this.dialog.inputVisible = false;
                this.dialog.inputValue = '';
            },

            submit() {
                if (this.articleId === undefined) {
                    this.publish();
                } else {
                    this.editor();
                }
            },

            /**
             * 发布文章
             */
            publish() {
                let article = {
                    "articleTitle": this.articleTitle,
                    "articleContent": this.articleContent,
                    "articleAuthor": JSON.parse(sessionStorage.getItem("user"))["userId"],
                    "tags": this.dialog.tags
                };
                this.axios.post("/article/publishArticle", article)
                    .then(response => {
                        if (response.data !== null) {
                            this.$message.success("发布成功");
                            this.articleTitle = "";
                            this.articleContent = "";
                            this.dialog.tags = [];
                            this.dialog.dialogVisible = false
                        }
                    }).catch(error => console.log(error));
            },

            /**
             *修改文章
             */
            editor() {
                let article = {
                    "articleId": this.articleId,
                    "articleTitle": this.articleTitle,
                    "articleContent": this.articleContent,
                    "articleAuthor": JSON.parse(sessionStorage.getItem("user"))["userId"],
                    "tags": this.dialog.tags
                };

                this.axios.post("/article/saveEditor", article)
                    .then(response => {
                        if (response.data === true) {
                            this.$message.success("修改成功");
                            this.dialog.dialogVisible = false
                        } else {
                            this.$message.error("修改失败");
                        }
                    }).catch(error => console.log(error));
            },

            /**
             *将图片上传到服务器，返回地址替换到md中
             */
            imgAdd(pos, $file) {
                let formdata = new FormData();
                formdata.append('image', $file);
                let headers = {headers: {"Content-Type": "multipart/form-data"}};
                console.log(formdata);
                //访问后台服务器方法
                this.axios.post("/upload", formdata, headers)
                    .then(response => {
                        console.log(response);
                        this.$refs.md.$img2Url(pos, response.data.url);
                    }).catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            let articleId = this.$route.params.articleId;
            this.articleId = articleId;
            if (articleId !== undefined) {
                this.axios.get("/article/getArticleById", {
                    params: {
                        articleId
                    }
                }).then(response => {
                    let article = response.data;
                    this.articleTitle = article["articleTitle"];
                    this.tags = article["tags"];
                    this.dialog.tags = this.tags.map(obj => {
                        return obj.tagName
                    });
                    this.articleContent = article["articleContent"];
                }).catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
