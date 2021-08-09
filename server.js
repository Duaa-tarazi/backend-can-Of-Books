'use strict';
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');
const server = express();
server.use(cors());


mongoose.connect('mongodb://localhost:27017/Books', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const PORT = process.env.PORT ;
const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  email: String,
});
const bookModel = mongoose.model('userBook', BookSchema);

function seedingBookCollection() {

  const ForeverThisSummer = new bookModel({
    title: 'Forever This Summer',
    description: 'Georgie has no idea what to expect when she, Mama, and Peaches are plopped down in the middle of small town USA aka Bogalusa, Louisiana--where Mama grew up and Great Aunt Vie needs constant care Georgie wants to help out at the once famous family diner that served celebrities like the Jackson 5 and the Supremes, but everyone is too busy to show her the ropes and Mama is treating her like a baby not letting her leave her sight. When she finally gets permission to leave on her own, Georgie makes friends with Markie a foster kid who d been under Aunt Elvie s care who has a limb difference and a huge attitude Then Markie asks Georgie to help her find her mom, and suddenly summer has a real purpose. But as Georgie and Markie s histories begin to entwine, Georgie becomes more desperate to find the truth. But words spoken cannot be taken back and once Georgie knows the truth, she may even find a way to right past wrongs and help Aunt Vie and Markie out after all.',
    status: true,
    email: 'dst08itm@yahoo.com'
  });
  const mayaandtheRobot = new bookModel({
    title: 'Maya and the Robot',
    description: 'Maya is nervous about fifth grade. She tries to keep calm by reminding herself she knows what to expect. But then she learns that this year won t be anything like the last. For the first time since kindergarten, her best friends Jada and MJ are placed in a different class without her, and introverted Maya has trouble making new friends.She tries to put on a brave face since they are in fifth grade now, but Maya is nervous! Just when too much seems to be changing, she finds a robot named Ralph in the back of Mr. Mac s convenience store closet. Once she uses her science skills to get him up and running, a whole new world of connection opens up as Ralph becomes a member of her family and Maya begins to step into her power. In this touching novel, Eve L. Ewing melds together a story about community, adapting to change, and the magic of ingenuity that reminds young readers that they can always turn to their own curiosity when feeling lost.',
    status: true,
    email:'dst08itk@gmail.com'
  });
  const linked = new bookModel({
    title: 'Linked',
    description: 'Link, Michael, and Dana live in a quiet town. But it is woken up very quickly when someone sneaks into school and vandalizes it with a swastika.Nobody can believe it. How could such a symbol of hate end up in the middle of their school? Who would do such a thing?Because Michael was the first person to see it, he s the first suspect. Because Link is one of the most popular guys in school, everyone s looking to him to figure it out. And because Dana s the only Jewish girl in the whole town, everyone s treating her more like an outsider than ever.The mystery deepens as more swastikas begin to appear. Some students decide to fight back and start a project to bring people together instead of dividing them further. The closer Link, Michael, and Dana get to the truth, the more there is to face-not just the crimes of the present, but the crimes of the past.With Linked, Gordon Korman, the author of the acclaimed novel Restart, poses a mystery for all readers where the who did it? isn t nearly as important as the why?',
    status: true,
    email:'dst08itf@dst08itf.com'
  });

  ForeverThisSummer.save();
  mayaandtheRobot.save();
  linked.save();
}
seedingBookCollection();


//http://localhost:3001/book
server.get('/', book);
server.get('/book', getBooks);

function book(req,res){
  res.send('duaa');
  console.log('hiii');
  
}

function getBooks(req, res) {
  const reqEmail = req.query.email;
  bookModel.find({ email: reqEmail }, function (err, resultData) {
    if (err) {
      console.log("Error");
    } else {
      console.log(resultData);
      // console.log(resultData[0].books);
      res.send(resultData);
    }
  });
}

// app.get('/test', (request, response) => {

//   // TODO: 
//   // STEP 1: get the jwt from the headers
//   // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
//   // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
//   // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

// })

server.listen(PORT, () => console.log(`listening on ${PORT}`));
