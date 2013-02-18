define(["backbone","underscore","jquery","vent","ace","js/models/document"],function(e,t,n,r,i,s){var o="ace/theme/";return e.View.extend({el:"#editor",_defaultTheme:"twilight",_cssMode:"ace/mode/less",_markdownMode:"ace/mode/markdown",_changeIterator:0,_changeSaveThreshold:40,_fetchingDocument:!1,_activeStyling:!1,initialize:function(e){this.e=i.edit(this.el),this.e.setReadOnly(!0),this.e.setTheme(o+this._defaultTheme),this.e.getSession().setMode(this._markdownMode),this.addCommand(),e&&e.fileModel&&(this.fileModel=e.fileModel),e&&e.activeDoc&&(this.activeDoc=e.activeDoc),this.e.on("change",n.proxy(this.onChange,this)),this.noFile(),r.on("editor:compile",this.compile,this),r.on("editor:changeTheme",this.changeTheme,this),r.on("editor:editStyling",this.toggleEditStyling,this),r.on("editor:loadDocument",this.loadDocument,this),r.on("editor:saveDocument",this.saveDocument,this),r.on("editor:currentEditorFileOptions",this.currentEditorFileOptions,this),r.on("editor:noFile",this.noFile,this),r.on("editor:toggleHorizontal",this.toggleHorizontal,this)},noFile:function(){this.e.setValue("# No file defined. Create a new one or select from the sidebar"),this.e.setReadOnly(!0),r.trigger("compiled:render",this.e.getValue())},toggleEditStyling:function(e){e=e||this.fileModel;var t=this,n=function(){return t._activeStyling?t.regularWriteMode():t.stylingWriteMode()};if(e.get("_id")===this.fileModel.get("_id"))return n();this.loadDocument(e,n)},stylingWriteMode:function(){var e=this.activeDoc.get("style")||'// Write in LESS\n\n// Default style:\n@import "/stylesheets/default-remark.css";',t=this;this.saveDocument(function(){t._activeStyling=!0,t.e.getSession().setMode(t._cssMode),t.e.setValue(e),t.e.clearSelection(),t.e.moveCursorTo(0,0)})},regularWriteMode:function(){var e=this.activeDoc.get("body"),t=this;this.saveDocument(function(){t._activeStyling=!1,t.e.getSession().setMode(t._markdownMode),t.e.setValue(e),t.e.clearSelection(),t.e.moveCursorTo(0,0)})},compile:function(){var e=this;if(e.fileModel.get("remark"))return r.trigger("editor:saveDocument",function(){r.trigger("compiled:remark",e.fileModel)});r.trigger("compiled:render",e.e.getValue())},changeTheme:function(e){r.trigger("user:setTheme",e),this.e.setTheme(o+e)},onChange:function(e){if(this._activeStyling)return;if(this.fileModel&&this.fileModel.get("remark")===!0)return;this._changeIterator>this._changeSaveThreshold&&(this._changeIterator=0,r.trigger("editor:saveDocument")),this._changeIterator%5===0&&r.trigger("editor:compile"),this._changeIterator++},toggleHorizontal:function(e){if(typeof e=="undefined"){this.$el.parent().toggleClass("horizontal"),r.trigger("user:setView",this.$el.parent().hasClass("horizontal")),this.e.resize();return}e?this.$el.parent().addClass("horizontal"):this.$el.parent().removeClass("horizontal"),this.e.resize()},currentEditorFileOptions:function(){r.trigger("fileOptions:show",this.fileModel)},loadDocument:function(e,t){if(!e||this._fetchingDocument)return;if(this.activeDoc&&this.activeDoc.get("file_id")===e.get("_id"))return;var n=this,i=function(){n.fileModel=e;var i=e.get("_id");r.trigger("load:show","Opening ..."),n._fetchingDocument=!0,n.activeDoc=new s({file_id:i}),n.activeDoc.fetch().then(function(){n.setContent(t)})};if(this.activeDoc)return n.saveDocument(i);i()},setReadOnly:function(){this.e.setReadOnly(!0)},setContent:function(e){e=e||function(){},this._activeStyling&&(this._activeStyling=!1,this.e.getSession().setMode(this._markdownMode)),this.e.setValue(this.activeDoc.get("body")),r.trigger("load:hide"),this.e.clearSelection(),this.e.moveCursorTo(0,0),this.fileModel.trigger("loaded"),r.trigger("user:setActiveDocument",this.fileModel),this.e.setReadOnly(!1),r.trigger("editor:compile"),this._fetchingDocument=!1,this._changeIterator=0,e()},saveDocument:function(e){e=e||function(){},this._activeStyling?this.activeDoc.set({style:this.e.getValue()}):this.activeDoc.set({body:this.e.getValue()}),r.trigger("load:show","Saving ..."),this.activeDoc.save().then(function(){r.trigger("load:hide"),e()})},_deactivateCommand:function(e,t,n){this.e.commands.addCommand({name:e,bindKey:{win:t,mac:n},exec:function(e){return!1},readOnly:!0})},addCommand:function(){var e=this;this.e.commands.addCommand({name:"markdown",bindKey:{win:"Ctrl-M",mac:"Command-M"},exec:function(t){e.compile()},readOnly:!0}),this.e.commands.addCommand({name:"newFile",bindKey:{win:"Ctrl-L",mac:"Command-L"},exec:function(e){return r.trigger("sidebar:newfile"),!1},readOnly:!0}),this.e.commands.addCommand({name:"saveDocument",bindKey:{win:"Ctrl-S",mac:"Command-S"},exec:function(e){return r.trigger("editor:saveDocument"),!0},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Shift-Ctrl-L",mac:"Shift-Command-L"},exec:function(e){return r.trigger("sidebar:newfolder"),!1},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Ctrl-K",mac:"Command-K"},exec:function(e){return r.trigger("sidebar:toggle"),!1},readOnly:!0}),this._deactivateCommand("search","Ctrl-F","Command-F"),this._deactivateCommand("replace","Ctrl-R","Command-Option-F"),this._deactivateCommand("replaceall","Ctrl-Shift-R","Command-Shift-Option-F")}})});