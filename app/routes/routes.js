module.exports = function(app, db) {
    app.post('/facebooklogin', (req, res) => {
        var fb_id = req.body.facebook_id;
        if (fb_id) {
            const details = {"facebook_id" : fb_id};
            db.collection('users').findOne(details, (err, item) => {
                if (err) {
                  res.send({'error':'An error has occurred fetching the user object'});
                } else {
                    if (item) {
                        res.send({"result" : "user already exists!"});
                    }
                    else {
                        var facebook_id = req.body.facebook_id;
                        var name = req.body.name;
                        var gender = req.body.gender;
                        var auth_token = req.body.auth_token;
                        var min_age = req.body.min_age;
                        var max_age = req.body.max_age;
                        var email = req.body.email;

                        const userObj = {
                            'facebook_id' : facebook_id,
                            'name' : name,
                            'gender' : gender,
                            'auth_token' : auth_token,
                            'min_age' : min_age,
                            'max_age' : max_age,
                            'email' : email
                        };

                        db.collection('users').insert(userObj, (err, result) => {
                            if (err) { 
                              res.send({ 'error': 'An error has occurred while creating the user object' }); 
                            } else {
                              res.send(result.ops[0]);
                            }
                        });
                    }
                }
            });
        }
    });
  
    app.post('/updatecrushes', (req, res) => {
      console.log(req.body)
      res.send('Dude, this is awesome')
    });
  
  };