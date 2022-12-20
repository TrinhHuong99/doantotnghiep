// import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import axiosIns from '../libs/axios'
// import state from './state'
// import getters from './getters'
// import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

// import modulCampaign from './campaign/moduleCampaign.js'
// import moduleAuth from './auth/moduleAuth.js'


export default new Vuex.Store({
    state: { //khai báo biến
        page: 1,
        tracking_id: localStorage.getItem('_hm_quiz_track'),
        questions: null,
        part: 0,
        contactInfo: {
            email: '',
            name: '',
            age: '',
            phone: '',
            learned: [],
        },
        loading: false,
    },
    getters: {
        getQuestionPart(state) {
            if (state.questions) {
                return state.questions.part[state.part]
            }
            return []
        },
        getExamPart(state) {
            if (state.questions) {
                return state.questions.part
            }
            return []
        },
        getPartTitle(state) {
            if (state.questions) {
                return state.questions.part[state.part].name
            }
            return ''
        },
        getWritingOfPart(state) {
            if (state.questions) {
                return state.questions.part[state.part].writing || ''
            }
            return ''
        },
        getPartNumber(state) {
            return state.part
        },
        countPart(state) {
            return state.questions.part.length
        }
    },
    mutations: { // thực hiện commit của action
        SET_CONTACT_INFO(state, payload) {
            state.contactInfo = payload
        },
        SET_TIME_REMAINING(state, payload) {
            state.questions.part[state.part].time_remaining = payload
            localStorage.setItem('speakupTestData', JSON.stringify(state.questions))
        },
        SET_WRITING(state, payload) {
            state.questions.part[state.part].writing = payload
            localStorage.setItem('speakupTestData', JSON.stringify(state.questions))
        },
        SET_PAGE(state, payload) {
            state.page = payload;
            // Next page save test data
            // localStorage.setItem('speakupTestData', JSON.stringify(state.questions))
        },
        SET_PART(state, payload) {
            state.part = payload
        },
        SET_TRACKING_ID(state, payload) {
            state.tracking_id = payload
        },
        SET_QUESTIONS(state, payload) {
            state.questions = payload
        },
        SET_ANSWER(state, payload) {
            const questionIndex = state.questions.part[state.part].questions.findIndex(qs => {
                return qs.id === payload.id
            })
            if(payload.write){
                state.questions.part[state.part].questions[questionIndex].answers = payload.value;
            }else{
                for (let index = 0; index < payload.value.length; index++) {
                    state.questions.part[state.part].questions[questionIndex].answers[index] = payload.value[index];
                }
                const chenhlech = state.questions.part[state.part].questions[questionIndex].answers.length - payload.value.length
                if (chenhlech > 0) {
                    state.questions.part[state.part].questions[questionIndex].answers.splice(payload.value.length, chenhlech)
                }
            }
            // state.questions.part[state.part].questions[questionIndex].answers = payload.value
            console.log(payload)
            // localStorage.setItem('speakupTestData', JSON.stringify(state.questions))
        },
        PAGE_LOADING(state, payload) {
            state.loading = payload
        },
        SET_NEXT_PART_STATE(state, payload) {
            state.nextPartState = payload
        },
        SET_CHECKVAL(state, payload){
            state.questions.part[state.part].questions[payload.id].checkvalid = payload.value;
        },
        SET_VALID(state, payload){
            state.setValid = payload
        }
    },
    actions: { // tạo 1 action
        setQuestionAnwswer({ commit, dispatch }, value) {
            commit('SET_ANSWER', value)
            dispatch('countAnswerOfPart')
        },
        countAnswerOfPart ({commit, state}) {
            let qsAnswed = 0;
            let idOfQuestion = -1;
            if (state.questions && state.questions.part[state.part]) {
                for (let index = 0; index < state.questions.part[state.part].questions.length; index++) {
                    const element = state.questions.part[state.part].questions[index]
                    let checkState = false
                    if (element.content_type == 1) {
                        if (element.answers && element.answers.length > 0) {
                            qsAnswed++;
                            checkState = true
                        }
                    }

                    if (element.content_type == 4 && typeof element.answers == 'string') {
                        // console.log(element.id, element.answers)
                        if(element.answers.trim().length < element.length_min ){
                            commit('SET_CHECKVAL', {
                                id: index,
                                value: false
                            })
                        }else{
                            commit('SET_CHECKVAL', {
                                id: index,
                                value: true
                            })
                            qsAnswed++;
                            checkState = true
                        }
                    }

                    if (!checkState && idOfQuestion == -1) {
                        idOfQuestion = state.questions.part[state.part].questions[index].id
                    }

                }
            }
            // if (state.part == 0 && qsAnswed == 20) {
            //     return commit('SET_NEXT_PART_STATE', -1)
            // }
            // if (state.part == 1 && qsAnswed == 3) {
            //     return commit('SET_NEXT_PART_STATE', -1)
            // }

            return commit('SET_NEXT_PART_STATE', idOfQuestion)
        },
        Tracking_init({ commit }) {
            let trackid = localStorage.getItem('_hm_quiz_track');
            if (!trackid) {
                axiosIns.get('/track/init',)
                    .then(res => {
                        if (res.data.code === 1) {
                            localStorage.setItem('_hm_quiz_track', res.data.data)
                            commit('SET_TRACKING_ID', res.data.data)
                        }
                    })
            } else {
                commit('SET_TRACKING_ID', trackid)
            }
        },
        Questions({ commit }, payload) {
            commit('SET_QUESTIONS', payload)
        }
    },
    modules: {
        // auth: moduleAuth,
        // campaign: modulCampaign
    },
    strict: false
})
