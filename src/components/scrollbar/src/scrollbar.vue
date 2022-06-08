<template>
    <div :class="[
        't-scrollbar'
    ]">
        <div class="t-scrollbar--wrap" ref="wrap" @scroll="handleScroll">
            <div class="t-scrollbar--view">
                <slot></slot>
            </div>
        </div>
        <bar :size="barSizeWidth" :move="moveX"></bar>
        <bar :vertical="true" :size="barSizeHeight" :move="moveY"></bar>
    </div>
</template>

<script>
import Bar from './bar.vue';

export default {
    name: "TScrollbar",
    components: {
        Bar
    },
    data() {
        return {
            barSizeHeight: '',
            barSizeWidth: '',
            moveY: 0,
            moveX: 0
        }
    },
    created() {
    },
    computed: {
        wrap() {
            return this.$refs.wrap;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.update()
        });
    },
    methods: {
        update() {
            let wrap = this.wrap;
            let heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
            let widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;
            this.barSizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
            this.barSizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';

        },
        handleScroll() {
            let wrap = this.wrap;
            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
        }
    }
}
</script>
<style lang="scss">

.t-scrollbar {
    overflow: hidden;
    position: relative;

    &:hover,
    &:active,
    &:focus {
        > .t-scrollbar--bar {
            opacity: 1;
            transition: opacity 340ms ease-out;
        }
    }

    .t-scrollbar--wrap {
        overflow: scroll;
        height: 100%;
        width: 100%;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    .t-scrollbar--bar {
        position: absolute;
        right: 2px;
        bottom: 2px;
        z-index: 1;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 120ms ease-out;
       .is-vertical {
            width: 6px;
            top: 2px;

            > div {
                width: 100%;
            }
        }

        .is-horizontal {
            height: 6px;
            left: 2px;

            > div {
                height: 100%;
            }
        }

        .t-scrollbar--thumb {
            position: relative;
            display: block;
            width: 0;
            height: 0;
            cursor: pointer;
            border-radius: inherit;
            background-color: rgba(#666, .3);
            transition: .3s background-color;

            &:hover {
                background-color: rgba(#666, .5);
            }
        }
    }

    .t-scrollbar--wrap {
        overflow: scroll;
        height: 100%;
    }
}

</style>
