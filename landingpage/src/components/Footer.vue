<template>
    <div>
        <footer class="text-center" id="footer">
            <h5>HOTLINE: <a href="tel:0945611103">0945 611 103</a></h5>
            <a href="/">Chính sách và điều khoản</a>
        </footer>
    </div>
</template>

<script>
export default {
    created() {
        const trackid = localStorage.getItem('_unso_track')
        if (!trackid) {
            this.$http.get('/track/init', )
            .then(res => {
                if (res.data.code === 1) {
                   localStorage.setItem('_unso_track', res.data.data)
                } else {
                    this.$bvToast.toast(res.data.message, {
                        title: `Có lỗi xảy ra !`,
                        variant: 'danger',
                        solid: true
                    })
                }
            })
            .catch(error => {
                this.$bvToast.toast(error.message, {
                    title: `Có lỗi xảy ra !`,
                    variant: 'danger',
                    solid: true
                })
            })
        }
        
    }
}
</script>

<style scoped>

    footer {
        background-color: #ff4757;
        padding: 25px 0px;
        color: #fff;
    }

    footer h5 {
        font-weight: 800;
        font-size: 1.5rem;
    }

    footer a {
        color: #fff;
        font-weight: 600;
    }

</style>