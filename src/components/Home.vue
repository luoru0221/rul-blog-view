<template>
    <el-container>
        <el-aside width="200px">
            <h2>Aside</h2>
        </el-aside>
        <el-main>
            <h2>Main</h2>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
