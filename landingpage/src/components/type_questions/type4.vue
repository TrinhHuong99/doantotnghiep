<template>
    <b-container>
        <b-row>
            <div class="item_quesion">
                <div class="header_question">
                    <h2>Heading of</h2>
                </div>
                <div class="content_question row">
                    <div v-for="(value,key) in question" :key="key" class="item_answer">
                        <div class="character_answer">
                            {{key + 1}}
                        </div>
                        <div class="text_answer">
                            {{value.text}} <input v-model="input_answer" >
                        </div>
                    </div>
                </div>
            </div>
        </b-row>
    </b-container>
</template>
<script>
export default {
    data() {
        return{
            question:[
                {
                    text:'Paragraph A:',
                    input_answer:''
                }
            ]
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
        display: flex;
        margin-bottom: 20px;
        padding: 5px 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        color: #0057a7;
        font-weight: 600;
        transition: 0.3 ease;
    }
    .text_answer input{
        border: 1px solid #0057a7;
        border-radius: 12px;
        margin: 0 5px;
        height: 30px;
        padding: 0 10px;
        color: #0057a7;
    }
    .text_answer{
        margin-left: 10px;
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