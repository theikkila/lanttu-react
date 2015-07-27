
var cs = require('../dispatcher/constants');

var request = require('superagent');
var _ = require('lodash');
var fluxStores = require("flux-stores");
var Model = fluxStores.Model;
var Collection = fluxStores.Collection;

var Router = new Model({view: 'posts', navid: 24});
var App = new Model({name: "Joke-LAN S15", description: ""});
var Navigation = new Model({items:[]});
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

function getPages(pagen, pages) {
  request.get(cs.JOKELAN_JSON_API+'/pages?page=' + pagen)
  .end(function(err, res){
        if(err){
          console.log('ERROR: ' + err);
        }
        var totalpages = res.headers['x-wp-totalpages'];
        var cpages = pages.concat(res.body);
        if (pagen >= totalpages) {
          Pages.reset(cpages)
        } else {
          getPages(pagen+1, cpages)
        }
     });
}
getPages(1,[]);


request.get(cs.JOKELAN_JSON_API + '/menus/2')
.end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      Navigation.set(res.body);
    });


request.get(cs.JOKELAN_JSON_API + '/')
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