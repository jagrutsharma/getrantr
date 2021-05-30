var AddRantView = Backbone.View.extend({
  initialize: function () {
    this.$('textarea').on('keyup', this.onChange.bind(this))
    this.$('form').on('submit', this.onSubmit.bind(this))
    var text = localStorage.getItem('next-rant')
    if (text) {
      this.$('textarea').val(text)
    }
  },

  onChange: function (evt) {
    var text = (evt.target || {}).value
    if (typeof text === 'string') {
      localStorage.setItem('next-rant', text)
    }
  },

  onSubmit: function (evt) {
    evt.preventDefault()
    var form = evt.target
    var rant = {
      text: form.rant.value,
    }

    //guard against the rare case where analytics.js failed to load
    //We have to check window.analytics since it will be anchored to window.
    if (window.analytics) {
      analytics.trackConversion()
    }
    if (rant.text.length > 0) {
      this.collection.create(rant, { wait: true })
    }

    form.rant.value = ''
  },
})
