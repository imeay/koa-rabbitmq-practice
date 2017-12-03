var amqp = require('amqplib/callback_api');
const amqp_promise:any = new Promise( (resolve, reject) => {
   amqp.connect('amqp://localhost', function(err, conn) {
    if (err) {
     reject(err);
    } else {
     resolve(conn);
    }  
  });
});

export const create_channel = async ():Promise<any> => {
  const connect = await amqp_promise;
  return new Promise((resolve, reject) => {
   connect.createChannel( (err, ch) => {
     if (err) {
      reject(err);
      return;
     }
     resolve(ch); 
   });     
  });  
 };
