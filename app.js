const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'EXPRESS.WS')));


const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >=1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.send('<h1>Sorry, the web application is only available during working hours (Monday to Friday, 9:00 - 17:00).</h1>');
    }
};

app.use(workingHoursMiddleware);


app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '/html/home.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/contact.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on 3000`);
});
