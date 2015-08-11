
var cs = require('../dispatcher/constants');

var request = require('superagent');
var fluxStores = require("flux-stores");
var Model = fluxStores.Model;
var Collection = fluxStores.Collection;

var Router = new Model({view: 'posts', navid: 24});
var App = new Model({name: "Joke-LAN S15", description: ""});
var Navigation = new Collection([]);
var Posts = new Collection([]);
var Pages = new Collection([]);



// Dispatch ajax request
request.get(cs.JOKELAN_JSON_API+'/posts')
.end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      Posts.reset(res.body)
   });

request.get(cs.JOKELAN_JSON_API+'/pages')
.end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      Pages.reset(res.body)
   });


request.get(cs.JOKELAN_JSON_API + '/menu')
.end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      Navigation.reset(res.body);
    });


request.get(cs.JOKELAN_JSON_API)
.end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      App.set(res.body);
    });


module.exports = {
  navigation: Navigation,
  posts: Posts,
  pages: Pages,
  router: Router,
  app: App
};