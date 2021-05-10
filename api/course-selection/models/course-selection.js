'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async afterCreate(result){
            const account = await strapi.query('account').findOne({ id: result.student.account });
            await strapi.query('account').update(
                { id: account.id }, 
                { amt_due: result.course.fee + account.amt_due }
            );
        }, 
        async afterDelete(result){
            console.log(result)

            // get account related to student
            const account = await strapi.query('account').findOne({ id: result.student.account })
            const newAmt = account.amt_due - result.course.fee

            // update student account with new amt_due
            await strapi.query('account').update(
                { id: account.id },
                { amt_due: newAmt }
            )
        }
    }
};
