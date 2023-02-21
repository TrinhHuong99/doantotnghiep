'use strict'
const Database = use('Database');
const moment = use('moment');
class ReportController {

    // Chấm điểm theo part
    countResutlOfPart(part) {
        if (!part) { return '' }
        let questionCount = 0;
        let questionRightCount = 0;
        for (let index = 0; index < part.questions.length; index++) {
            if (part.questions[index].content_type === 1 || part.questions[index].content_type === 2) {
                questionCount++;
            }
            if (part.questions[index].content_type === 3) {
                questionCount += part.questions[index].option_data.length;
            }
            questionRightCount += this.checkQuestionRight(part.questions[index])
        }

        return `'${questionRightCount}/${questionCount}`
    }

    checkQuestionRight(question) {
        let rightAnswer = 0;
        if (question.content_type === 1 || question.content_type === 2) {
            const questionRight = question.option_data.filter(qs => qs.right_answer === 'true' || qs.right_answer === true)
            if (questionRight.length === question.answers.length) {
                for (let index = 0; index < questionRight.length; index++) {
                    const findIndex = question.answers.findIndex(ans => ans === questionRight[index].id)
                    if (findIndex === -1 || questionRight[index].right_answer === false) {
                        return rightAnswer
                    }
                }
                rightAnswer = 1
            }
        } else {
            for (let index = 0; index < question.option_data.length; index++) {
                const answer = question.answers[index] && question.answers[index] !== '' ? question.answers[index].trim().toLowerCase() : ''
                const option = question.option_data[index].content ? question.option_data[index].content.trim().toLowerCase() : ''
                const optionArray = option.split('|')
                for (let index2 = 0; index2 < optionArray.length; index2++) {
                    const element = optionArray[index2];
                    if (element !== '' && answer !== '' && element === answer) {
                        rightAnswer += 1
                        break
                    }
                }
            }
        }
        return rightAnswer
    }

    async TestResutl ({ request, response }) {
        let { start, end, email, phone } = request.all()

        let testList = Database.table('test_history')
        .leftJoin('contact', 'test_history.contact_id', 'contact.id')
        .join('exam', 'exam.id', 'test_history.exam_id')
        .join('contact_history', 'contact_history.id', 'test_history.contact_history')
        .select('contact.id as contact_id', 'contact.name', 'contact.phone', 'contact.subjectid', 'contact.classid', 'contact.email', 'test_history.created_at', 'test_history.time', 'test_history.confirm_phone', 'test_history.id as test_id', 'test_history.test_result')
        .where('test_history.status', 1)
        .orderBy('test_history.created_at', 'desc')

        if (start) {
            testList.where('test_history.created_at', '>', start + ' 00:00:00')
        }

        if (end) {
            testList.where('test_history.created_at', '<', end + ' 23:59:59')
        }

        if (phone) {
            testList.where('contact.phone', phone)
        }

        if (email) {
            testList.where('contact.email', email)
        }

        // console.log(testList.clone().toSQL())

        testList = await testList


        // Check số lượng part tối đa
        let partLength = 0;
        for (let index = 0; index < testList.length; index++) {
            const testData = JSON.parse(testList[index].test_result)
            if (testData.part.length > partLength) {
                partLength = testData.part.length
            }
        }

        let data = []
        for (let index = 0; index < testList.length; index++) {
            let _testInfo = {
                stt: index + 1,
                name: testList[index].name,
                age: testList[index].age,
                phone: testList[index].phone,
                email: testList[index].email,
                time: testList[index].time,
                confirm_phone: testList[index].confirm_phone,
                // learned: testList[index].learned == 1 ? 'Đã học' : 'Chưa học',
                utm_content: testList[index].utm_content,
                created_at: testList[index].created_at
            }
            const testData = JSON.parse(testList[index].test_result)

            _testInfo['test_writing'] = ''
            // Loop for part
            for (let index2 = 0; index2 < partLength; index2++) {
                _testInfo['test_'+ (index2 + 1)] = ''

                if (testData.part[index2]) {
                    if (testData.part[index2].part_type == 0) {
                        _testInfo['test_'+ (index2 + 1)] = this.countResutlOfPart(testData.part[index2])
                    }

                    if (testData.part[index2].part_type == 1) {
                        let writing = ''
                        if (testData.part[index2].writing && testData.part[index2].writing != '') {
                            writing = testData.part[index2].writing.replace(/<br>/g, '\n')
                            writing = writing.replace(/(<([^>]+)>)/ig, '')
                        }
                        _testInfo['test_writing'] = writing
                    }
                }

            }

            data.push(_testInfo)
        }

        return response.json({
            code: 1,
            data: data
        })

    }
    async teacherReport ({ request, response }) {
        let { page, date_start, date_end, classid, subjectid, teacherid, export_data } = request.all()

        if (!page) {page = 1}
        const limit = 200;

        let queryBuilder = Database.table('test_history')
          .leftJoin('exam', 'test_history.exam_id', 'exam.id')
          .leftJoin('users', 'test_history.updated_by', 'users.id')
          .where('test_history.mark_status', 1)
          .groupByRaw('test_history.updated_by, MONTH(test_history.updated_at) ')
          .count('* as total')
          .orderByRaw('MONTH(test_history.updated_at) ASC')
          .select(Database.raw('test_history.updated_by, MONTH(test_history.updated_at) as month, users.name'))
          // .select(Database.raw('test_history.tick_status'))

        if (date_start) {
            queryBuilder.where('test_history.updated_at', '>', date_start + ' 00:00:00')
        }

        if (date_end) {
            queryBuilder.where('test_history.updated_at', '<', date_end + ' 23:59:59')
        }

        if (classid) {
            queryBuilder.where('exam.classid', classid)
        }

        if (subjectid) {
            queryBuilder.where('exam.subjectid', subjectid)
        }

        if (teacherid) {
            queryBuilder.where('test_history.updated_by', teacherid)
        }

        console.log(queryBuilder.clone().toSQL())

        let resultData
        if (export_data == 'true') {
            resultData = await queryBuilder
            for (let index = 0; index < resultData.length; index++) {
                // resultData[index].learned = resultData[index].learned == 1 ? 'Đã học' : 'Chưa học'
                // resultData[index].status = resultData[index].status == 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'
                resultData[index].updated_at = this.dateToTimeString(resultData[index].updated_at) + '<br>' + this.dateToDateString(resultData[index].updated_at)
            }
        } else {
            // resultData = await queryBuilder.paginate(page, limit)
            resultData = await queryBuilder
        }

        return response.json({
            code: 1,
            data: resultData
        })
    }

