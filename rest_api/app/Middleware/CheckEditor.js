'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request

    try {
        const role = await auth.user.role
      if (role.indexOf('editor') != -1) {
        await next()
      } else {
        return response.status(200).json({
            code: 0,
            message: "Bạn không có quyền thực hiện thao tác này"
        }) 
      }
    } catch (error) {
      console.log(error)
      return response.status(401).json({
        code: 0,
        message: "Bạn không có quyền thực hiện thao tác này"
      })
    }
  }
}

module.exports = Auth
