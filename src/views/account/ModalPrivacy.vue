<template>
    <div class="modal" tabindex="-1" id="modal-privacy" data-bs-backdrop="false">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <Header :hasLeft="false" title="개인정보 수집 및 이용 동의" :cols="[2, 8, 2]">
                    <template slot="right">
                        <button class="btn btn-link p-0 border-0 text-white text-decoration-none" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
                    </template>
                </Header>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        Header: () => import('@/components/Header.vue')
    }
}
</script>