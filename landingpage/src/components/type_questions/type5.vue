<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <div class="title_question" v-html="question.content" :ref="'select-'+ question.id ">
                </div>
                <div class="write_1">
                    <div class="content_write">
                        <quill-editor v-model="writingContent" ref="quillEdit" :toolbar="'toolbar-'+ question.id"></quill-editor>
                        <!-- <quill id="question-content" ref="myQuillEditor" toolbar="toolbar2" v-model="writingContent" /> -->
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>

import QuillEdit from '../../QillEdit.vue'
export default {
    props: {
        content : Object,
    },
    components: {
        QuillEdit
    },
    data() {
        return{
            writingContent: '',
        }
    },
    computed: {
        checkValid(){
            return this.content.checkvalid
        }
    },
    created(){
        this.question = JSON.parse(JSON.stringify(this.content))
        if (Array.isArray(this.question.answers)) {
            this.writingContent = ''
        } else {
            this.writingContent = this.question.answers
        }

        this.$set(this.question, 'checkvalid', false)
    },
    watch: {
        checkValid(){
            this.$store.dispatch('countAnswerOfPart')
        },
        writingContent(value) {
            this.$store.dispatch('setQuestionAnwswer', {
                id: this.question.id,
                value: value,
                write : true
            })
        }
    },
}
</script>
<style scoped>
.title_question{
    color: #0057a7;
    font-weight: 600;
    padding: 0px;
    overflow: hidden;
}
.quill-editor {
    margin-bottom: 10px;
}
/* textarea{
    width: 100%;
    margin: auto;
    border-radius: 10px;
    height: 150px;
} */
</style>