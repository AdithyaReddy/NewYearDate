var path = require('path');

module.exports = function(app, db, PythonShell) {
    app.post('/facebooklogin', (req, res) => {
        var fb_id = req.body.facebook_id;
        console.log(fb_id+' this is the facebook_id that is trying to login\n\n');
        console.log(req.body+' this is the BODY that is trying to login\n\n');
        if (fb_id) {
            const details = {"facebook_id" : fb_id};
            console.log(fb_id+' this is the facebook_id that is trying to login');
            db.collection('users').findOne(details, (err, item) => {
                if (err) {
                  return res.send({'error':'An error has occurred fetching the user object'});
                } else {
                    if (item) {
                        return res.send({"result" : "user already exists!"});
                    }
                    else {
                        var facebook_id = req.body.facebook_id;
                        var name = req.body.name;
                        var gender = req.body.gender;
                        var min_age = req.body.min_age;
                        var email = req.body.email;

                        const userObj = {
                            'facebook_id' : facebook_id,
                            'name' : name,
                            'gender' : gender,
                            'min_age' : min_age,
                            'email' : email
                        };

                        db.collection('users').insert(userObj, (err, result) => {
                            if (err) { 
                              return res.send({ 'error': 'An error has occurred while creating the user object' }); 
                            } else {
                              return res.send({'result' : 'Hurray!!! User successfully logged in.'});
                            }
                        });
                    }
                }
            });
        }
    });
  
    app.post('/updatecrushes', (req, res) => {
      const user_facebook_id = req.body.facebook_id;
      const crush_list_usernames = req.body.crush_list;
      var details = {'facebook_id' : user_facebook_id};
      
      if (crush_list_usernames && crush_list_usernames.length > 0) {
        db.collection('users').findOne(details, (err, item) => {
            if (err) return res.send('There was an error while fetching User!')
            if (item) {
                var crush_list = item.crush_list;
                if (crush_list && crush_list.length > 0) {
                    return res.send('You\'ve already chosen your crush list. Kitti baar choose karoge?');
                }
            }
        
            var crush_list_fbids = []
            
            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                args: [crush_list_usernames]
            };
            PythonShell.run('fbidgetter.py', options, function (err, results) {
                if (err) {
                    return res.send({ 'error': 'An error has occurred while creating the user object' }); 
                }
                crush_list_fbids = results
                if (crush_list_fbids.length > 0) {
                    item.crush_list = crush_list_fbids;
                    const details = { 'facebook_id': user_facebook_id };
                    db.collection('users').update(details, item, (err, result) => {
                        if (err) { 
                            console.log(err+'this is the error')
                            return res.send({ 'error': 'An error has occurred while creating the user object' }); 
                        } else {
                            return res.send('Great!! You have successfully updated your crush list. We would notify you on Facebook if one of your crushes chooses you as a crush.');
                        }
                    });
                }
                else {
                    return res.send({ 'error': 'No Facebook ids found!!! sorry' });
                }
            });   
            });
        }
        else {
            return res.send({ 'error': 'No usernames found' });
        }
    });


    app.get('/', (req, res) => {
        res.render(path.join(__dirname + '/../../public/index'));
    });

  };