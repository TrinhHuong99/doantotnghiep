'use strict'

const Database = use('Database')
const sgMail = require('@sendgrid/mail')
const Config = use('Config');
// const Logger = use('Test/Logger');
sgMail.setApiKey(Config.get('app.Sendgrid.SENDGRID_API_KEY'))
const nodemailer = require('nodemailer');

const DB_SOURCE = 'email_template'

class EmailController {


    /**
     *
     * @param {Auth} auth auth data
     * @param {Object} data email data
     * @returns email_template id
     */
    async _storeEmail (auth, data) {
        try {
            data.update_by = auth.user.id

            if(Object.prototype.hasOwnProperty.call(data, 'id') && data.id) {
                const checkEmail = await Database.table(DB_SOURCE)
                .where('id', data.id)
                .first()

                if (checkEmail) {

                    await Database.table(DB_SOURCE)
                    .where('id', data.id)
                    .update(data)

                    return data.id
                }
            }

            data.create_by = auth.user.id

            const insertEmailTemplate = await Database.table(DB_SOURCE)
            .insert(data)

            return insertEmailTemplate[0]
        } catch (error) {
            // Logger.error(error, 'EmailController._storeEmail')

            return false
        }
    }


    /**
     * Request
     */
    async emailStoreHandle ({ request, response, auth }) {
        const { id, title, email_title, email_html, email_design, email_from_name } =  request.all()

        const emailId = await this._storeEmail(auth, {
            id,
            title,
            email_title,
            email_html,
            email_design,
            email_from_name,
        })

        if (emailId === false) {
            return response.json({
                code: 0,
                msg: 'Đã xảy ra lỗi không mong muốn!'
            })
        } else {
            return response.json({
                code: 1,
                data: emailId
            })
        }
    }

    /**
     * Request
     */

    async emailListHandle ({ request, response }) {
        let { page, all } = request.all()

        if (!page) { page = 1}

        const limit = 20

        let listEmail = Database.table(DB_SOURCE)
        .join('users', 'users.id', `${DB_SOURCE}.create_by`)
        .select(`${DB_SOURCE}.id`, `${DB_SOURCE}.title`, `${DB_SOURCE}.email_title`, `${DB_SOURCE}.create_by`, `${DB_SOURCE}.update_by`, `${DB_SOURCE}.created_at`, `${DB_SOURCE}.updated_at`)

        if (all) {
            listEmail = await listEmail
        } else {
            listEmail = await listEmail.paginate(page, limit)
        }

        return response.json({
            code: 1,
            data: listEmail
        })
    }

    /**
     * Request
     */

    async getEmailWidthId ({ request, response, params }) {
        const { id } = params

        if (id) {
            const emailData = await Database.table(DB_SOURCE)
            .where('id', id)
            .select('id', 'title', 'email_title', 'email_design', 'create_by', 'update_by', 'created_at', 'updated_at', 'email_from_name')
            .first()

            if (emailData) {

                try {
                    emailData.email_design = JSON.parse(emailData.email_design)

                } catch (error) {}

                return response.json({
                    code: 1,
                    data: emailData
                })
            }
        }


        return response.json({
            code: 0,
            msg: 'Không tìm thấy email'
        })
    }

    /**
     * request
     */

    async sendTest ({ request, response }) {
      const { merge_data, title, email_html, email_to, email_from_name } = request.all()
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'trinhhuong29071999@gmail.com',
          pass: 'gmlwurjunmjtrdfn'
        }
      });
      const mailOptions = {
        from: 'trinhhuong29071999@gmail.com',
        to: 'huong.trinhthi@vti.com.vn',
        subject: 'Test email',
        text: 'This is a test email from Nodemailer'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      // console.log(sgMail)
      //   if (email_html && title && merge_data) {
      //       const emailContent = this.emailHtmlContentMerge({
      //           email_title: title,
      //           email_html
      //       }, merge_data)

      //       await this.sendEmail({
      //           mailTo: email_to,
      //           email_title: emailContent.email_title,
      //           email_html: emailContent.email_html,
      //           mailFrom: this.getAddressFrom(),
      //           fromname: email_from_name
      //       })

      //       return response.json({
      //           code: 1,
      //       })
      //   }

      //   return response.json({
      //       code: 0,
      //       msg: 'Thiếu dữ liệu!'
      //   })
    }

    sendEmailScript (site_id, action, mail_to, data) {
        return new Promise( async (resolve, reject) => {
            if (site_id && action && mail_to && data) {

                const emailScriptOfSite = await this._getEmailScriptBySiteId(site_id, action)

                for (let index = 0; index < emailScriptOfSite.length; index++) {
                    const element = emailScriptOfSite[index];

                    const emailContent = this.emailHtmlContentMerge({
                        email_title: element.email_title,
                        email_html: element.email_html
                    }, data)

                    this.sendEmail({
                        mailTo: mail_to,
                        email_title: emailContent.email_title,
                        email_html: emailContent.email_html,
                        mailFrom: this.getAddressFrom(),
                        fromname: element.email_from_name
                    })
                }
                resolve(true)
            }

            reject(false)
        })
    }

    async _getEmailScriptBySiteId (siteId, action) {
        return Database.table('email_site')
        .join('email_template', 'email_site.email_id', 'email_template.id')
        .where('email_site.site_id', siteId)
        .where('email_site.action', action)
    }


    getAddressFrom () {
        return 'trinhhuong29071999@gmail.com';
    }

    emailHtmlContentMerge (mail_data, merge_data) {
        const dataKey = Object.keys(merge_data)

        for (let index = 0; index < dataKey.length; index++) {
            const key = dataKey[index];
            mail_data.email_title = mail_data.email_title.replace( new RegExp(`\\{{${key}}}`,"gm"), merge_data[key])
            mail_data.email_html = mail_data.email_html.replace( new RegExp(`\\{{${key}}}`,"gm"), merge_data[key])
        }

        return mail_data
    }

    /**
     *
     */

    async sendEmail (data) {

        const msg = {
            to: data.mailTo,
            from: data.mailFrom,
            subject: data.email_title,
            html: data.email_html,
            fromname: data.fromname,
        }

        return new Promise((resolve, reject) => {
            sgMail
            .send(msg)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })


        // // send mail
        // try {
        //     await axios.post('https://hocmai.vn/cron/sendsms/send-mail-speakup-test/index.php',
        //     querystring.stringify({
        //         key: 'e9b17561cec698a089d2178056cd4d4c',
        //         email: data.mailTo,
        //         email_title: data.email_title,
        //         email_html: data.email_html
        //     }), {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         }
        //     }).then(function(response) {
        //         console.log('Sendemail to : ' + data.mailTo, response.data);
        //     });
        // } catch (error) {
        //     Logger.error(error, 'TestController.submit.sendEmail')
        // }
    }


    async templateDuplicate({request, response, params}) {
        try {
            const { id } = params;

            const template = await Database.table(DB_SOURCE)
            .where('id', id)
            .first();

            if (template) {
                delete template.id
                template.title = template.title + ' (Nhân bản)';

                await Database.table(DB_SOURCE).insert(template)

                return response.json({
                    code: 1,
                })
            }
        } catch (error) {
            return response.json({
                code: 0,
                msg: error.message
            })
        }
    }


    async templateDelete({request, response, params}) {
        try {
            const { id } = params;

            const template = await Database.table(DB_SOURCE)
            .where('id', id)
            .delete();

            return response.json({
                code: 1,
            })
        } catch (error) {
            return response.json({
                code: 0,
                msg: error.message
            })
        }
    }
}

module.exports = EmailController
