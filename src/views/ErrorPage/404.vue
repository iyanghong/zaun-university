<template>
    <error-page :width="$_width" :height="$_height"></error-page>
</template>

<script>
    import ErrorPage from '@/components/ErrorPage'
    export default {
        name: "Page404",
        components : {
            ErrorPage
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
