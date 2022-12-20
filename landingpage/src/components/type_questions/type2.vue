<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <div class="item_quesion">
                    <div class="header_question">
                        <h2>Question2</h2>
                        <div class="title_question">
                            The examination of everyday human social interactions on a small scale describes:
                        </div>
                    </div>
                    <div class="content_question row">
                        <div class="item_answer">
                            <div class="character_answer">
                                A
                            </div>
                            <div class="text_answer">
                                Functionalism
                            </div>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default ({
    data() {

    },
})
</script>
<style scoped>
    .header_question h2{
        font-size: 25px;
        font-weight: 800;
        color: #0057a7;
    }
    .header_question .title_question{
        /* font-size: 23px; */
        /* color: #0057a7; */
    }
    .content_question{
        /* margin-top: 15px; */
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .item_answer {
        display: flex;
        width: 45% !important;
        /* padding: 15px; */
        margin-bottom: 20px;
        background: #e0ebf4;
        width: fit-content;
        padding: 5px 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        color: #0057a7;
        font-weight: 600;
        border: 1px solid #e0ebf4;
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
        background: #333;
        background: #22acfb;
        border: 1px solid #0057a7;
        color: #fff;
    }
    .item_answer.selected .character_answer, .item_answer:hover .character_answer{
        border: 1px solid #fff;
    }
    .item_answer:hover{
        cursor: pointer;
        background: #333;
        background: #22acfb;
        border: 1px solid #0057a7;
        color: #fff;
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
</style>
