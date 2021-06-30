<template>
    <header>
        <div class="container">
            <div class="row align-items-center">
                <div class="col" :class="'col-'+ cols[0]">
                    <slot name="left" v-if="hasLeft">
                        <button class="btn btn-link p-0 border-0 text-white text-decoration-none btn-back" @click="back"><i class="bi bi-arrow-left-short"></i></button>
                    </slot>
                </div>
                <div class="col" :class="'col-'+ cols[1]"><h1 class="mb-0 text-center">{{title}}</h1></div>
                <div class="col d-flex justify-content-end" :class="'col-'+ cols[2]">
                    <!-- <button class="btn btn-link p-0 border-0 text-white text-decoration-none btn-menu"><i class="bi bi-list"></i></button> -->
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        hasLeft: { type: Boolean, default: true },
        title: { type: String, default: 'PICKA' },
        cols: { type: Array, default: () => [3, 6, 3] }
    },
    methods: {
        back: function() {
            this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    background: rgb(103,23,205);
    background: linear-gradient(90deg, rgba(103,23,205,1) 0%, rgba(23,109,225,1) 100%);
    color: white;
    .row {
        height: 60px;
    }
    .btn-back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        font-size: 40px;
        line-height: 1;
    }
    h1 {
        font-size: 18px;
        font-weight: 800;
    }
    .btn-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        font-size: 30px;
        line-height: 1;
    }
}
</style>