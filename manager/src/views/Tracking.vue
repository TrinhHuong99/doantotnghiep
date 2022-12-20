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
                        <b-form-group label="utm_source" label-for="v-to-utm_source">
                            <b-form-input v-model="utm_source" placeholder="utm_source" id="v-to-utm_source" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_medium" label-for="v-to-utm_medium">
                            <b-form-input v-model="utm_medium" placeholder="utm_medium" id="v-to-utm_medium" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="3">
                        <b-form-group label="utm_campaign" label-for="v-to-utm_campaign">
                            <b-form-input v-model="utm_campaign" placeholder="utm_campaign" id="v-to-utm_campaign" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="utm_term" label-for="v-to-utm_term">
                            <b-form-input v-model="utm_term" placeholder="utm_term" id="v-to-utm_term" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="Số điện thoại" label-for="v-to-phone">
                            <b-form-input v-model="phone" placeholder="Số điện thoại" id="v-to-phone" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group label="-">
                            <b-button @click="fetchContact" type="submit" variant="primary" class="w-100 mr-1">LỌC</b-button>
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
                        <!-- <download-excel class="btn w-100 mr-1 btn-success" :data="rows">
                            Export Excel
                        </download-excel> -->
                    </b-col>
                    <b-col md="4"><span class="float-right">Số lượng: <strong>{{ totalRows }}</strong></span></b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-table striped hover responsive :items="rows" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter">
                            <template #cell(learned)="data">{{ data.value == 1 ? 'Đã học' : 'Chưa học' }}</template>
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
        this.fetchContact();
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
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            phone: '',
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
                { label: "Họ tên", key: "name" },
                { label: "Số điện thoại", key: "phone" },
                { label: "source", key: "utm_source" },
                { label: "medium", key: "utm_medium" },
                { label: "campaign", key: "utm_campaign" },
                { label: "term", key: "utm_term" },
                { label: "Ngày ghi nhận", key: "created_at" },
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
                this.fetchContact();
            },
            deep: true,
        },
    },
    methods: {
        fetchContact() {
            this.$http
                .get("/tracking", {
                    params: {
                        page: this.currentPage,
                        start: this.date_from,
                        end: this.date_to,
                        utm_source: this.utm_source,
                        utm_medium: this.utm_medium,
                        utm_campaign: this.utm_campaign,
                        utm_term: this.utm_term,
                        phone: this.phone,
                    },
                })
                .then((resp) => {
                    this.rows = resp.data.data.data;
                    this.totalRows = resp.data.data.total;
                    this.perPage = resp.data.data.perPage;
                });
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
