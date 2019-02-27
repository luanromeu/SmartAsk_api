'use stict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');



exports.new = async (user) => {

    try {

        var customer =
            await new Customer(user);
        await customer.save();
        return customer;

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}



exports.list = async () => {

    try {
        const res =
            await Customer.find();
        return res;

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}

exports.authenticate = async (user) => {

    try {
        
        const res = await
            Customer.findOne({
                    
                    name: user.user,
                    password: user.password
                 })

        return res;

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }

}