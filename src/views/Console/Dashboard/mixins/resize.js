/**
 * Created by yh on 2021/4/26
 */
// import {debounce} from "@/utils/ts-tool";

export default {
    data(){
        return {
            $_resizeHandler : null
        }
    },
    watch :{
        $_width(){
            if (this.chart) {
                this.chart.resize()
            }
        },
        $_lang(newValue,oldValue) {
            if(newValue !== oldValue){
                if(typeof this.reload === 'function'){
                    this.reload();
                }
            }
        }
    },
    mounted() {
    },
    computed : {
        $_lang(){
            return this.$store.state.app.lang;
        }
    }
}