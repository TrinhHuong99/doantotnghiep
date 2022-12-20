<template>
    <div id="app-main" :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
        <div v-if="showModal" class="thi-thu-modal">
            <transition name="modal">
                <div>
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <h5>KIỂM TRA TRÌNH ĐỘ TOEIC</h5>
                                    <span>Giúp các bạn tìm hiểu và trải nghiệm về TOEIC format mới để xác định trình độ và lập kế hoạch chinh phục điểm cao TOEIC!</span>
                                    <div class="form-dang-ky">
                                        <div class="shadow-custom">
                                            <input ref="hotenFocus" type="text" name="fullname" v-model="name" placeholder="Nhập họ và tên *">
                                        </div>
                                        <div class="shadow-custom">
                                            <span class="text-alert danger" v-if="phoneVali">Số điện thoại không hợp lệ</span>
                                            <input type="text" placeholder="Nhập số điện thoại *" name="phone" v-model="phone">
                                        </div>
                                        <div class="shadow-custom">
                                            <input type="text" placeholder="Nhập email" name="email" v-model="email">
                                        </div>
                                        <div class="shadow-custom submit-button">
                                            <button @click="pushContact()">THI THỬ NGAY</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-mask" @click="showModal = false"></div>
                </div>
            </transition>
        </div>
        <header>
            <b-container>
                <b-row>
                    <b-col cols="3">
                        <logo/>
                    </b-col>
                    <b-col cols="9" class="d-flex justify-content-end align-items-center">
                        <nav class="d-flex align-items-center">
                            <div class="btn-highline">
                                <a href="#dang-ky-thi-thu" class="btn">Đăng ký thi thử</a>
                            </div>
                            <a href="tel:0945611103">Liên hệ</a>
                        </nav>
                    </b-col>
                </b-row>
            </b-container>
        </header>
        <b-container class="mt-4">
            <b-row>
                <b-col>
                    <div id="layout-1">
                        <img :src="require('@/assets/thi-thu-toeic-online.png')" alt="unso thi thử toeic online 2021">
                        <div id="dang-ky-thi-thu" class="people-main pc">
                            <img :src="require('@/assets/people-main.png')" alt="">
                        </div>
                        <div id="dang-ky-thi-thu" class="mobile">
                            <img :src="require('@/assets/people-all.png')" alt="">
                        </div>
                        <div class="text-highline">
                            <div class="btn-highline btn-center btn-orange"><a @click="showModal = true" class="btn">THI THỬ MIỄN PHÍ</a></div>
                            <p>Trả điểm ngay sau khi nộp bài  •  Tra cứu đáp án chi tiết</p>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row class="">
                <b-col>
                    <div id="layout-2" class="mt-5">
                        <h2>ĐỀ THI BIÊN SOẠN CHUẨN CẤU TRÚC QUY ĐỊNH CỦA IIG</h2>
                        <div class="description">
                            <p>Với 200 câu hỏi trắc nghiệm Listening + Reading được cập nhật mới nhất </p>
                            <p>có chấm điểm và đáp án chi tiết</p>
                        </div>
                        <div class="cau-truc-bai-thi mb-5">
                            <img class="pc" :src="require('@/assets/cau-truc-bai-thi.png')" alt="">
                            <div class="cau-truc mobile">
                                <div class="struct-block">
                                    <div class="struct-title">
                                        <h5>LISTENING</h5>
                                        <span>100 câu/ 45 phút</span>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/struct-image.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 1</h6>
                                            <span>Mô tả hình ảnh</span>
                                            <span class="desc">6 câu hỏi</span>
                                        </div>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/part-2.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 2</h6>
                                            <span>Hỏi và đáp</span>
                                            <span class="desc">25 câu hỏi</span>
                                        </div>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/part-3.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 3</h6>
                                            <span>Đoạn hội thoại</span>
                                            <span class="desc">39 câu/ 13 đoạn</span>
                                        </div>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/part-4.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 4</h6>
                                            <span>Bài nói chuyện</span>
                                            <span class="desc">30 câu/ 10 đoạn</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="struct-block">
                                    <div class="struct-title" style="background-color: #ff4757">
                                        <h5>READING</h5>
                                        <span>100 câu/ 75 phút</span>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/part-5.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 5</h6>
                                            <span>Điền vào câu</span>
                                            <span class="desc">30 câu hỏi</span>
                                        </div>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/part-6.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 6</h6>
                                            <span>Điền vào đoạn</span>
                                            <span class="desc">16 câu/ 4 đoạn</span>
                                        </div>
                                    </div>
                                    <div class="struct-item">
                                        <div class="struct-imgae"><img :src="require('@/assets/part-7.png')" alt=""></div>
                                        <div class="struct-content">
                                            <h6 class="struct-item-title">PART 7</h6>
                                            <span>Đọc hiểu</span>
                                            <span class="desc">54 câu/ 15 đoạn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-highline btn-center"><a @click="showModal = true" class="btn cta-highline">THI THỬ MIỄN PHÍ</a></div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <Footer/>
    </div>
</template>

<script>

import { BContainer, BCol, BRow } from 'bootstrap-vue';
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default {
    components: {
        BRow,
        BContainer,
        BCol,
        Logo,
        Footer
    },
    data: function() {
        return {
            showModal: false,
            phone: '',
            name: '',
            email: '',
            phoneVali: false,
        }
    },
    created() {
        this.name = localStorage.getItem('_unso_track_name');
    },
    methods: {
        checkPhone(mobile) {
            let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if(mobile !==''){
                if (vnf_regex.test(mobile) == false) {
                    return false
                } else {
                    return true
                }
            }
        },
        pushContact() {
            const self = this
            const trackid = localStorage.getItem('_unso_track')

            if (!this.checkPhone(this.phone)) {
                this.phoneVali = true
                return
            }

            this.$http.post('/track/push-contact', {
                trackid: trackid,
                data: {
                    source: document.location.href,
                    phone: this.phone,
                    email: this.email,
                    name: this.name
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    localStorage.setItem('_unso_track_name', self.name);

                    self.phone = '',
                    self.email = '',
                    self.showModal = false

                    this.$router.push({name: 'bailamthithu'})
                }
            })

        },
    },
    watch: {
        'showModal': function(valueOld) {
            if (valueOld) {
                this.$nextTick(() => {
                    this.$refs.hotenFocus.focus()
                })
            }
        }
    }
}
</script>

<style>
.question-block {
    margin-bottom: 40px;
}
</style>