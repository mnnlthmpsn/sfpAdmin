'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */


module.exports = {
    lifecycles: {
        afterCreate(result){
            strapi.query('account').create({
                student: result.id,
                amt_due: 0.00
            })
        }, 
        afterDelete(result){
            strapi.query('account').delete({
                id: result.account.id
            })

            strapi.query('course_selection').delete({
                student: result.id
            })
        }
    }
};
