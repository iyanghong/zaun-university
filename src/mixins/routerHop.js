/**
 * Created by yh on 2021/5/31
 */
export default {
    methods: {
        $_goArticleDetail({id, category_uuid = '', label_uuid = '', theme = 'SeaThemeBlog'}) {
            let params = {
                id
            }
            category_uuid && (params.category_uuid = category_uuid)
            label_uuid && (params.label_uuid = label_uuid)
            this.$router.push({
                name: theme + 'ArticleDetail',
                params
            });
        },
        $_goArticleList() {

        },
        $_goArticleCategory() {

        },
        $_goArticleLabel(id, theme = 'SeaThemeBlog') {
            this.$toMap({
                name: theme + 'Labels',
                params: {
                    id: id
                }
            });
        },
        $_goLogin(query) {
            let params = query ? query : {};
            params.history = this.$route.path;
            this.$toMap({
                name: 'login',
                query: params
            });
        }
    }
}
