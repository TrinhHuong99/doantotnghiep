<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <div :id="question.id" class="item_quesion">
                    <div class="header_question">
                        <h2><slot name="question-number"></slot></h2>
                        <div class="title_question ql-editor" v-html="question.content"></div>
                    </div>
                    <ul class="content_question">
                        <li v-for="(value, key) in question.option_data" :key="key" class="item_answer" @click="picked(key)" :class="{selected : value.choose} ">
                            <div class="character_answer">
                            {{changleCharacter(key)}}
                            </div>
                            <div class="text_answer" >
                                <span v-html="value.content"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </b-col>
        </b-row>        
    </b-container>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default ({
    props: {
        value: Object,
    },
    data() {
        return {
            question: [],
            questionSelect: [],
            content: this.value,
        }
    },
    created() {
        this.question = JSON.parse(JSON.stringify(this.value))
        // console.log(this.question);
        if (this.question.option_data) {
            for (let index = 0; index < this.question.option_data.length; index++) {
                // find in answer
                const find = this.value.answers.findIndex(ans => { return ans === this.question.option_data[index].id})
                this.$set(this.question.option_data[index], 'choose', find !== -1 ? true : false)
            }
        }
    },
    watch: {
        // question (newValue, oldValue) {
        //     console.log(newValue, oldValue);
        // },
        // 'question': {
        //     handler(value, value2){
        //         console.log(value, value2);
        //     },
        //     deep: true,
        // }
    },
    computed: {
        choose () {
            return `${this.input1}_${this.input2}_${this.input3}_${this.input4}_${this.input5}`;
        },
    },
    methods: {
        picked(key){
            // this.question.map(item => {item.choose = false})

            let answer = []

            if (this.question.number_answers == 1) {
                this.question.option_data.map(item => {item.choose = false})
                this.question.option_data[key].choose = true

            } else {
                this.question.option_data[key].choose = !this.question.option_data[key].choose
            }

            for (let index = 0; index < this.question.option_data.length; index++) {
                if (this.question.option_data[index].choose) {
                    answer.push(this.question.option_data[index].id)
                }
            }
            this.question.answers = answer
            this.$emit('input', this.question)
            
            this.$store.commit('SET_ANSWER', {
                id: this.question.id,
                value: answer
            })
    
            // console.log( this.question.id)
            // this.value.answers.push(this.question.option_data[key])
        },
        changleCharacter(character){
            let listCharacter = 'ABCDEFGHJKLM'
            return listCharacter.substr(character, 1)
        }
    },
})
</script>
<style scoped>
    .question-lock-list {
        margin-bottom: 30px;
        height: 500px;
        position: relative;
        overflow: auto;
    }
    .header_question h2{
        font-size: 25px;
        font-weight: 800;
        color: #0057a7;
    }
    .header_question .title_question{
    }
    .content_question{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
    }
    .item_answer {
        min-width: 50%;
        width: 50%;
        margin-bottom: 10px;
        padding: 5px 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        color: #212529c9;
        font-weight: 600;
        transition: 0.3 ease;
    }
    .item_answer .character_answer{
        border-radius: 50%;
        border: 1px solid #0057a7;
        padding: 4px 10px;
        margin-right: 30px;
        font-weight: 800;

    }
    .item_answer.selected{
        /* background: #333;
        background: #22acfb;
        border: 1px solid #0057a7;
        color: #fff; */
        color: #22acfb;
    }
    .item_answer.selected .character_answer, .item_answer:hover .character_answer{
        background: #22acfb;
        color: #fff;
    }
    .item_answer:hover{
        cursor: pointer;
        /* background: #333;
        background: #22acfb;
        border: 1px solid #0057a7;
        color: #fff; */
        color: #22acfb;
    }
    @media only screen and (max-width: 768px){
        .header_question .title_question {
            padding: 0;
        }
        .item_answer .character_answer {
            margin-right: 5px !important;
            padding: 2px 7px;
        }
        .header_question h2{
            font-size: 18px;
        }
        .header_question .title_question{
            /* font-size: 17px; */
        }
         .item_answer{
             width: 50% !important;

         }
          .item_quesion{
            font-size: 13px;
        }
     }
</style>
