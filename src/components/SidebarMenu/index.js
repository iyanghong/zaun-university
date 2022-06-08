import SidebarMenu from './src/menu'

SidebarMenu.install = (Vue) => {
    Vue.component(SidebarMenu.name,SidebarMenu);
}
export default SidebarMenu
