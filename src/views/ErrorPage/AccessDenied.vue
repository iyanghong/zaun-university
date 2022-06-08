<template>
    <error-page :width="$_width" :height="$_height" errorName="无权限" title="很抱歉，您无权限。"></error-page>
</template>

<script>
    import ErrorPage from '@/components/ErrorPage/index'

    export default {
        name: "AccessDenied",
        components: {
            ErrorPage
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>

</style>
