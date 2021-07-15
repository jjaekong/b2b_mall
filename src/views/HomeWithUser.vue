<template>
    <div>
        <main class="pt-4" style="margin-bottom: var(--navbar-height)">
            <section class="products">
                <div class="container">
                    <div class="row justify-content-between align-items-center mb-3">
                        <div class="col col-6">
                            <header>
                                <h1 class="mb-0"><span>1,024</span>개 상품</h1>
                            </header>
                        </div>
                        <div class="col col-6 d-flex justify-content-end">
                            <div class="dropdown">
                                <button class="btn btn-sm dropdown-toggle rounded-0" type="button" data-bs-toggle="dropdown">
                                    인기순
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#">인기순</a></li>
                                    <li><a class="dropdown-item" href="#">최신순</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                        <div class="col col-6">
                            <ProductItem />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    components: {
        ProductItem: () => import('@/components/ProductItem.vue'),
    }
}
</script>

<style lang="scss" scoped>
.products {
    border-bottom: 2px solid #eee;
    header {
        h1 {
            margin-bottom: 15px;
            line-height: 1;
            font-size: 15px;
            font-weight: 900;
            color: #000;
            span {
                color: #fe5058;
            }
        }
    }
    .dropdown {
        > .btn {
            padding: 0;
            width: 60px;
            height: 22px;
            border: 1px solid #cdcdce;
        }
        .dropdown-menu {
            top: 100%;
        }
    }
}
</style>