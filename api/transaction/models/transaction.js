'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        afterCreate(result){
            var total_amt_left = result.account.amt_due - result.amt_paid
            
            strapi.query('account').update({id: result.account.id}, {
                amt_due: total_amt_left
            })
        }, 
    }
};
