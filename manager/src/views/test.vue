<template>
    <div>
        <b-card>
            <b-card-text>
                <b-row>
                    <b-col md="3">
                        <b-form-group label="Từ ngày" label-for="v-form-dateform">
                            <b-form-datepicker local="vi" placeholder="Từ ngày" v-model="date_from" class="mb-1" selected-variant="primary" id="v-form-dateform" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Đến ngày" label-for="v-to-dateto">
                            <b-form-datepicker local="vi" placeholder="Đến ngày" v-model="date_to" class="mb-1" selected-variant="primary" id="v-to-dateto" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="link" label-for="v-to-source">
                            <b-form-input v-model="source" placeholder="Link" id="v-to-source" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_source" label-for="v-to-utm_source">
                            <b-form-select v-model="utm_source" :options="utmSourceOption" id="v-to-utm_source"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_medium" label-for="v-to-utm_medium">
                            <b-form-select v-model="utm_medium" :options="utmMediumOption" id="v-to-utm_medium"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_campaign" label-for="v-to-utm_campaign">
                            <b-form-select v-model="utm_campaign" :options="utmCampaignOption" id="v-to-utm_campaign"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_term" label-for="v-to-utm_term">
                            <b-form-select v-model="utm_term" :options="utmTermOption" id="v-to-utm_term"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_content" label-for="v-to-utm_content">
                            <b-form-select v-model="utm_content" :options="utmContentOption" id="v-to-utm_content"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Số điện thoại" label-for="v-to-phone">
                            <b-form-input v-model="phone" placeholder="Số điện thoại" id="v-to-phone" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Số điện thoại" label-for="v-to-email">
                            <b-form-input v-model="email" placeholder="Email" id="v-to-email" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="-">
                            <download-excel class="btn w-100 mr-1 btn-success" :fetch="fetchDataExport">
                                Export Excel
                            </download-excel>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="-">
                            <b-button @click="filterData" type="submit" variant="primary" class="w-100 mr-1">LỌC</b-button>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
        <b-card>
            <b-card-text>
                <b-row>
                    <b-col md="6">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number class="pagination-success">
                            <template #prev-text>
                                <feather-icon size="18" icon="ChevronLeftIcon" />
                            </template>
                            <template #next-text>
                                <feather-icon size="18" icon="ChevronRightIcon" />
                            </template>
                        </b-pagination>
                    </b-col>
                    <b-col md="2">
                        <!-- <download-excel class="btn w-100 mr-1 btn-success" fetch="fetchDataExport(true)">
                            Export Excel
                        </download-excel> -->
                    </b-col>
                    <b-col md="4"><span class="float-right">Số lượng: <strong>{{ totalRows }}</strong></span></b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-table striped hover responsive :items="rows" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter">
                            <template #cell(learned)="data">{{ data.value == 1 ? 'Đã học' : 'Chưa học' }}</template>
                            <template #cell(status)="data">{{ data.value == 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành' }}</template>
                            <template #cell(test_id)="data">
                                <router-link v-if="data.value" :to="'/t/'+data.item.test_id">Chi tiết</router-link>
                            </template>
                            <template #cell(created_at)="data">{{ dateToTimeString(data.value) }}<br>{{ dateToDateString(data.value) }}</template>
                        </b-table>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number class="pagination-success">
                            <template #prev-text>
                                <feather-icon size="18" icon="ChevronLeftIcon" />
                            </template>
                            <template #next-text>
                                <feather-icon size="18" icon="ChevronRightIcon" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import {
    // BAvatar,
    // BBadge,
    BPagination,
    BFormGroup,
    BFormDatepicker,
    BFormInput,
    BFormSelect,
    // BDropdown,
    // BDropdownItem,
    BCard,
    BCardText,
    BButton,
    // BModal,
    BRow,
    BCol,
    // BFormTextarea,
    // BFormCheckbox,
    BTable,
} from "bootstrap-vue";

