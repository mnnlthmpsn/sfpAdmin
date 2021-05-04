'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async afterCreate(result){
            console.log("fee" + result.course.fee)
            const account = await strapi.query('account').findOne({ id: result.student.account });
            await strapi.query('account').update(
                { id: account.id }, 
                { amt_due: result.course.fee + account.amt_due }
            );
        }
    }
};
