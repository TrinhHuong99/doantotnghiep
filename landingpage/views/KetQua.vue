<template>
    <div>
        <div id="app-main" :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
            <header>
                <b-container>
                    <b-row>
                        <b-col cols="3">
                            <logo/>
                        </b-col>
                        <b-col cols="9" class="d-flex justify-content-end align-items-center">
                        </b-col>
                    </b-row>
                </b-container>
            </header>
            <b-container class="mt-5" style="min-height: 800px;">
                <b-row class="mb-4">
                    <b-col>
                        <h2 class="title">KẾT QUẢ</h2>
                        <div class="employees-info">
                            <p>Bài làm của: <span>{{ name }}</span></p>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mb-4">
                    <b-col>
                        <div class="test-info mb-1" v-if="getResult">
                            <b-row>
                                <b-col cols="6" lg="4" class="d-flex justify-content-center align-items-center">
                                    <p class="process">Kết quả: <strong>{{ questionRight }}/{{ questionCount }}</strong></p>
                                </b-col>
                                <b-col cols="6" lg="4" class="d-flex justify-content-center align-items-center">
                                    <p class="time">Thời gian hoàn thành: <strong>{{ secondToHour(time_remaining) }} / {{ secondToHour(time_total) }}</strong></p>
                                </b-col>
                            </b-row>
                        </div>
                        <div class="test-info" v-if="getResult">
                            <b-row>
                                <b-col class="option">
                                    <p>Chú giải:</p>
                                    <p class="checked">Đáp án bạn chọn</p>
                                    <p class="right_answer">Đáp án đúng</p>
                                    <p class="choose_right">Bạn làm đúng</p>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mb-4">
                    <b-col>
                        <div v-if="!getResult" class="timeup-player">
                            <div>
                                <p>Xin chờ 1 chút!</p>
                                <!-- <div>
                                    <b-button variant="warning" class="mx-2" @click="$router.push({name: 'bailamthithu'})">LÀM BÀI TEST NGAY</b-button>
                                </div> -->
                            </div>
                        </div>
                        <div v-if="getResult && questionCount === 0" class="timeup-player">
                            <div>
                                <p>Bạn chưa có lịch sử làm bài</p>
                                <div>
                                    <b-button variant="warning" class="mx-2" @click="$router.push({name: 'bailamthithu'})">LÀM BÀI TEST NGAY</b-button>
                                </div>
                            </div>
                        </div>
                        <div v-if="getResult && questionCount" class="test-main">
                            <div class="test-part" v-for="(part, indexPart) in exam.part" :key="part.id">
                                <div class="test-part-info">
                                    <h5 class="part-title">{{ part.name }}</h5>
                                    <div class="part-description ql-editor" v-html="part.description"></div>
                                </div>
                                <div class="test-question-block">
                                    <div class="test-question" v-for="(question, index) in part.questions" :key="question.id">
                                        <div class="question-description ql-editor" v-if="question.content_type != 1" v-html="question.content"></div>
                                        <div class="question ql-editor" v-if="question.content_type == 1" v-html="'<strong>Question ' + getAmountOfPart(indexPart, index) + ' </strong>' + ( question.content ? question.content : '') "></div>
                                        <div class="option" v-if="question.content_type == 1">
                                            <div class="option" style="padding: 0px 30px;">
                                                <div class="" v-for="(option, index2) in question.options" :key="index2" :class="checkOption(option, question)">{{ (index2 + 1) + '. ' +option.answer_content }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <Footer/>
        </div>
    </div>
</template>

<script>

import { BContainer, BCol, BRow, BButton} from 'bootstrap-vue';
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default {
    components: {
        BRow,
        BContainer,
        BCol,
        BButton,
        Logo,
        Footer
    },
    data: function() {
        return {
            showModal: false,
            playStage: false,
            process: 0,
            time_total: 0,
            time_remaining: 0,
            exam: {},
            getResult: false,
            fetchDataStatus: false,
            questionRight: 0
        }
    },
    created() {
        this.couter = this.time;
        this.name = localStorage.getItem('_unso_track_name');

        let trackid = localStorage.getItem('_unso_track')
        if (!trackid) {
            this.$http.get('/track/init', )
            .then(res => {
                if (res.data.code === 1) {
                   localStorage.setItem('_unso_track', res.data.data)
                }
            })
        } else {
            this.fetchResult()
        }
    },
    methods: {
        getAmountOfPart (partIndex, questionIndex) {
            let amount = 0;
            for (let index = 0; index < partIndex; index++) {
                amount += this.exam.part[index].questions.filter(qs => qs.content_type === 1).length;
            }

            for (let index = 0; index <= questionIndex; index++) {
                if (this.exam.part[partIndex].questions[index].content_type === 1) {
                    amount += 1
                }
            }

            return amount
        },
        secondToHour(time_total) {
            return `${parseInt(time_total/60) >= 10 ? parseInt(time_total/60) : '0'+parseInt(time_total/60) }:${(time_total - (parseInt(time_total/60) * 60)) >= 10 ? (time_total - (parseInt(time_total/60) * 60)) : '0'+(time_total - (parseInt(time_total/60) * 60)) }`
        },
        checkOption(option, question) {
            let color = ''
            let check = false
            let answer = false
            if (question.answers.findIndex(ans => ans === option.answer_id) != -1) {
                color = 'checked'
                check = true
            }
            if (question.right_answer.findIndex(ans => ans === option.answer_id) != -1) {
                color = 'right_answer'
                answer = true
            }
            
            if (check && answer) {
                color = 'choose_right'
            }
            return color
        },
        fetchResult () {
            this.$http.get('/test/get-result', {
                params: {
                    trackid: localStorage.getItem('_unso_track')
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    const resData = res.data.data

                    this.exam = resData;
                    this.time_total = resData.time;
                    this.time_remaining = resData.time_remaining;

                    this.countQuestionAnser()
                }
                this.getResult = true
            })
        },
        countQuestionAnser () {

            let amount = 0;
            if (this.exam.part) {
                for (let index = 0; index < this.exam.part.length; index++) {
                    for (let index2 = 0; index2 < this.exam.part[index].questions.length; index2++) {
                        if (this.exam.part[index].questions[index2].answers.length > 0) {
                            amount += 1

                            const array1Sorted = this.exam.part[index].questions[index2].answers.slice().sort();
                            const array2Sorted = this.exam.part[index].questions[index2].right_answer.slice().sort();
                            if ( array1Sorted.every(function(value, index) { return value === array2Sorted[index]; })) {
                                this.questionRight += 1
                            }
                        }
                    }
                }

            }
            this.process = amount

        },
        selectAnswer(questionId, answerId) {
            if (questionId && answerId) {
                return true
            }
        },
    },
    computed: {
        questionCount() {
            let amount = 0;

            if (this.exam.part) {
                for (let index = 0; index < this.exam.part.length; index++) {
                    amount += this.exam.part[index].questions.filter(qs => qs.content_type === 1).length;
                }
            }
            return amount
        }
    },
    watch: {
        'showModal': function(valueOld) {
            if (valueOld) {
                this.$nextTick(() => {
                    this.$refs.hotenFocus.focus()
                })
            }
        }
    },
    updated() {
        if(this.showModal == true) {
            
        }
    }
}
</script>


<style>

    .test-block.choose_right {
        color: unset;
        font-weight: unset;
        background-color: #ecf2ff;
    }
    .option .choose_right {
        color: #41ad49;
        font-weight: bold;
        display: inline;
        position: relative;
    }

    .option .choose_right::after {
        content: '';
        width: 23px;
        height: 23px;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAXVBMVEX///9BrUk1qj4wqDo4q0ErpzYmpjGExYj8/vybz54+rEZvvXR3wHyf0aJNsVSHxovp9Orb7dyx2bSUzJfy+fOn1Krh8OK43LqMyJBUs1rI5MrT6dRetmN9w4JHr04Iki++AAABHElEQVQ4jbXT25aDIAwF0AQCYtRO6622Vf//M0cRFMG+zZwnXewVIFGAv8+jbrKsqR/f1tuclKAlQlHeXolKE+4hXaUlXhJPka+oUEt8FshMJ2MwFnQTjCYgBUVCFJArKg7xVqmAxaj3Tm58IQA6cfPioy4FNKQ+jgx0KX4k0nDah1OB7HYy2rZqFIlA1Nu97+tRdAeTTASqu33rlRWwmkig6n0VUdunSTuR+YG5KstZKNuWqkj4s6w3klMwjkP4G9m+yPJCHH2x3RVlKnDv7tY7Z0Kx77NM2jbPmlCgPiYNJTlzEnScb8lsJ0RzOFCeQwEtUzhK6zH6vs0Y/wGjgTidFnsRFnZoSUzF/m/kKi3h0j/zYcif/bf1/80v7IkLbEkqc5MAAAAASUVORK5CYII=');
        position: absolute;
        background-size: contain;
        right: -30px;
    }

    .option .checked {
        color: #ff240d;
        text-decoration-line: line-through;
        display: inline;
        position: relative;
    }

    .option .checked::after {
        content: '';
        width: 23px;
        height: 23px;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAb1BMVEW9DxD////39/f09PT19fX29vb4+Pj5+fm2AAC8AADt7e25AAD8/Py9DA3w8PC9CQr2/Pzt2tjs4uLgw8PIcXG5HB3YtLTozs3q1NLEYmPbq6vgvLy9MjLQf4C/Q0O8PT3AOTrGXF3Unp7BUFDBSkoMy1KkAAACDElEQVQ4jW2UbXuqMAyG+57WFCiiiMLc3Pz/v/EkqSDXzvohYnOTPkkTFMBBH7JpyTirD9qKcfmgW0PmAKCczW22no2BVrucnW7B8K4Xl1PG+OCMZwOlHId5Ho6lgHHBezbGEGKzDWScHk6ICWnF00DhrAnkIqSe7XOZFkyNktUkXC6FDhJtqsoF9xFR7VaKHw7ecjnKPalfK905SpVrwebP/whiPgu5RK6DchKiazZ3J8ypgCOEDrKDyEhfuMrFL3kHB8sHsdxzJ4S+RGGaOOmFme4scinpkYPgXevKNPFCj3fZHDnpEMqD32jUsTKVOCoOmB4lBEUVjlVh7IURoo8iWMVgvPJhetWsMsOeUDgFryCPa00qsycU3jLJDbetbB2lQmvaCJVugeTm7w2pStfcBfnOJBdG3IipHvQOgyOQXHjLZWISs8bBCyEB2rgj+iia1zixhcDV/ZHSYV9zqXn1cl/pp7aUnfmk9FyzrcyT38PZcku5XOTuiXnVgxlpsU757JyiPi9zbYYnvhLp8FmbYS40G3SNNper7KStHE39fy00HKFOgF/+aszF7SbgLyYtXr8ngMLlK3Z7oMNrDuJy0t40jV7PZ9wiJTzP2tM0SnvzLyEOKLFHxEQL44NSIW91raPGpui2H2+3sbe68JSto7b/vpDRIZBpf31f9CtKG9gAMB3aVxT6Gv0Df64eZwJ6G3UAAAAASUVORK5CYII=');
        position: absolute;
        background-size: contain;
        right: -30px;
    }

    .option .right_answer {
        color: #1b00ff;
    }
    
    .modal-header .close {
        padding: 1rem;
        margin: -1rem -1rem -1rem auto;
    }
    [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
        cursor: pointer;
    }
    button.close {
        padding: 0;
        background-color: transparent;
        border: 0;
    }
    .close {
        float: right;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
    }

    .employees-info {
        text-align: center;
        font-weight: 600;
    }

    .pause-player {
        text-align: center;
        background-color: #fff;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .timeup-player {
        text-align: center;
        background-color: #fff;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-weight: 800;
        text-align: center;
        color: #ff4757;
        text-shadow: 0px 0px 0px #9619248f;
    }

    .test-block {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 10px;
    }

    .test-info {
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
    }

    .test-info p {
        margin: 0;
    }

    .test-block .question {
        margin-bottom: 15px;
        text-align: left
    }

    .custom-control {
        text-align: left;
        position: relative;
        z-index: 1;
        display: block;
        min-height: 1.5rem;
        padding-left: 1.5rem;
    }
    .custom-control-inline {
        display: -ms-inline-flexbox;
        display: inline-flex;
        margin-right: 1rem;
    }

    .custom-control-input {
        position: absolute;
        left: 0px;
        top: 2px;
        z-index: -1;
        width: 1rem;
        height: 1.25rem;
    }
</style>