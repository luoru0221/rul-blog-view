<template>
    <div id="article">
        <el-divider content-position="left">文章列表</el-divider>
        <div class="article-list">
            <div class="article-box" v-for="article in catalog">
                <h2 class="article-title-box">
                    <router-link v-bind:to="'/customer/article/'+article['articleId']" class="article-title">
                        {{article["articleTitle"]}}
                    </router-link>
                </h2>
                <div class="mate-box">
                    <span>
                    <i class="rulfont rul-icon-calendar1"></i>
                        {{article["articleTime"]}}
                    </span>
                    <span>
                    <i class="rulfont rul-icon-zuozhe1"></i>
                        {{article["articleAuthor"]}}
                    </span>
                </div>
                <div class="label-box">
                    <i class="rulfont rul-icon-biaoqian2"></i>
                    <router-link class="label" v-for="tag in article['tags']"
                                 v-bind:to="'/customer/catalog/'+tag['tagId']">{{tag["tagName"]}}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        data() {
            return {
                catalog: []
            }
        },
        created() {
            let type = this.$route.params.type;
            if (type === undefined) {
                this.axios.get("/article/getAllArticle")
                    .then(response => {
                        this.catalog = response.data;
                    }).catch(error => console.log(error));
            } else {
                this.axios.get("/article/getArticleByTag", {
                    params: {
                        "tagId": type
                    }
                }).then(response => {
                    this.catalog = response.data;
                }).catch(error => console.log(error));
            }
        },
        watch: {
            $route(to) {
                let type = to.params.type;
                if (type === undefined) {
                    this.axios.get("/article/getAllArticle")
                        .then(response => {
                            this.catalog = response.data;
                        }).catch(error => console.log(error));
                } else {
                    this.axios.get("/article/getArticleByTag", {
                        params: {
                            "tagId": type
                        }
                    }).then(response => {
                        this.catalog = response.data;
                    }).catch(error => console.log(error));
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-divider {
        margin-top: 12px;
        margin-bottom: 36px;
    }

    .el-divider__text {
        font-size: 20px;
        color: #999999;
    }

    .article-box {
        margin-top: 1em;
    }

    .article-title-box {
        font-size: 24px;
        font-weight: 500;
        line-height: 1.1;
        margin-top: 0;
        margin-bottom: 0.8rem;

        .article-title {
            color: #2a2935;
            text-decoration-line: none;
        }

        a:hover {
            text-decoration: underline;
        }
    }

    .mate-box {
        line-height: 1.1;
        padding: 0;

        span {
            margin-left: 1em;
            margin-right: 2em;
            font-size: 12px;
        }
    }

    .label-box {
        font-size: 12px;
        padding: 0;
        margin: 1em;

        i {
            margin-right: 6px;
        }

        .label {
            color: #757575;
            margin-right: 10px;
        }
    }

</style>
