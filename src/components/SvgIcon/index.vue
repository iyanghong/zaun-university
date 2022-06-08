<template>

    <div v-if="isExternal()" :style="styleExternalIcon()" class="svg-external-icon svg-icon" v-on="$listeners"/>
    <a v-else-if="title" :title="title">
        <svg :class="svgClass()" aria-hidden="true" :title="title" v-on="$listeners">
            <use :xlink:href="getIconHref()"/>
        </svg>
    </a>
    <svg v-else :class="svgClass()" aria-hidden="true"  v-on="$listeners">
        <use :xlink:href="getIconHref()"/>
    </svg>

</template>

<script>
    import isExternal from '@/providers/validator/modules/isExternal.js'

    export default {
        name: 'SvgIcon',
        props: {
            iconClass: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                required: false
            },
            iconHref : {
                type: String,
                required: false
            },
            iconId : {
                type: String,
                required: false
            },
            type : {
                type : String,
                default : ''
            },
            title: {
                type: String,
                required: false,
                default: ''
            }
        },
        methods: {
            isExternal() {
                return isExternal.handle(this.icon)
            },
            getIconHref() {
                if(this.iconHref){
                    return  this.iconHref
                }
                if(this.iconId){
                    return `#${this.iconId}`
                }
                return `#icon-${this.icon}`
            },
            svgClass() {
                let className = 'svg-icon';
                if(this.type){
                    className += ` icon-${this.type}`
                }
                if (this.iconClass) {
                    className += ` icon-${this.iconClass}`;
                }

                return className;
            },
            styleExternalIcon() {
                return {
                    mask: `url(${this.icon}) no-repeat 50% 50%`,
                    '-webkit-mask': `url(${this.icon}) no-repeat 50% 50%`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        &.icon-success{
            color: $success;
        }
        &.icon-waring{
            color: $warning;
        }
        &.icon-danger{
            color: $danger;
        }
        &.icon-primary{
            color: $blue;
        }
        &.icon-orange{
            color: $orange;
        }
    }

    .svg-external-icon {
        background-color: currentColor;
        mask-size: cover !important;
        display: inline-block;
    }
</style>
