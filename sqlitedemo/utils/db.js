const knex = require('knex');
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const configs = require('./config');

const db = knex({
    client: 'sqlite3',
    connection:{
        filename: configs.dburl
    },
    useNullAsDefault: true
});

function init(){//初始化数据结构
    console.log("Database init table start");// 数据库实例化表结构
    db.schema.hasTable("sys_users").then(function(exists) {
       if (!exists) {
           return  db.schema.createTable("sys_users",function (table) {
            table.increments();
            table.string('uid',32);
            table.string('username',30);
            table.string('password',30);
            table.string('salt',8);
            table.text('create_date'); 
            table.text('update_date');
            table.string('ext',256);
            table.text('remark');
        });
       } 
    });

    //创建日志表
    db.schema.hasTable('sys_logs').then(function(exists) {
       if (!exists) {
           return  db.schema.createTable("sys_logs",function (table) {
            table.increments();
            table.string("ip",64);
            table.string('path',256);
            table.text('create_time');
            table.string('username',255);
            table.text('params');
            table.text('response');
            table.text('remark');
        });
       } 
    }).catch(function (err) {
        console.log("catch 来捕获错误=>"+err.message);
    });
    
    console.log("Database init table end");// 数据库实例化表结构
}
module.exports={
    db: db,
    init: init
}