    async productReport ({ request, response }) {
        let { page, date_start, date_end, classid, subjectid, export_data } = request.all()

        if (!page) {page = 1}
        const limit = 200;

        let queryBuilder = Database.table('test_history')
          .leftJoin('exam', 'test_history.exam_id', 'exam.id')
          // .groupByRaw('test_history.tick_status')
          .groupByRaw("test_history.tick_status, DATE_FORMAT(test_history.created_at, '%Y-%m')")
          .count('* as total')
          .select(Database.raw("test_history.tick_status, DATE_FORMAT(test_history.created_at, '%Y-%m') as month"))
          // .select(Database.raw('test_history.tick_status'))

        if (date_start) {
            queryBuilder.where('test_history.created_at', '>', date_start + ' 00:00:00')
        }

        if (date_end) {
            queryBuilder.where('test_history.created_at', '<', date_end + ' 23:59:59')
        }

        if (classid) {
            queryBuilder.where('exam.classid', classid)
        }

        if (subjectid) {
            queryBuilder.where('exam.subjectid', subjectid)
        }

        // console.log(queryBuilder.clone().toSQL())

        let resultData
        if (export_data == 'true') {
            resultData = await queryBuilder
            for (let index = 0; index < resultData.length; index++) {
                // resultData[index].learned = resultData[index].learned == 1 ? 'Đã học' : 'Chưa học'
                // resultData[index].status = resultData[index].status == 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'
                resultData[index].created_at = this.dateToTimeString(resultData[index].created_at) + '<br>' + this.dateToDateString(resultData[index].created_at)
            }
        } else {
            // resultData = await queryBuilder.paginate(page, limit)
            resultData = await queryBuilder
        }
        var dateStart = moment(date_start);
        var dateEnd = moment(date_end);
        var array_months = [];

        while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
            array_months.push(dateStart.format('YYYY-MM'));
            dateStart.add(1,'month');
        }
        return response.json({
            code: 1,
            data: resultData,
            array_months : array_months
        })
    }

    async SyntheticReport ({ request, response }) {
        let { date_start, date_end, utm_source, phone, email, learned, test_status, source , page, export_data } = request.all()

        if (!page) {page = 1}
        const limit = 200;

        let queryBuilder = Database.table('test_history')
        .leftJoin('contact_history', 'test_history.contact_history', 'contact_history.id')
        .leftJoin('contact', 'contact.id', 'contact_history.contact_id')
        .select('contact.name', 'contact.phone', 'contact.email', 'contact.learned', 'test_history.time', 'test_history.status', 'contact_history.source', 'contact_history.created_at')

        if (date_start) {
            queryBuilder.where('test_history.created_at', '>', date_start + ' 00:00:00')
        }

        if (date_end) {
            queryBuilder.where('test_history.created_at', '<', date_end + ' 23:59:59')
        }

        if (phone) {
            queryBuilder.where('contact.phone', phone)
        }

        if (email) {
            queryBuilder.where('contact.email', email)
        }

        if (learned) {
            queryBuilder.where('contact.learned', learned)
        }

        if (test_status) {
            queryBuilder.where('test_history.status', test_status)
        }

        if (source) {
            queryBuilder.where('contact_history.source', source)
        }

        // console.log(queryBuilder.clone().toSQL())

        let resultData
        if (export_data == 'true') {
            resultData = await queryBuilder
            for (let index = 0; index < resultData.length; index++) {
                resultData[index].learned = resultData[index].learned == 1 ? 'Đã học' : 'Chưa học'
                resultData[index].status = resultData[index].status == 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'
                resultData[index].created_at = this.dateToTimeString(resultData[index].created_at) + '<br>' + this.dateToDateString(resultData[index].created_at)
            }
        } else {
            resultData = await queryBuilder.paginate(page, limit)
        }

        return response.json({
            code: 1,
            data: resultData
        })


    }
    dateToDateString(dateText) {
        const date = new Date(dateText)
        return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    }
    dateToTimeString(dateText) {
        const date = new Date(dateText)
        return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    }
}

module.exports = ReportController
