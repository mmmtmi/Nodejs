const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) =>{
    var data = {
        title: 'Hello!',
        content: '*なにか書いて送信してください。'
    };
    res.render('hello', data);
});

router.post('/post',(req, res, next) =>{
    var msg = req.body['Message'];
    var data = {
        title:'Hello!',
        content:'あなたは、「' + msg + '」と送信しました。'
    };
    res.render('hello', data);
});

module.exports = router;