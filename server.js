const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app = express();




app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method},${req.url}`
  console.log(log);
  fs.appendFileSync('log.log',log);
  next();
});
/*app.use((req,res,next)=>{
  res.render('maintainence.hbs');

});*/
hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname +'/public'));
hbs.registerHelper('getfullyear',()=>
{
  return new Date().getFullYear()
});
hbs.registerHelper('screamit',(text)=>
{
  return text.toUpperCase()
});
app.get('/',(req,res)=>{
  res.render("home.hbs",{
    name:'some title',

    pageTitle:'About Page'
  });
});

app.get('/about',(req,res)=>{
  res.render("about.hbs",{
    copyright:2018,
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({errormessage:'page not found'})
});

app.listen(3000,()=>{
  console.log('running on port 3000');
}
);
