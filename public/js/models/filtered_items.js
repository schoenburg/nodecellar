window.FilteredItemCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.term = options.term;
        this.filter = options.filter;
    },
    url: function() {
        return '/'+this.filter+'/'+this.term+'/items';
    },
    model: Item
});
