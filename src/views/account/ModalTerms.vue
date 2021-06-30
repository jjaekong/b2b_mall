<template>
    <div class="modal" tabindex="-1" id="modal-terms" data-bs-backdrop="false">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <Header :hasLeft="false" title="이용약관 동의">
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