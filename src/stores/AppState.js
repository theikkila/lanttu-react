
var cs = require('../dispatcher/constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var request = require('superagent');
var _ = require('lodash');

var _posts = []; // collection of post items
var _pages = []; // collection of page items
var _navigation = {items:[]}; // collection of nav items


/**
 * Create a page item.
 * @param {object} Post to be added
 */
function createPost(post) {
  // Using the current timestamp in place of a real id.
  _posts.push(post);
}

/**
 * Set navigation
 * @param {object} Navi to be setted
 */
function setNavigation(navi) {
  _navigation = navi;
}


/**
 * Create a page item.
 * @param {object} Page to be added
 */
function createPage(page) {
  // Using the current timestamp in place of a real id.
  _pages.push(page);
}




var AppState = assign({}, EventEmitter.prototype, {
  /**
   * Get the main navigation.
   * @return {object}
   */
  getNavigation: function() {
    return _navigation;
  },
  /**
   * Get the entire collection of posts.
   * @return {object}
   */
  getAllPosts: function() {
    return _posts;
  },
  /**
   * Get the entire collection of pages.
   * @return {object}
   */
  getAllPages: function() {
    return _pages;
  },


  emitChange: function() {
    this.emit(cs.CHANGE);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(cs.CHANGE, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(cs.CHANGE, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var data = payload.data;
    switch(payload.type) {
      case cs.CREATEPOST:
        createPost(data);
        AppState.emitChange();
        break;
      case cs.CREATEPAGE:
        createPage(data);
        AppState.emitChange();
        break;
      case cs.LOADNAVI:
        setNavigation(data);
        AppState.emitChange();
        break;

      case cs.DESTROY:
        //destroy(data.slug);
        AppState.emitChange();
        break;

      // add more cases for other actionTypes, like page_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});


// Dispatch ajax request
request.get(cs.JOKELAN_JSON_API+'/posts')
.end(function(err, res){
     if (res.ok) {
      _.map(res.body, createPost);
      AppState.emitChange();
     } else {
       alert('Oh no! error ' + res.text);
     }
   });


request.get(cs.JOKELAN_JSON_API + '/menus/2')
.end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      setNavigation(res.body);
      AppState.emitChange();
    });



module.exports = AppState;