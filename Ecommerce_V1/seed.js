const mongoose=require('mongoose');
const Product=require('./models/product');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>console.log('Db connected'))
.catch((err)=>console.log('Something went wrong'))




const products=[
    {
        name:'Iphone 11',
        img:'https://images.unsplash.com/photo-1611791484670-ce19b801d192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price:300,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
    {
        name:'Nike Shoes',
        img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price:100,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
    {
        name:'Titan Watch',
        img:'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2F0Y2hlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price:150,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
    {
        name:'Macbook pro',
        img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price:250,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
    {
        name:'Drones',
        img:'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:350,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
    {
        name:'More Drones',
        img:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRyb25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price:350,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
    {
        name:'Bicycle',
        img:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price:200,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates"
    },
]

Product.insertMany(products)
.then(()=>{
    console.log('Products Seeded');
})
