'use strict'

const Task = use('Task')
const Database = use('Database');
const axiso = use('axios');

class GetInfoIp extends Task {
  static get schedule () {
    return '0 * * * *'
  }

  async handle () {
    console.log('Get Info Ip')

    // const listTracking = await Database.table('tracking')
    //     .leftJoin('ip_info', 'ip_info.tracking_id', 'tracking.id')
    //     .whereNull('ip_info.id')
    //     .whereNotNull('tracking.user_ip')
    //     .select('tracking.id', 'tracking.user_ip', 'tracking.contact_id')
    //     // .toSQL()

    // for (let index = 0; index < listTracking.length; index++) {
    //     const element = listTracking[index];
    //     const ipInfo = await axios.get('http://ip-api.com/json/' + element.user_ip)
    //     if (ipInfo) {
    //         await Database.table('ip_info')
    //         .insert({
    //             contact_id: element.contact_id,
    //             tracking_id: element.id,
    //             country: ipInfo.data.country,
    //             city: ipInfo.data.city,
    //             isp: ipInfo.data.isp
    //         })
    //     }
    // }
  }
}

module.exports = GetInfoIp
