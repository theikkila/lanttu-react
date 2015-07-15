
var cs = require('../dispatcher/constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _pages = [
  {slug: "tsss", name:"Sampo", content:"sdasddasd"}
]; // collection of page items

/**
 * Create a page item.
 * @param {string} text The content of the page
 */
function create(slug, name, content) {
  // Using the current timestamp in place of a real id.
  _pages.push({
    slug: slug,
    name: name,
    content: content
  })
}

var PageStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of pages.
   * @return {object}
   */
  getAll: function() {
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
      case cs.CREATE:
        slug = data.slug.trim();
        if (slug !== '') {
          create(data.slug, data.name, data.content);
          PageStore.emitChange();
        }
        break;

      case cs.DESTROY:
        //destroy(data.slug);
        PageStore.emitChange();
        break;

      // add more cases for other actionTypes, like page_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = PageStore;