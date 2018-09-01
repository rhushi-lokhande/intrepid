const Query = require('../model/query');

let QueryController = {
    newQuery: function (req, res) {
        console.log(req.body);
        var que = new Query();
        que.email = req.body.email;
        que.name = req.body.name;
        que.message = req.body.message;
        que.save((err, que) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.send(que);
        });
    },
    queries:function(req,res){
        Query.find((err,data)=>{
            if (err) {
                console.log(err);
                throw err;
            }
            return res.send(data);
        })
    }
}

module.exports = QueryController;;