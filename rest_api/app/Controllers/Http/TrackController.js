'use strict'
const { uuid } = require('uuidv4');
const Database = use('Database');
const { URL } = require('url');
const axios = use('axios')
const querystring = require('querystring');

class TrackController {

    async getUtmList({ request, response }) {
        let utm_source = await Database.table('utm_source').select('name')
        let utm_medium = await Database.table('utm_medium').select('name')
        let utm_campaign = await Database.table('utm_campaign').select('name')
        let utm_term = await Database.table('utm_term').select('name')
        let utm_content = await Database.table('utm_content').select('name')

        return response.json({
            code: 1,
            data: {
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign,
                utm_term: utm_term,
                utm_content: utm_content,
            }
        })
    }

    async sendEvent({ request, response}) {
        const { trackid, event_name, data } = request.all()

        if (trackid && event_name) {

            // Neu data co contact
            // Add contact
            if (data) {

            }
        }

        return response.json({
            code: 1,
            msg: 'success'
        })
    }

    async pushContactToCrmm(params) {

        try {
            await axios.post('https://hocmai.vn/ladipage/pushContactToCrmSpeakup.php', querystring.stringify(params), {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                }
            ).then(async (res) => {
                await Database.table('push-crm-status')
                .insert({
                    data: JSON.stringify(params),
                    response: JSON.stringify(res.data)
                })
            })
        } catch (error) {
            await Database.table('push-crm-status')
            .insert({
                data: JSON.stringify(params),
                response: JSON.stringify(error.message)
            })
        }
    }

    caculatorScore({learned, location, school, score, certificate}) {
        let point = 0;
        if(location !== 'other') {
            point++;
        }
        if(school == '1') {
            point++;
        }
        if(learned == '1') {
            point++;
        }
        if(score == '1') {
            point++;
        }
        if(certificate == '1') {
            point++;
        }

        return point

    }
    // async getTrackidContact({request, response}) {
    //     let {  phone, email} = request.all()
    //     if (phone) {
    //         let contactID = await Database.table('contact')
    //         .where('phone', phone)
    //         .where('email', email)
    //         .select('id')
    //         .first()
    //         if (contactID) {
    //             const trackingDetail = await Database.table('tracking')
    //             .where('contact_id', contactID.id)
    //             .select('tracking_hash')
    //             .first()
    //             if (trackingDetail) {
    //                 return response.json({
    //                   code: 1,
    //                   data: trackingDetail
    //                 })
    //             }
    //           return response.json({
    //             code: 1,
    //             msg:'không có tracking'
    //           })
    //         }

    //     }
    //     return response.json({
    //       code: 0,
    //       msg: 'error'
    //     })
    // }

    async pushContract({ request, response }) {
      const { trackid, data } = request.all()

      // let phone, email, name, age, source, learned, location, school, score, certificate
      let phone, email, name, classid, subjectid, source
      if (data) {
        Object.keys(data).forEach((key) => {
          switch (key) {
            case 'phone':
              phone = data[key]
              break;
            case 'name':
              name = data[key]
              break;
            case 'email':
              email = data[key]
              break;
            case 'classid':
              classid = data[key]
              break;
            case 'subjectid':
              subjectid = data[key]
              break;
              // case 'age':
              //     age = data[key]
              //     break;
              // case 'learned':
              //     learned = data[key]
              //     break;
              // case 'source':
              //     source = data[key]
              //     break;
              // case 'location':
              //     location = data[key]
              //     break;
              // case 'school':
              //     school = data[key]
              //     break;
              // case 'score':
              //     score = data[key]
              //     break;
              // case 'certificate':
              //     certificate = data[key]
              //     break;
            default:
              break;
          }
        })
      }
      if (phone) {

        // await this.pushContactToCrmm({
        //     ldp: 'ldi-sp-ican-placementtest',
        //     link: source,
        //     phone,
        //     name,
        //     email,
        //     team: 4
        // })

        // check Phone in db
        let contactID = await Database.table('contact')
          .where('phone', phone)
          .where('email', email)
          .first()

        if (!contactID) {
          contactID = await Database.table('contact')
            .insert({
              phone,
              email,
              name,
              classid,
              subjectid
              // learned,
              // age
              // el_score: score,
              // certificate,
              // school,
              // location,
              // sum_score: this.caculatorScore({learned, location, school, score, certificate})
            })
          contactID.id = contactID[0]
        } else {
          await Database.table('contact')
            .where('id', contactID.id)
            .update({
              // sum_score: this.caculatorScore({learned, location, school, score, certificate}),
              // email,
              // learned,
              // location,
              // school,
              // el_score: score,
              // certificate
              name,
              classid,
              subjectid
            })
        }

        const trackingDetail = await Database.table('tracking')
          .where('tracking_hash', trackid)
          .first()

        // const trackingDetail = await Database.table('tracking')
        //     .where('contact_id', contactID.id)
        //     .select('tracking_hash')
        //     .first()
        // Insert to history
        await Database.table('contact_history')
          .insert({
            contact_id: contactID.id,
            tracking_id: trackingDetail.id,
            source,
            data: JSON.stringify(data),
          })

        if (trackid ) {
          await Database.table('tracking')
            .where('tracking_hash', trackid)
            .update({
              contact_id: contactID.id
            })
        }
        return response.json({
          code: 1,
          data: contactID.id
        })
      }

      return response.json({
        code: 1,
        msg: 'success'
      })
    }

    async sourceParse(source) {

        let params = {
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: ''
        }
        try {
          const urlParts = new URL(source)
          params.utm_source = urlParts.searchParams.get('utm_source'),
          params.utm_medium = urlParts.searchParams.get('utm_medium'),
          params.utm_campaign = urlParts.searchParams.get('utm_campaign'),
          params.utm_term = urlParts.searchParams.get('utm_term'),
          params.utm_content = urlParts.searchParams.get('utm_content')
        } catch (error) {

        }

        if (params.utm_source) {
            const checkSource = await Database.table('utm_source').where('name', params.utm_source).first()
            if (!checkSource) {
                await Database.table('utm_source').insert({
                    name: params.utm_source
                })
            }
        }
        if (params.utm_medium) {
            const checkSource = await Database.table('utm_medium').where('name', params.utm_medium).first()
            if (!checkSource) {
                await Database.table('utm_medium').insert({
                    name: params.utm_medium
                })
            }
        }
        if (params.utm_campaign) {
            const checkSource = await Database.table('utm_campaign').where('name', params.utm_campaign).first()
            if (!checkSource) {
                await Database.table('utm_campaign').insert({
                    name: params.utm_campaign
                })
            }
        }
        if (params.utm_term) {
            const checkSource = await Database.table('utm_term').where('name', params.utm_term).first()
            if (!checkSource) {
                await Database.table('utm_term').insert({
                    name: params.utm_term
                })
            }
        }
        if (params.utm_content) {
            const checkSource = await Database.table('utm_content').where('name', params.utm_content).first()
            if (!checkSource) {
                await Database.table('utm_content').insert({
                    name: params.utm_content
                })
            }
        }

        return params
    }

    async createNewTrack({ request, response }) {
        const v4Code = uuid()

        const user_agent = request.headers()['user-agent']
        const user_ip = request.headers()['x-real-ip']
        const referer = request.headers()['referer']
        try {
            await Database.table('tracking')
            .insert({
                tracking_hash: v4Code,
                user_agent,
                user_ip,
                referer
            })

            return response.json({
                code: 1,
                data: v4Code
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = TrackController
