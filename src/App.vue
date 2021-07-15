<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>


export default {
    
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap');
$grid-gutter-width: 4px;
$position-values: (
  0: 0,
  10: 10%,
  20: 20%,
  25: 25%,
  30: 30%,
  40: 40%,
  50: 50%,
  60: 60%,
  70: 70%,
  75: 75%,
  80: 80%,
  90: 90%,
  100: 100%
);
@import "~bootstrap/scss/bootstrap";
:root {
    --navbar-height: 50px;
}
body {
    font-family: "NanumSquareRound", sans-serif; // 300, 400, 700, 800
    font-size: 12px !important;
    font-weight: 800 !important;
    color: #333 !important;
}
.container {
    padding-right: 20px;
    padding-left: 20px;
}
.form-control:not([type="file"]) {
    box-shadow: none !important;
    border-radius: 0;
    border-color: #333 !important;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding-left: 0;
    padding-right: 0;
    font-size: 15px;
    font-weight: 800 !important;
    &::placeholder {
        color: #827878 !important;
    }
}
.form-control[type="file"] {
    border-radius: 0;
    font-size: 15px;
    font-weight: 800 !important;
    border-color: #333;
    &::placeholder {
        color: #827878 !important;
    }
}
.btn-lg {
    height: 50px;
    font-size: 15px;
}
</style>