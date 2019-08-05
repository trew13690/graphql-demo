const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');

// connect to mlab database
mongoose.connect('mongodb+srv://trew13690:loveMai@cluster0-gytjt.gcp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to Database')
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));
app.listen(4000,() => {
    console.log('Server is running on port 4000');
})