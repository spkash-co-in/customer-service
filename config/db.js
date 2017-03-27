'use strict;'
//Include crypto to generate the customer id
var crypto = require('crypto');

module.exports = function() {
    return {
        customerList : [],
        /*
         * Save the customer inside the "db".
         */
        save(customer) {
            customer.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.customerList.push(customer);
            return {success:1,id:customer.id};           
        },
        /*
         * Retrieve a customer with a given id or return all the customers if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.customerList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.customerList;
            }
        },
        /*
         * Delete a customer with the given id.
         */
        remove(id) {
            var found = 0;
            this.customerList = this.customerList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
         * Update a customer with the given id
         */
        update(id, customer) {
            var customerIndex = this.customerList.findIndex(element => {
                return element.id === id;
            });
            if(customerIndex !== -1) {
                this.customerList[customerIndex].name = customer.name;
                this.customerList[customerIndex].dob = customer.dob;
                this.customerList[customerIndex].gender = customer.gender;
                return 1;
            }else {
                return 0;
            }
        }, 
        /*
         * Update a customer with the given id
         */
        clear() {
            this.customerList = [];
            return 1;
        }   
    }
};