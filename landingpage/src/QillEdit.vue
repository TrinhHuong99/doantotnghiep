<template>
    <quill-editor v-model="value" v-bind="$attrs" :options="editorOption" v-on="listeners" ref="quillEdit">
        <div id="toolbar" slot="toolbar" >
            <button class="ql-bold"/>
            <button class="ql-italic"/>
            <button class="ql-underline"/>
            <button class="ql-strike"/>

            <button class="ql-blockquote"></button>
            <button class="ql-code-block"></button>

            <button class="ql-header" value="1"></button>
            <button class="ql-header" value="2"></button>

            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>

            <button class="ql-script" value="sub"/>
            <button class="ql-script" value="super"/>

            <button class="ql-indent" value="-1"></button>
            <button class="ql-indent" value="+1"></button>

            <button class="ql-direction" value="rtl"></button>

            <select class="ql-size">
                <option value="small" />
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option selected />
                <option value="large" />
                <option value="huge" />
            </select>

            <select class="ql-font">
                <option selected="selected" />
                <option value="serif" />
                <option value="monospace" />
            </select>

            <select class="ql-size">
                <option value="small" />
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option selected />
                <option value="large" />
                <option value="huge" />
            </select>
        </div>
    </quill-editor>
</template>

<script>
export default {
    props : {
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            editorOption: {
                modules: {
                    toolbar: '#toolbar',
                },
            }   
        }
    },
    computed: {
        listeners(){
            return {
                ...this.$listeners,
                input: (evt) => {
                    this.$emit('input',evt.target.value)
                },
                focus: (evt) => {
                    this.$emit('focus',evt)
                    this.changeFocus(true)
                },
                blur: (evt) => {
                    this.$emit('blur',evt)
                    this.changeFocus(false)
                }
            }
        },
    }
}
</script>

<style scoped>
*[quill__html]{
    display: none;

    width: 100%;
    margin: 0;
    background: rgb(29, 29, 29);
    box-sizing: border-box;
    color: rgb(204, 204, 204);
    outline: none;
    padding: 12px 15px;
    line-height: 24px;
    font-family: Consolas, Menlo, Monaco, "Courier New", monospace;
    position: absolute;
    top: 0;
    bottom: 0;
    border: none;
}

*[quill__html *= '-active-']{
    display: initial;
}
</style>