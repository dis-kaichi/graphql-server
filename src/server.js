var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require('fs');

var schema = buildSchema(`
  type Query {
    message(id: Int!): Message
    messages: [Message]
  },
  type Mutation {
    addMessage(message: String!): Message
    updateMessage(id: Int!, message: String!): Message
    deleteMessage(index: Int!): Message
  },
  type Message {
    id     : Int!
    message: String
  },
`);

const DATABASE = 'database.json';
var messageList = JSON.parse(fs.readFileSync(DATABASE));

var getMessages = function() {
  return messageList;
}

var getMessage = function({id}) {
  return messageList.filter(message => {
    return message.id == id;
  })[0];
}

var addMessage = function({message}) {
  var last = messageList[messageList.length - 1];
  var id = last.id + 1;
  var obj = {id: id, message: message};
  messageList.push(obj);
  fs.writeFileSync(DATABASE, JSON.stringify(messageList));
  return obj;
}

var updateMessage = function({id, message}) {
  messageList.map(element => {
    if (element.id == id) {
      element.message = message;
      return element;
    }
  });
  return messageList.filter(element => element.id == id)[0];
}

var deleteMessage = function({index}) {
  var message = messageList.splice(index, 1);
  fs.writeFileSync(DATABASE, JSON.stringify(messageList));
  return message[0];
}

var root = {
  message: getMessage,
  messages: getMessages,
  addMessage: addMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage,
}

var app = express();
app.use('/graphql', express_graphql.graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log("Now Running"));
