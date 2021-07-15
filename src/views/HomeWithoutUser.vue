<template>
    <div>
        <main class="pt-4" style="margin-bottom: var(--navbar-height)">
            <section class="recommend">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <header>
                                <h1><router-link to="/">인기추천상품 <i class="bi bi-chevron-right"></i></router-link></h1>
                            </header>
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
                    </div>
                </div>
            </section>
            <section class="benefit">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <header>
                                <h1>혜택가로 만나는 모바일 쿠폰</h1>
                            </header>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-12">
                            <div class="benefit-item benefit-item-1">
                                <div><div class="circle"><div class="discount-rate">15<span>%</span></div></div></div>
                                <div>
                                    <div class="text">
                                        <h2>신규회원</h2>
                                        <ul>
                                            <li>쿠폰 금액 <em>100,000원</em> 이상 구매 시</li>
                                            <li>연 <em>30건</em> 이상 구매 시</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-12">
                            <div class="benefit-item benefit-item-2">
                                <div><div class="circle"><div class="discount-rate">20<span>%</span></div></div></div>
                                <div>
                                    <div class="text">
                                        <h2>우수회원</h2>
                                        <ul>
                                            <li>쿠폰 금액 <em>300,000원</em> 이상 구매 시</li>
                                            <li>연 <em>50건</em> 이상 구매 시</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-12">
                            <div class="benefit-item benefit-item-3">
                                <div><div class="circle"><div class="discount-rate">30<span>%</span></div></div></div>
                                <div>
                                    <div class="text">
                                        <h2>VIP 회원</h2>
                                        <ul>
                                            <li>쿠폰 금액 <em>100,000원</em> 이상 구매 시</li>
                                            <li>연 <em>100건</em> 이상 구매 시</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-12">
                            <div class="benefit-item benefit-item-4">
                                <div><div class="circle"></div></div>
                                <div>
                                    <div class="text">
                                        <h2>선구매 할인</h2>
                                        <ul>
                                            <li>쿠폰 수량에 따라 할인가로 대량구매 후,</li>
                                            <li>원하는 때에 원하는 수량만큼 발송!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-12">
                            <div class="bulk">
                                <!-- <ul>
                                    <li>할인율은 상세한 구매 조건에 따라 달라질 수 있습니다.</li>
                                    <li>자세한 사항은 ‘대량구매 문의’를 통해 확인 가능합니다.</li>
                                </ul> -->
                                <p>※ 할인율은 상세한 구매 조건에 따라 달라질 수 있으며, 자세한 사항은 ‘대량구매 문의’를 통해 확인 가능합니다.</p>
                                <router-link to="/">대량구매 문의</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="cases">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <header>
                                <h1>활용사례 모음</h1>
                            </header>
                        </div>
                    </div>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <!-- Slides -->
                            <div class="swiper-slide">
                                <router-link to="/">
                                    <figure class="mb-0">
                                        <img src="@/assets/img/dummy_mall_tip.jpg" />
                                    </figure>
                                </router-link>
                            </div>
                            <div class="swiper-slide">
                                <router-link to="/">
                                    <figure class="mb-0">
                                        <img src="@/assets/img/dummy_mall_tip.jpg" />
                                    </figure>
                                </router-link>
                            </div>
                            <div class="swiper-slide">
                                <router-link to="/">
                                    <figure class="mb-0">
                                        <img src="@/assets/img/dummy_mall_tip.jpg" />
                                    </figure>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
export default {
    components: {
        ProductItem: () => import('@/components/ProductItem.vue'),
    },
    data: function() {
        return {
            swiper: null
        }
    },
    mounted: function() {
        this.swiper = new Swiper('.swiper-container', {
            width: 266,
            spaceBetween: 4
        });
    },
}
</script>

<style lang="scss" scoped>
.recommend {
    border-bottom: 2px solid #eee;
    header {
        h1 {
            margin-bottom: 15px;
            line-height: 1;
            a {
                font-size: 15px;
                color: #000;
                text-decoration: none;
                font-weight: 900;
                i {
                    color: #888d96;
                }
            }
        }
    }
}
.benefit {
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 2px solid #eee;
    header {
        h1 {
            margin-bottom: 15px;
            line-height: 1;
            font-size: 15px;
            color: #000;
            font-weight: 900;
        }
    }
    .benefit-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 20px 25px;
        background: #f7f7f7;
        .circle {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            width: 75px;
            height: 75px;
            background: yellow;
            border-radius: 50%;
            .discount-rate {
                font-family: 'Montserrat', sans-serif;
                color: white;
                font-size: 25px;
                letter-spacing: 1px;
                span {
                    font-size: 12px;
                }
            }
        }
        .text {
            h2 {
                font-size: 15px;
                font-weight: bold;
            }
            ul {
                margin-bottom: 0;
                padding-left: 0;
                list-style: none;
                font-weight: bold;
                li {
                    position: relative;
                    padding-left: 10px;
                    &:before {
                        position: absolute;
                        left: 0;
                        content: '\00B7';
                    }
                    em {
                        font-style: normal;
                        color: #fe5058;
                    }
                }
            }
        }
        &.benefit-item-1 {
            .circle {
                background: #ffce36;
            }
        }
        &.benefit-item-2 {
            .circle {
                background: #ff6e6e;
            }
        }
        &.benefit-item-3 {
            .circle {
                background: #366aff;
            }
        }
        &.benefit-item-4 {
            .circle {
                background: #8636ff;
            }
        }
    }
    .bulk {
        padding: 20px;
        background-color: #8636ff;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 15px;
            li {
                position: relative;
                padding-left: 15px;
                font-size: 12px;
                font-weight: 400;
                &:before {
                    position: absolute;
                    left: 0;
                    content: '※';
                }
            }
        }
        p {
            margin-bottom: 15px;
            font-size: 12px;
            font-weight: 400;
        }
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #8636ff;
            background-color: white;
            max-width: 100%;
            width: 220px;
            height: 40px;
            font-size: 15px;
            font-weight: 900;
        }
    }
}
.cases {
    padding-top: 30px;
    padding-bottom: 30px;
    header {
        h1 {
            margin-bottom: 15px;
            line-height: 1;
            font-size: 15px;
            color: #000;
            font-weight: 900;
        }
    }
}
</style>