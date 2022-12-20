'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=> {

    // Thêm đề thi
    Route.post('/create-exam', 'TestController.createExam').middleware(['cAuth', 'cEditor'])
    // Route.post('/create-exam', 'TestController.createExam')
    // Sửa đề thi
    Route.post('/edit-exam', 'TestController.editExam').middleware(['cAuth', 'cEditor'])
    // Route.post('/edit-exam', 'TestController.editExam')
    // Lấy list đề thi
    Route.get('/get-exam-admin', 'TestController.getExamAdmin').middleware(['cAuth'])
    // Xóa đề
    Route.post('/delete-exam', 'TestController.deleteExam').middleware(['cAuth', 'cEditor'])

    // Xóa part đề
    Route.delete('/delete-exam-part', 'TestController.deleteExamPart').middleware(['cAuth', 'cEditor'])
    // Lay part of de thi
    Route.get('/get-exam-part', 'TestController.getExamPart').middleware(['cAuth'])
    // Tạo part đề thi
    Route.post('/create-exam-part', 'TestController.createExamPart').middleware(['cAuth', 'cEditor'])
    // Sửa part đề thi
    Route.post('/edit-exam-part', 'TestController.editExamPart').middleware(['cAuth', 'cEditor'])

    // Manage lấy câu hỏi
    Route.get('/get-questions-admin', 'TestController.getQuestionAdmin').middleware(['cAuth'])

    // Manage xóa câu hỏi
    Route.delete('/delete-questions', 'TestController.deleteQuestion').middleware(['cAuth', 'cEditor'])

    // Manage thêm câu hỏi
    Route.post('/add-questions', 'TestController.addQuestion').middleware(['cAuth', 'cEditor'])
    // Route.post('/add-questions', 'TestController.addQuestion')

    // Manage sửa câu hỏi
    Route.post('/edit-questions', 'TestController.editQuestion').middleware(['cAuth', 'cEditor'])
    // Route.post('/edit-questions', 'TestController.editQuestion')

    // Lấy câu hỏi
    // Route.get('/get-questions', 'TestController.getQuestion')
    Route.get('/get-questions', 'TestController.getQuestionNotCheckTested')
    
    Route.get('/get-question-no-tracking', 'TestController.getQuestionNoTracking')

    // Lưu bài test
    Route.post('/test-save', 'TestController.saveTest')

    // Submit bài thi
    Route.post('/test-submit', 'TestController.submit')

    // Submit bài thi thủ công
    Route.get('/test-submited', 'TestController.submited')

    // Lấy kết quả bài thi
     Route.get('/get-result', 'TestController.getResult')

    // Manage thêm lớp
    Route.post('/create-class', 'TestController.createClass').middleware(['cAuth', 'cEditor'])

    // Manage Lấy ra danh sách lớp
    Route.get('/get-class', 'TestController.getClass')

    //  Manage Sửa lớp
    Route.post('/edit-class', 'TestController.editClass').middleware(['cAuth', 'cEditor'])

    // Manage Xóa lớp khỏi danh sách
    Route.post('/delete-class', 'TestController.deleteClass').middleware(['cAuth', 'cEditor'])

    // Manage Lấy ra danh sách môn học
    Route.get('/get-subject', 'TestController.getSubjects')

      // Manage thêm môn học
    Route.post('/create-subject', 'TestController.createSubject').middleware(['cAuth', 'cEditor'])

    //  Manage Sửa môn học
    Route.post('/edit-subject', 'TestController.editSubject').middleware(['cAuth', 'cEditor'])

    // Manage Xóa môn học khỏi danh sách
    Route.post('/delete-subject', 'TestController.deleteSubject').middleware(['cAuth', 'cEditor'])

      // Manage Lấy ra danh sách môn học
    Route.get('/get-topic-type', 'TestController.getTopicType')

      // Manage thêm môn học
    Route.post('/create-topic-type', 'TestController.createTopicType').middleware(['cAuth', 'cEditor'])

    //  Manage Sửa môn học
    Route.post('/edit-topic-type', 'TestController.editTopicType').middleware(['cAuth', 'cEditor'])

    // Manage Xóa môn học khỏi danh sách
    Route.post('/delete-topic-type', 'TestController.deleteTopicType').middleware(['cAuth', 'cEditor'])

    Route.post('/update-position', 'TestController.updatePosition').middleware(['cAuth'])

    // Lấy bài làm đã lưu
    Route.get('/get-history', 'TestController.getHistory').middleware(['cAuth'])

    Route.get('/download/:slug', 'ImageController.download')

    Route.post('/uploads', 'ImageController.fileUpload').middleware(['cAuth'])
    Route.post('/update-mark', 'TestController.UpdateMark').middleware(['cAuth'])

    Route.get('/contact', 'ContactController.getContact').middleware(['cAuth'])
    Route.get('/test-history', 'TestController.getTestHistory').middleware(['cAuth'])
    Route.get('/test-detail', 'TestController.getTestDetail').middleware(['cAuth'])

    Route.get('/tracking', 'ContactController.getContactTracking').middleware(['cAuth'])

    // Tracking push contact
    Route.post('/track/push-contact', 'TrackController.pushContract')
    // Lấy ra trackid contact
    // Route.post('/track/contact', 'TrackController.getTrackidContact
    // Tracking gui event
    Route.get('/track/sendEvent', 'TrackController.sendEvent')
    // Tracking khởi tạo mã
    Route.get('/track/init', 'TrackController.createNewTrack')
    // Lấy các tracking utm
    Route.get('/tracking/utm-list', 'TrackController.getUtmList')

    Route.get('/run', 'TestController.runjob')

    Route.post('/account-verify', 'AccountController.verifyGoogle')

    Route.get('/report/synthetic', 'ReportController.SyntheticReport').middleware(['cAuth'])

    Route.get('/report/test-result', 'ReportController.TestResutl')
    Route.get('/report/product-report', 'ReportController.productReport')
    Route.get('/report/teacher-report', 'ReportController.teacherReport')

    Route.get('/test', 'TrackController.pushContactToCrmm')
}).prefix('/api')


Route.any('*', () => 'Where are you going ?')
