// import express from 'express';
// import { nanoid } from 'nanoid';
// import fs from 'fs';
// import cors from 'cors';

// const app = express();
// var corsOptions = {
//     origin: 'http://localhost:5173/',
//     methods:'POST,GET',
//     credentials:true,
//   }
// app.use(cors(corsOptions));
// app.use(express.json());

// app.post('/', (req, res) => {
//     const shortUrl = nanoid(8);
//     const urlsFromFile = fs.readFileSync('urls.json');
//     const urlsJson = JSON.parse(urlsFromFile.toString());
//     urlsJson[shortUrl] = req.body.longUrl;
//     fs.writeFileSync('urls.json', JSON.stringify(urlsJson));
//     res.json({
//         status: true,
//         data: `http://localhost:10000/${shortUrl}`,
//         message: 'Short URL generated'
//     });
// });

// app.get('/:short', (req, res) => {
//     const shortUrl = req.params.short;
//     const urlsFromFile = fs.readFileSync('urls.json');
//     const urlsJson = JSON.parse(urlsFromFile.toString());

//     const longUrl = urlsJson[shortUrl];
//     if (longUrl) {
//         res.redirect(longUrl);
//     } else {
//         res.status(404).json({
//             status: false,
//             message: 'Short URL not found'
//         });
//     }
// });

// app.listen(10000, () => {
//     console.log('Server is running on port 10000');
// });



import express from 'express';
import { nanoid } from 'nanoid';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'https://url-shortner-web-app.vercel.app/',
    methods: 'POST,GET',
    credentials: true,
}));
app.use(express.json());

app.post('/', (req, res) => {
    if(!req.body.longUrl){
       res.status(400).json({
        status:false,
        message:"Enter the long URl"
       })
       return;
    }
    const shortUrl = nanoid(8);
    const urlsFromFile = fs.readFileSync('urls.json');
    const urlsJson = JSON.parse(urlsFromFile.toString());
    urlsJson[shortUrl] = req.body.longUrl;
    fs.writeFileSync('urls.json', JSON.stringify(urlsJson));
    res.json({
        status: true,
        data: `http://localhost:10000/${shortUrl}`,
        message: 'Short URL generated'
    });
});

app.get('/:short', (req, res) => {
    const shortUrl = req.params.short;
    const urlsFromFile = fs.readFileSync('urls.json');
    const urlsJson = JSON.parse(urlsFromFile.toString());

    const longUrl = urlsJson[shortUrl];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).json({
            status: false,
            message: 'Short URL not found'
        });
    }
});

app.listen(10000, () => {
    console.log('Server is running on port 10000');
});
