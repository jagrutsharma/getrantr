var RantView = Backbone.View.extend({

  template: function(rant) {
    return `<div class="rant">
              <img src="${rant.imageURL}" alt="${rant.name}" />
              <div class="rant-content">
                <div class="status-text text-lg"><strong>${rant.name}</strong></div>
                <div class="status-text text-lg">${rant.text.substr(0, 140)}</div>
              </div>
              <div class="rant-meta">
                <form><button class="btn btn-link js-delete">delete</button></form>
                <div class="pull-right">${moment(rant.timestamp).fromNow()}</div>
              </div>
            </div>`;
  },

  initialize: function() {    
    this.model.on('change', this.render, this);
    this.$el.on('click', function(evt) {
      if (evt.target.matches('.js-delete')) {
        evt.preventDefault();
        this.onDelete(evt);
      }
    }.bind(this));
  },

  render: function() {
    //simple validator
    var rant = this.model.toJSON()
    if (typeof rant.text !== 'string') {
      console.error('Received invalid rant data: ', rant)
      rant.text = "Sorry! an error occured. We're on it!"
    }


    this.$el.html(this.template(rant));
    return this;
  },

  onDelete: function() {
    var savedThis = this    
    setTimeout(function() {
      savedThis.model.destroy();
      savedThis.remove();
    });
  }

});

var RantListView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.renderStatement, this);
  },

  render: function() {
    this.$el.html('');
    this.collection.each(this.renderStatement, this);
    return this;
  },

  renderStatement: function(model) {
    var view = new RantView({ model: model });
    this.$el.prepend(view.render().$el);
  }

});
