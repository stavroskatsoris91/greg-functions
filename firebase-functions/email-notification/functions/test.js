/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;//email
const gmailPassword = functions.config().gmail.password;//password
const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
// var sendBookingEmail = mailTransport.templateSender(
//   new Email('./templates/bookingEmail'), {
//     	from: '"Greg booking" <noreply@firebase.com>',
//   });

// exports.sendPasswordReset = function (email, username, name, tokenUrl) {
//     // transporter.template

// };

// Sends an email confirmation when a user changes his mailing list subscription.
// exports.sendEmailNotification = functions.database.ref('/books/{booksId}').onCreate(async (snap, context) => {

  // console.log(snap._data); 
  // console.log('id :'+context.params.booksId);
  const val = 'stkandbd@hotmail.com';
  // const data = snap._data;


  // Building Email message.
  // var text = '';
  // const keys = ["name", "email", "tel", "date", "riding", "trek", "riders", "payment" ,"message"];
  // let keys = Object.keys(data.riders);
  // const riders = keys.map((x)=>{
  //   return data.riders[x];
  // })
  // keys.map(function(x){
  //   if(data.hasOwnProperty(x)){
  //     if(x=='riders'){
  //       var keys2 = Object.keys(data[x]);
  //       keys2.map(function(y,i){
  //         text+= 'rider '+(1+i)+' :\n';
  //         var key3 = ["name", "age", "height", "weight", "level"];
  //         key3.map(function(z){
  //           if(data[x][y].hasOwnProperty(z)){

  //             text+='       '+z+' : '+ data[x][y][z]+'\n';
  //           }
  //         })
  //       })
  //     }else{
  //       text+=x+' : '+data[x]+'\n';
  //     }
  //   }
  // })
  // mailOptions.subject = 'New booking request';
  // mailOptions.text = text;
  // mailOptions.replyTo = data.email;
  // console.log(mailOptions.text);
  // try {
  //   // await mailTransport.sendMail(mailOptions);
  //   console.log(`New notification email sent to:`, val);
  //   sendBookingEmail(mailOptions,{date:data.date, text:text}, function (err, info) {
  //     if (err) {
  //         console.log(err)
  //     } else {
  //         console.log('Link sent\n'+ JSON.stringify(info));
  //     }
  // });
  // } catch(error) {
  //   console.error('There was an error while sending the email:', error);
  // }
  const email = new Email({
    message: {
      from: '"Greg booking" <noreply@firebase.com>',
    },

    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
    replyTo: 'leoni_thim@hotmail.com',
    // uncomment below to send emails in development/test env:
    send: true,
    transport: mailTransport
  });
  console.log(gmailEmail);
  const locals = { name: 'Stavros Katsoris',
  date: '5/2/2020',
  time: '7:00',
  riding: 'TREK',
  trek: '1 - Coastal Road',
  riders: 
   [ { age: 1,
       height: '0.59',
       level: 'Novice',
       name: 'Liannna Polina',
       weight: '9' } ],
  email: 'leoni_thim@hotmail.com',
  tel: '07823438924',
  payment: 'Cash on the Day - €30',
  message: 'sdfsad' }
  return mailTransport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
      console.log(locals);
      return email
        .send({
          message: {
            to: val,
            subject : 'New booking request',
          },
          template: 'email',
          locals: locals
        })
        .then(console.log)
        .catch(console.error);
    }
  });

// });
