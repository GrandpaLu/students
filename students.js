var dataPath = './db.json'
var fs = require('fs')
exports.find = function (callback) {
    fs.readFile(dataPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}
exports.findById = function(id,callback) {
        fs.readFile(dataPath, 'utf8', function (err, data) {
            if (err) {
                return callback(err)
            }
            var ret = JSON.parse(data).students
            var dataFile = ret.find(function(item){
                return item.id === id
            })
            callback(null, dataFile)

        })
}
exports.save = function (student, callback) {
    fs.readFile(dataPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var stu = JSON.parse(data).students
        student.id = stu[stu.length - 1].id + 1
        stu.push(student)
        var ret = JSON.stringify({
            students: stu
        })
        fs.writeFile(dataPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
exports.edit = function (student, callback) {
    fs.readFile(dataPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        student.id = parseInt(student.id)
        var stu = JSON.parse(data).students
        var ret = stu.find(function (item) {
            return item.id === student.id
        })
        for (key in ret) {
            ret[key] = student[key]
        }
                var ret = JSON.stringify({
                    students: stu
                })
        fs.writeFile(dataPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
exports.delete = function(id,callback) {
    fs.readFile(dataPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var stu = JSON.parse(data).students
        var deleteId = stu.findIndex(function(item) {
            return item.id == parseInt(id)
        })
        var ret = stu.splice(deleteId, 1)
        var end = JSON.stringify({
            students: stu
        })       
        fs.writeFile(dataPath, end, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}