<template>
    <div>
        <div class="title-box">
            <h1>{{title}}</h1>
            <div class="meta-box">
                <span class="meta-list">
                    <i class="rulfont rul-icon-calendar1" style="margin-right: 5px"></i>
                    {{time}}
                </span>
                <span class="meta-list">
                    <i class="rulfont rul-icon-zuozhe1" style="margin-right: 5px"></i>
                    {{author}}
                </span>
                <span class="meta-list">
                    <i class="rulfont rul-icon-biaoqian2" style="margin-right: 5px"></i>
                    <router-link v-for="tag in tags"
                                 v-bind:to="'/customer/catalog/'+tag['tagId']" class="meta-tag">{{tag["tagName"]}}</router-link>
                </span>
            </div>
        </div>
        <vue-markdown class="article" :source="content"></vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from "vue-markdown"

    export default {
        name: "Article",
        components: {
            VueMarkdown
        },
        data() {
            return {
                title: "",
                time: "",
                author: "",
                tags: [],
                content: ""
            }
        },
        created() {
            let articleId = this.$route.params.articleId;
            this.axios.get("/article/getArticleById", {
                params: {
                    articleId
                }
            }).then(response => {
                let article = response.data;
                this.title = article["articleTitle"];
                this.time = article["articleTime"];
                this.author = article["articleAuthor"];
                this.tags = article["tags"];
                this.content = article["articleContent"];
            }).catch(error => console.log(error))
        }
    }
</script>

<style lang="less" scoped>
    .title-box {
        h1 {
            margin-top: 0;
            margin-bottom: 0;
        }

        .meta-box {
            padding: 1em 0;
            border-bottom: 1px dashed #cacaca;
            border-bottom-color: rgb(202, 202, 202);
            border-top: 1px dashed #cacaca;
            margin: 1.2em 0;

            .meta-list {
                margin-right: 25px;
                font-size: 12px;

                .meta-tag {
                    margin-right: 10px;
                    color: #757575;
                }

            }
        }
    }
</style>
