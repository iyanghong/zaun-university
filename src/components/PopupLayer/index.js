/**
 * Created by yh on 2021/7/15
 */
import PopupLayer from './src/main'
PopupLayer.install = function (Vue) {
    Vue.component(PopupLayer.name,PopupLayer);
}
export default PopupLayer;
