<template>
    <div id="article-list">
        <div class="article-box" v-for="article in articles">
            <h1 class="article-title-box">
                <router-link :to="'article/'+article['articleId']" target="_blank" class="article-title">{{article['articleTitle']}}</router-link>
                <span style="font-size: 12px" class="article-time">
                    <i class="rulfont rul-icon-calendar1"></i>
                    {{article["articleTime"]}}
                </span>
            </h1>
        </div>
    </div>
</template>

<script>
    import Article from "./Article";

    export default {
        name: "ArticleList",
        components: {
            Article
        },
        data() {
            return {
                articles: []
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

<style lang="less" scoped>
    .article-title-box {
        font-size: 20px;
        font-weight: 500;
        line-height: 1.1;
        margin-top: 0;
        margin-bottom: 1.2rem;

        .article-title {
            color: #2a2935;
            text-decoration-line: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .article-time {
            margin-left: 20px;
        }
    }
</style>
