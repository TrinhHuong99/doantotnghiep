<template>
    <b-container>
        <b-row>
            <div  class="item_quesion">
                <div class="header_question">
                    <h2><slot name="question-number"></slot></h2>
                </div>
                <div class="content_question row">
                    <div class="item_answer ql-editor">
                        <!-- <div class="character_answer">
                            1.
                        </div> -->
                        <component :is="dynamicComponent" />
                        <!-- <div class="text_answer" v-html="parseContent(content.content)"> -->
                            <!-- John likes <input v-model="message" > football. -->
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </b-row>
    </b-container>
</template>
<script>
export default {
    props: {
        content: Object
    },
    created() {
        // console.log(this.content.answers[0])
    },
    methods: {
        parseContent(content) {

            const regex = /\$/gi
            let result
            const indices = [];
            while ((result = regex.exec(content))) {
                indices.push(result.index);
            }
            for (let index = indices.length - 1; index >= 0; index--) {
                content = `${content.substr(0, indices[index])}<input @keyup="inputChange(${index}, ${this.content.id})" v-model="answer[${index}]" data="${this.content.answers[index] || ''}" ref="answer_input_${index}" id_data="${this.content.id}" >${content.substr(indices[index] + 1, content.length)}`
            }

            return content
        },
    },
    computed: {
        dynamicComponent: function() {
            return {
                template: `<div class="text_answer">${this.parseContent(this.content.content)}</div>`,
                methods: {
                    inputChange(index, id) {
                        // console.log(index, id)
                        this.$store.commit('SET_ANSWER', {
                            id: id,
                            value: this.answer
                        })
                    }
                },
                data() {
                    return {
                        answer: []
                    }
                },
                mounted() {
                    
                    let indexOfItem = 0;
                    const self = this
                    Object.keys(self.$refs).forEach(()=> {
                        self.$set(self.answer, indexOfItem, '')
                        self.answer[indexOfItem] = self.$refs['answer_input_'+indexOfItem].getAttribute('data')
                        indexOfItem++
                    })

                    // const regex = /\$/gi
                    // let result
                    // const indices = [];
                    // while ((result = regex.exec(this.content.content))) {
                    //     indices.push(result.index);
                    // }
                    // this.answer = this.$refs.answer_input.getAttribute('data')
                },
                watch: {
                    // answer(value) {
                    //     console.log(value)
                    //     // console.log(parseInt(this.$refs.answer_input_0.getAttribute('id_data')))
                    //     this.$store.commit('SET_ANSWER', {
                    //         id: parseInt(this.$refs.answer_input_0.getAttribute('id_data')),
                    //         value: value
                    //     })
                    // }
                }
            }
        }
    },
    watch: {
    },
    data() {
        return{
            message: '',
        }
    }
}
</script>
<style scoped>
    .header_question h2{
        font-size: 25px;
        font-weight: 800;
        color: #0057a7;
    }
    .content_question{
        /* margin-top: 15px; */
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .item_answer {
        /* display: flex; */
        margin-bottom: 10px;
        padding: 5px 20px;
        border-radius: 15px;
        /* display: flex; */
        align-items: center;
        color: #0057a7;
        font-weight: 600;
        transition: 0.3 ease;
    }
    .text_answer{
        margin-left: 10px;
    }
</style>

<style>
    .text_answer input{
        border: 1px solid #0057a7;
        border-radius: 12px;
        margin: 0 5px;
        height: 30px;
        padding: 0 10px;
        color: #0057a7;
    }
    @media only screen and (max-width: 768px){
        .header_question h2{
            font-size: 18px;
        }
        .header_question .title_question{
            /* font-size: 17px; */
        }
         .item_answer{
             width: 100% !important;

         }
     }
    
    @media only screen and (max-width: 500px){
        .text_answer input{
            width: 100px;
        }
     }
</style>