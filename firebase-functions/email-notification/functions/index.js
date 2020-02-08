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
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

exports.sendEmailNotification = functions.database.ref('/books/{booksId}').onCreate(async (snap, context) => {

  const val = 'greg_thim@hotmail.com';
  const data = snap._data;


  // Building Email message.
  let keys = Object.keys(data.riders);
  const riders = keys.map((x)=>{
    return data.riders[x];
  })
  const mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });
  const email = new Email({
    message: {
      from: '"Greg booking" <noreply@firebase.com>',
    },

    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
    replyTo: data.email,
    // uncomment below to send emails in development/test env:
    // send: true,
    transport: mailTransport
  });
  const locals = {
    name: data.name,
    date: data.date.split(' ')[0],
    time: data.hour +':'+data.minutes,
    riding: data.riding,
    // trek: data.trek,
    riders: riders,
    email: data.email,
    tel: data.tel,
    payment: data.payment,
    message: data.message
  };
  return mailTransport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
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

});
