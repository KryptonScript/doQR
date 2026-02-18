// QR_code generator from URL

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([{
    message: "Please enter a URL to generate it's QR code:) ",
    name: "URL",
  }, 
  ])
  .then((answers) => {
    const url = answers.URL;
    var qrImage = qr.image(url);
    qrImage.pipe(fs.createWriteStream('Generated-QR-Code.png'));

    fs.writeFile("URL_collection.txt", url, (err) => {
      if (err) throw err;
      console.log("QR Code has been saved successfully!");
    })
  })


