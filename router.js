var express = require('express')
var router = express.Router()
var Students = require('./students')
var fs = require('fs')
router.get('/students', function (req, res) {
    Students.find(function (err, data) {
        if (err) {
            return res.status(500).send('data is error.')
        }
        res.render('index.html', {
            fruit: [
                '苹果',
                '梨子',
                '香蕉'
            ],
            student: data
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})
router.post('/students/new', function (req, res) {
    Students.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('data is error.')
        }
        res.redirect('/students')
    })
})
router.get('/students/edit', function (req, res) {
    Students.findById(parseInt(req.query.id), function (err, data) {
        if (err) {
            return res.status(500).send('data is error.')
        }
        res.render('edit.html', {
            students: data
        })
    })
})
router.post('/students/edit', function (req, res) {
    Students.edit(req.body, function (err) {
        if (err) {
            return res.status(500).send('data is error.')
        }
        res.redirect('/students')
    })

})
router.get('/students/delete', function (req, res) {
    Students.delete(req.query.id, function (err) {
                if (err) {
                    return res.status(500).send('data is error.')
                }
                res.redirect('/students')
    })
})
module.exports = router