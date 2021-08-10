const express = require ("express")

let mainController = {
    home : function(req,res) {
        res.render ('index') ;
    },
}

module.exports = mainController ;