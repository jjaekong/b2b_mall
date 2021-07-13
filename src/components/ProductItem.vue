<template>
    <router-link to="/" class="product-item">
        <figure>
            <img class="w-100" src="@/assets/img/dummy_product_item.jpg" alt="">
        </figure>
        <div class="brand">스타벅스</div>
        <div class="title">아이스 카페 아메리카노 Tall</div>
        <div class="d-flex align-items-center flex-wrap">
            <div class="discount-rate">18%</div>
            <div class="discount-price">3,360<span>원</span></div>
            <div class="sale-price">4,100원</div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.product-item {
    margin-bottom: 20px;
    display: block;
    text-decoration: none;
}
figure {
    margin-bottom: 10px;
}
.brand {
    font-size: 10px;
    color: rgba(#000, .9);
    font-weight: 800;
}
.title {
    font-size: 12px;
    color: rgba(#000, .9);
}
.discount-rate {
    margin-right: 5px;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    color: #fe2a36;
}
.discount-price {
    margin-right: 5px;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    color: rgba(#000, .9);
    span {
        font-family: "NanumSquareRound", sans-serif;
        font-size: 12px;
    }
}
.sale-price {
    margin-right: 5px;
    font-size: 10px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    color: #acacae;
    text-decoration: line-through;
    span {
        font-family: "NanumSquareRound", sans-serif;
    }
}
</style>