define(["backbone","underscore","jquery","vent"],function(e,t,n,r){return e.View.extend({el:"#compiled",initialize:function(){this.converter=new Showdown.converter,this.$el.hide(),r.on("compiled:render",this.setOutput,this)},setOutput:function(e){this.$el.parent().find(".weak-text").remove(),this.$el.html(this.converter.makeHtml(e)),this.$el.show()}})});