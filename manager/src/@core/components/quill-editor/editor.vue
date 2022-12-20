<template>
  <div class="quill-editor">
    <!-- <slot name="toolbar"></slot> -->
    <div :id="toolbar" slot="toolbar" >
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
        <select class="ql-align">
          <option value=""></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <select class="ql-size">
            <option value="small" />
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
            <option selected />
            <option value="large" />
            <option value="huge" />
        </select>

        <select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected="selected"></option>
        </select>
        <select class="ql-color"><option selected="selected"></option><option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option value="#ffffff"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option></select>
        <select class="ql-background"><option value="#000000"></option><option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option selected="selected"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option></select>
        <select class="ql-align" style="display: none;"><option selected="selected"></option><option value="center"></option><option value="right"></option><option value="justify"></option></select>
        <button type="button" class="ql-clean"></button>
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-video"></button>
        <button class="ql-table">Table</button>
        <button class="ql-audio2">Audio</button>
    </div>
    <div ref="editor"></div>
  </div>
</template>

<script>
  // require sources
  import _Quill from 'quill'
  import * as QuillTableUI from 'quill-table-ui'

  import Config from '../../../../config'

  const Quill = window.Quill || _Quill
  Quill.register({
    'modules/tableUI': QuillTableUI.default
  }, true)

  const defaultOptions = {
    theme: 'snow',
    boundary: document.body,
    formats: [
        "background",
        "bold",
        "color",
        "font",
        "code",
        "italic",
        "link",
        "size",
        "strike",
        "script",
        "underline",
        "blockquote",
        // "header",
        "indent",
        // "list", <-- commented-out to suppress auto bullets
        "align",
        "direction",
        "code-block",
        "formula",
        "image",
        "video"
    ],
    modules: {
      table: true,
      tableUI: true,
      toolbar: '#toolbar'
    //   [
    //     ['bold', 'italic', 'underline', 'strike'],
    //     ['blockquote', 'code-block'],
    //     [{ 'header': 1 }, { 'header': 2 }],
    //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //     [{ 'script': 'sub' }, { 'script': 'super' }],
    //     [{ 'indent': '-1' }, { 'indent': '+1' }],
    //     [{ 'direction': 'rtl' }],
    //     [{ 'size': ['small', false, 'large', 'huge'] }],
    //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //     [{ 'color': [] }, { 'background': [] }],
    //     [{ 'font': [] }],
    //     [{ 'align': [] }],
    //     ['clean'],
    //     ['table'],
    //     ['link', 'image', 'video']
    //   ]
    },
    placeholder: 'Insert text here ...',
    readOnly: false
  }
  // pollfill
  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value (target, varArgs) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object')
        }
        const to = Object(target)
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index]
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey]
              }
            }
          }
        }
        return to
      },
      writable: true,
      configurable: true
    })
  }
  // export
  export default {
    name: 'quill-editor',
    data () {
      return {
        _options: {},
        _content: '',
        defaultOptions,
        quill: null,
        table: null
      }
    },
    props: {
      toolbar: {
        type: String,
        default: 'toolbar'
      },
      content: String,
      value: String,
      disabled: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        required: false,
        default: () => ({})
      },
      globalOptions: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    mounted () {
      this.$nextTick(()=> {
        this.initialize()
      })
    },
    beforeDestroy () {
      this.quill = null
      delete this.quill
      this.$refs.editor = null
    },
    methods: {
      // Init Quill instance
      initialize () {
        this.defaultOptions.modules.toolbar = '#' + this.toolbar
        if (this.$el) {
          // Options
          this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options)
          // Instance
          this.quill = new Quill(this.$refs.editor, this._options)
          this.table = this.quill.getModule('table')
          
          this.quill.enable(false)
          // Set editor content
          if (this.value || this.content) {
            const content = this.quill.clipboard.convert({html:this.value || this.content})
            this.quill.setContents(content)
          }
          // Disabled editor
          if (!this.disabled) {
            this.quill.enable(true)
          }
          // Mark model as touched if editor lost focus
          this.quill.on('selection-change', range => {
            if (!range) {
              this.$emit('blur', this.quill)
            } else {
              this.$emit('focus', this.quill)
            }
          })
          // Update model if text changes
          this.quill.on('text-change', (delta, oldDelta, source) => {
            let html = this.$refs.editor.children[0].innerHTML
            const quill = this.quill
            const text = this.quill.getText()
            if (html === '<p><br></p>') html = ''
            this._content = html
            this.$emit('input', this._content)
            this.$emit('change', { html, text, quill })
          })
          // Emit ready event
          this.$emit('ready', this.quill)

          document.querySelector('.ql-table').addEventListener('click', () => {
            this.table.insertTable(1, 0)
          })
          document.querySelector('.ql-audio2').addEventListener('click', () => {
            // this.table.insertTable(1, 0)
            console.log('1232')
            this.updateAudio()
          })
        //   document.addEventListener('click', () => {
        //     const tableOption = document.querySelector('.ql-table-menu')
        //     if (tableOption) {
        //         tableOption.remove()
        //     }
        //   })
        }
      },
      updateAudio() {
        const self = this;
        const uploadConfig = {
          action: `${Config.apiUrl}/uploads`,
          methods: 'POST',
          res: (response) => {
              return Config.assetUrl + response.data.src
          },
          // token: sessionStorage.token,
          name: 'file',
          // size: 500,
          accept: 'audio/mp3'
        };
        let fileInput = document.querySelector(`#${this.toolbar} input.ql-audio[type=file]`);
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-audio');
            // 监听选择文件
            fileInput.addEventListener('change', () => {
                // change事件
                if (uploadConfig.change) {
                    uploadConfig.change(formData);
                }
                // 如果图片限制大小
                if (uploadConfig.size && fileInput.files[0].size >= uploadConfig.size * 1024) {
                    fileInput.value = '';
                    return;
                }
                // 创建formData
                var formData = new FormData();
                formData.append(uploadConfig.name, fileInput.files[0]);
                // 如果需要token且存在token
                if (uploadConfig.token) {
                    formData.append('token', uploadConfig.token);
                }
                // 图片上传
                const xhr = new XMLHttpRequest();
                xhr.open(uploadConfig.methods, uploadConfig.action, true);
                // 设置请求头
                if (uploadConfig.header) {
                    uploadConfig.header(xhr, formData);
                }
                // 上传数据成功，会触发
                xhr.onload = function (e) {
                    if (xhr.status === 200) {
                        const res = JSON.parse(xhr.responseText);
                        const url = uploadConfig.res(res);
                        console.log(res)
                        const length = self.quill.getSelection(true).index;
                        if (res.data.type === 'audio') {
                            self.quill.insertEmbed(length, 'audio', url)
                        } else {
                            self.quill.insertEmbed(length, 'image', url);
                        }
                        self.quill.setSelection(length + 1);
                        if (uploadConfig.success) {
                            uploadConfig.success();
                        }
                    }
                    fileInput.value = '';
                };
                // 开始上传数据
                xhr.upload.onloadstart = function (e) {
                    fileInput.value = '';
                    // console.log('开始上传')
                    if (uploadConfig.start) {
                        uploadConfig.start();
                    }
                };
                // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                xhr.upload.onerror = function (e) {
                    if (uploadConfig.error) {
                        uploadConfig.error();
                    }
                };
                // 上传数据完成（成功或者失败）时会触发
                xhr.upload.onloadend = function (e) {
                    // console.log('上传结束')
                    if (uploadConfig.end) {
                        uploadConfig.end();
                    }
                };
                xhr.send(formData);
            });
            document.querySelector(`#${this.toolbar}`).appendChild(fileInput);
        }

        document.querySelector(`#${this.toolbar} input.ql-audio[type=file]`).click()
      }
    },
    watch: {
      // Watch content change
      content (newVal, oldVal) {
          console.log(newVal)
        if (this.quill) {
            debugger
          if (newVal && newVal !== this._content) {
            this._content = newVal
            const content = this.quill.clipboard.convert({html:newVal})
            this.quill.setContents(content)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      // Watch content change
      value (newVal, oldVal) {
        if (this.quill) {
          if (newVal && newVal !== this._content) {
            this._content = newVal
            const content = this.quill.clipboard.convert({html:newVal})
            this.quill.setContents(content)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      // Watch disabled change
      disabled (newVal, oldVal) {
        if (this.quill) {
          this.quill.enable(!newVal)
        }
      }
    }
  }
</script>

<style>
.ql-table-toggle{display:flex;align-items:center;justify-content:center;position:absolute;background:#fff;border:2px solid #e9ebf0;border-radius:50%;margin:3px 0 0 -22px;width:18px;height:18px;top:0;left:0;cursor:pointer;fill:#b9bec7}.ql-table-toggle_hidden{display:none}.ql-table-toggle:hover{border-color:#b9bec7}.ql-table-menu{top:0;left:0;position:absolute;background:#fff;z-index:2100;box-shadow:rgba(15,15,15,0.05) 0 0 0 1px,rgba(15,15,15,0.1) 0 3px 6px,rgba(15,15,15,0.2) 0 9px 24px;border-radius:4px;animation:fadeIn 0.05s ease-in forwards}.ql-table-menu__item{display:flex;align-items:center;cursor:pointer;min-height:32px;padding:5px}.ql-table-menu__item:hover{background-color:#fafbfc}.ql-table-menu__item-icon{margin-right:5px}.ql-table-menu__item-text{font:300 12px}
.ql-snow.ql-toolbar input.ql-audio[type=file] {
    display: none;
}
</style>