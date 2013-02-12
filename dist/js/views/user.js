define(["backbone","underscore","jquery","vent","js/models/user"],function(e,t,n,r,i){return e.View.extend({el:"#user-box",initialize:function(){this.model=new i({_id:"foo"}),this.model.fetch().then(n.proxy(this.initiateMarkdowner,this)),this.$el.modal({show:!1,keyboard:!0}),r.on("user:show",this.showModal,this),r.on("user:hide",this.hideModal,this),r.on("user:toggle",this.toggleModal,this),r.on("user:setActiveDocument",this.setActiveDocument,this),r.on("user:setTheme",this.setTheme,this),r.on("user:setView",this.setView,this),r.on("user:setSidebarVisibility",this.setSidebarVisibility,this)},initiateMarkdowner:function(){var e=this.model.get("settings")||{};e.theme&&r.trigger("editor:changeTheme",e.theme),e.activeDocument&&r.trigger("sidebar:loadDocument",e.activeDocument,this),typeof e.horizontal!="undefined"&&r.trigger("editor:toggleHorizontal",e.horizontal,this),typeof e.sidebarVisible!="undefined"&&r.trigger("sidebar:toggle",e.sidebarVisible,this)},showModal:function(e){e&&this.setModel(e),this.$el.modal("show")},hideModal:function(){this.$el.modal("hide")},toggleModal:function(e){this.$el.modal("toggle")},setActiveDocument:function(e){var t=this.model.get("settings")||{};t.activeDocument=e,this.model.save({settings:t})},setTheme:function(e){var t=this.model.get("settings")||{};t.theme=e,this.model.save({settings:t})},setView:function(e){var t=this.model.get("settings")||{};t.horizontal=e,this.model.save({settings:t})},setSidebarVisibility:function(e){var t=this.model.get("settings")||{};t.sidebarVisible=e,this.model.save({settings:t})}})});