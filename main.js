var MainView = Backbone.View.extend({
    el : $('#fruit'), // select a pre-existing element on the page
    //id: 'fruit',    // create new element by either tagname or class / id
    //tagName 'p',    // create a new element entirely
    events: {
      'click' : "alarm",            // in jQuery $('#fruit').click(function() { alert(); });
      'mouseover h1' : "hoverCraft" // in jQuery $('#fruit, h1').mouseover(function(){});
    },

    initialize: function () {
      var src = $('#mr-template').html();
      var template = Handlebars.compile(src); // local variable
      this.$el.append(template());
      var src2 = $('#ms-template').html();
      this.template = Handlebars.compile(src2); // setting this.template as 'template' for the render function
      // this.$el.append("stuff!");
      // the $ gives us the cached jQuery element (i.e. the element that exists already)
    },
    // this render function will append a name to the ms template on-the-fly
    render: function (name) {
      this.$el.append(this.template({name: name}));
    },
    alarm: function () {
      alert("Time to refresh!!");
    },
    hoverCraft: function() {
      console.log("Please turn red!");
      this.$el.children().css("color", "#F78181"); // children will focus on the H1 tag in this instance
    }
});
  var main = new MainView();
  // New View for Adventures //
  var AdventureView = Backbone.View.extend({
    events: {
      "click" : "adventureAlert"
    },
    // Passing in adventure => this allows for line 77
    initialize: function (adventure) {
      var src = $('#adventure-template').html();
      this.template = Handlebars.compile(src); // Giving AdventureView this dynamic template with "this"
      this.model = adventure; // sets the adventure to the views model
      // if we change one of the attr of the model, it will re-render it depending on the changes made
      this.listenTo(this.model, "change", this.render);
      //deals with changing the data but having the models respond and then render
    },
    render: function (adventure) {
      // $el is a div on default if not set
      // "adventure" and its attributes (these attr are being printed in the "adventure-template")
      var adventure_entry = this.$el.html(this.template(this.model.attributes));
      // appending the adventure to the div I made
      $('#adventure').html(adventure_entry); // setting html to the new adventure
    },

    adventureAlert: function () {
      alert(this.model.get("quest"))
    }
  });

  var Adventure = Backbone.Model.extend({
    defaults: {
      quest: "Slay the dragon",
      duration: 0,
      reward: "3 bags of Gold"
    }
  });

  var adventure1 = new Adventure(); // create a new instance of an Adventure (model)
  var adView = new AdventureView(adventure1); // creating a new instance of an adventure view AND passing in the book object we just created. Notice in the initialize function we are passing through the adventure
  adView.render(); // this renders the book the adventure that has already been set by default in our Model.

  var Adventures = Backbone.Collection.extend({
    model: Adventure,

    initialize: function () {
      // add event listener on the adventure collection that
      // gets called when you 'add' to this collection
      this.on("add", this.update);
    },
    update: function () {
      // this defines the update function ^^ above which is
      // applied to the collection in the initialize method
      alert("I am a collection and now have " + this.length)
    }
  });
