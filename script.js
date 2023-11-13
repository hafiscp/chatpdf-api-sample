const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const formData = new FormData();
const pdfPath = "./assets/Beginning Flutter - 2019 - Napoli - Front Matter.pdf"
formData.append("file", fs.createReadStream(pdfPath));

const options = {
  headers: {
    "x-api-key": "sec_thrSMmamX6IeDJDq4FlwuNwGeNsai3JG", 
  },
};

axios.post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
  .then(response => {
    console.log("Source ID:", response.data.sourceId);
    interactWithPDF(response.data.sourceId); 
  })
  .catch(error => {
    console.error("Error:", error.message);
  });


  function interactWithPDF(sourceId) {
    const axios = require("axios");
  
    const config = {
      headers: {
        "x-api-key": "sec_thrSMmamX6IeDJDq4FlwuNwGeNsai3JG",
        "Content-Type": "application/json",
      },
    };
  
    const questions = [
      "Can you show the total chapters, and its contents ?"
    ];
  
    questions.forEach(question => {
      const data = {
        sourceId: sourceId,
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      };
  
      axios.post("https://api.chatpdf.com/v1/chats/message", data, config)
        .then(response => {
          console.log("Question:", question);
          console.log("Answer:", response.data.content);
        })
        .catch(error => {
          console.error("Error:", error.message);
        });
    });
  }
  