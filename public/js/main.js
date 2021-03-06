var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "items"	            : "list",
        "items/page/:page"	: "list",
        "items/add"         : "addItem",
        "items/:id"         : "itemDetails",
        "filter/:filter/:term/items": "filterList",
        "filter/:filter/:term/items/page/:page": "filterList",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var itemList = new ItemCollection();
        itemList.fetch({success: function(){
            $("#content").html(new ItemListView({model: itemList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    filterList: function(filter,term,page) {
        console.log(term);
        console.log(filter)
        var p = page ? parseInt(page, 10) : 1;
        var itemList = new FilteredItemCollection([],{term:term, filter: filter});
        itemList.fetch({success: function(){
            $("#content").html(new ItemListView({model: itemList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    itemDetails: function (id) {
        var item = new Item({_id: id});
        item.fetch({success: function(){
            $("#content").html(new ItemView({model: item}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addItem: function() {
        var item = new Item();
        $('#content').html(new ItemView({model: item}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'ItemView', 'ItemListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
