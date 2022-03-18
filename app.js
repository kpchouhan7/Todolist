const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname+"/date.js");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kpsingh:vivaronaldo@cluster0.rtqf2.mongodb.net/todolist=?retryWrites=true&w=majority');
app.use(express.static("public"));

app.set('view engine', 'ejs');
const itemSchema = {
       name :String
};

const listSchema = {
       name :String,
       items:[itemSchema],
}

const List = mongoose.model("List", listSchema);

const items = mongoose.model("items",itemSchema);

const defaultItems = [{name : "eat"},{name : "sleep"},{name:"wake up"}];

app.get('/', function(req, res) {

       var day = date();

       items.find({},function(err,result){
            
              if(err){
                     console.log("Error");
              }
              else{

                     if(result.length==0){
                            items.insertMany(defaultItems,function(err){

                                   if(err){
                                          console.log("Error");
                                   }
                                   else{
                                          console.log("Successfully inserted");
                                   }
                            });
                            res.render('list.ejs',{title:day,items:result,page:"home"});

              }

              else{


                     res.render('list.ejs',{title:day,items:result,page:"home"});
              }
              
       
       }




       });


});

app.post("/delete",function(req,res){

       var deleteitem = req.body.checkbox;

        items.deleteOne({_id:deleteitem},function(err){
               if(err){
                      console.log("Error deleting");
               }
               else{
                      console.log("Sucessfully deleted");
               }
        });

        res.redirect("/");
});



app.get("/:customlist",function(req,res){
      const customlist = req.params.customlist;
     
      List.findOne({name:customlist},function(err,result){
       
       if(!err){
         if(!result){
              const list = new List({
                     name:customlist,
                     items:defaultItems
              })  ;

              list.save();
            res.redirect("/customlist");

         }

         else{
           
              res.render("list.ejs",{title:result.name,items:result.items,page:result.name});

         }

       }



      });
      



});


app.post('/', function(req, res) {

       var item = req.body.newItem;

       if(req.body.button == "work"){
              workitems.push(item);

              res.redirect("/work");
       }

       else{
        
       items.insertMany({name:item});
       res.redirect('/');
       }
       console.log(item);
});



app.listen(3000,function(req, res) {
       console.log('listening on port 3000')
})