export default {
    created() {
        this.filterData();
        this.fetchUtmSource()
    },
    data() {
        return {
            learnChoose: null,
            learnOptions: [
                { value: null, text: "Tất cả" },
                { value: "1", text: "Đã học" },
                { value: "2", text: "Chưa học" },
            ],
            testStatus: null,
            testOptions: [
                { value: null, text: "Tất cả" },
                { value: "1", text: "Đã làm bài thi" },
                { value: "2", text: "Chưa làm bài thi" },
            ],
            utm_source: null,
            utm_medium: null,
            utm_campaign: null,
            utm_term: null,
            utm_content: null,
            utmSourceOption: [{ value: null, text: 'Tất cả' }],
            utmMediumOption: [{ value: null, text: 'Tất cả' }],
            utmCampaignOption: [{ value: null, text: 'Tất cả' }],
            utmTermOption: [{ value: null, text: 'Tất cả' }],
            utmContentOption: [{ value: null, text: 'Tất cả' }],
            phone: '',
            email: '',
            source: '',
            currentPage: 1,
            totalRows: 0,
            perPage: 50,
            filter: null,
            sortDirection: "asc",
            sortBy: "",
            date_from: '',
            date_to: '',
            sortDesc: false,
            rows: [],
            fields: [
                { label: "Họ tên", key: "name", sortable: true, },
                { label: "Số điện thoại", key: "phone", sortable: true },
                { label: "Email", key: "email", sortable: true },
                { label: "Trình độ", key: "learned", sortable: true },
                { label: "Trạng thái test", key: "status", sortable: true },
                { label: "Khung giờ", key: "time", sortable: true },
                { label: "Link đăng ký", key: "source", sortable: true },
                { label: "SOURCE", key: "utm_source", sortable: true },
                { label: "MEDIUM", key: "utm_medium", sortable: true },
                { label: "NAME", key: "utm_campaign", sortable: true },
                { label: "TERM", key: "utm_term", sortable: true },
                { label: "CONTENT", key: "utm_content", sortable: true },
                { label: "Ngày đăng ký", key: "created_at", sortable: true },
            ],
        };
    },
    components: {
        BRow,
        BCol,
        BTable,
        BCard,
        BCardText,
        BPagination,
        BFormGroup,
        BFormDatepicker,
        BFormSelect,
        BButton,
        BFormInput
    },
    watch: {
        currentPage: {
            handler() {
                this.filterData();
            },
            deep: true,
        },
    },
    methods: {
        fetchUtmSource() {
            this.$http.get('/tracking/utm-list')
            .then(res => {
                if (res.data.code === 1) {
                    if (res.data.data.utm_source) {
                        for (let index = 0; index < res.data.data.utm_source.length; index++) {
                            this.utmSourceOption.push({ text: res.data.data.utm_source[index].name, value: res.data.data.utm_source[index].name })
                        }
                    }
                    if (res.data.data.utm_medium) {
                        for (let index = 0; index < res.data.data.utm_medium.length; index++) {
                            this.utmMediumOption.push({ text: res.data.data.utm_medium[index].name, value: res.data.data.utm_medium[index].name })
                        }
                    }
                    if (res.data.data.utm_campaign) {
                        for (let index = 0; index < res.data.data.utm_campaign.length; index++) {
                            this.utmCampaignOption.push({ text: res.data.data.utm_campaign[index].name, value: res.data.data.utm_campaign[index].name })
                        }
                    }
                    if (res.data.data.utm_term) {
                        for (let index = 0; index < res.data.data.utm_term.length; index++) {
                            this.utmTermOption.push({ text: res.data.data.utm_term[index].name, value: res.data.data.utm_term[index].name })
                        }
                    }
                    if (res.data.data.utm_content) {
                        for (let index = 0; index < res.data.data.utm_content.length; index++) {
                            this.utmContentOption.push({ text: res.data.data.utm_content[index].name, value: res.data.data.utm_content[index].name })
                        }
                    }
                }
            })
        },
        async filterData() {
            const data = await this.fetchData()
            this.rows = data.data.data.data;
            this.totalRows = data.data.data.total;
            this.perPage = data.data.data.perPage;
        },
        async fetchData(exportData = false) {
            return this.$http
                .get("/report/synthetic", {
                    params: {
                        page: this.currentPage,
                        date_start: this.date_from,
                        date_end: this.date_to,
                        email: this.email,
                        sourse: this.sourse,
                        utm_source: this.utm_source,
                        utm_medium: this.utm_medium,
                        utm_campaign: this.utm_campaign,
                        utm_term: this.utm_term,
                        utm_content: this.utm_content,
                        phone: this.phone,
                        export_data: exportData
                    },
                })
        },
        async fetchDataExport() {
            const data = await this.fetchData(true)
            return data.data.data
        },
        dateToDateString(dateText) {
            const date = new Date(dateText)
            return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
        },
        dateToTimeString(dateText) {
            const date = new Date(dateText)
            return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
        },
    },
};
</script>

<style>
</style>
