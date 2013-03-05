define(["ace","backbone","underscore","jquery","vent","js/models/document"],function(e,t,n,r,i,s){var o="ace/theme/";return t.View.extend({el:"#editor",_defaultTheme:"twilight",_cssMode:"ace/mode/less",_markdownMode:"ace/mode/markdown",_changeIterator:0,_changeSaveThreshold:40,_fetchingDocument:!1,_activeStyling:!1,initialize:function(t){this.e=e.edit(this.el),this.e.setReadOnly(!0),this.e.setTheme(o+this._defaultTheme),this.e.getSession().setMode(this._markdownMode),this.addCommand(),t&&t.fileModel&&(this.fileModel=t.fileModel),t&&t.activeDoc&&(this.activeDoc=t.activeDoc),this.e.on("change",r.proxy(this.onChange,this)),this.noFile(),i.on("editor:compile",this.compile,this),i.on("editor:changeTheme",this.changeTheme,this),i.on("editor:editStyling",this.toggleEditStyling,this),i.on("editor:loadDocument",this.loadDocument,this),i.on("editor:saveDocument",this.saveDocument,this),i.on("editor:currentEditorFileOptions",this.currentEditorFileOptions,this),i.on("editor:noFile",this.noFile,this),i.on("editor:toggleHorizontal",this.toggleHorizontal,this)},noFile:function(){this.e.setValue("# No file defined. Create a new one or select from the sidebar"),this.e.setReadOnly(!0),i.trigger("compiled:render",this.e.getValue())},toggleEditStyling:function(e){e=e||this.fileModel;var t=this;if(!t.fileModel.get("remark"))return!1;var n=function(){return t._activeStyling?t.regularWriteMode():t.stylingWriteMode()};if(e.get("_id")===this.fileModel.get("_id"))return n();this.loadDocument(e,n)},stylingWriteMode:function(){var e=this.activeDoc.get("style")||'// Write in LESS\n\n// Default style:\n@import "/stylesheets/default-remark.css";',t=this;this.saveDocument(function(){t._activeStyling=!0,t.e.getSession().setMode(t._cssMode),t.e.setValue(e),t.e.clearSelection(),t.e.moveCursorTo(0,0)})},regularWriteMode:function(){var e=this.activeDoc.get("body"),t=this;this.saveDocument(function(){t._activeStyling=!1,t.e.getSession().setMode(t._markdownMode),t.e.setValue(e),t.e.clearSelection(),t.e.moveCursorTo(0,0)})},compile:function(){var e=this;if(e.fileModel.get("remark"))return i.trigger("editor:saveDocument",function(){i.trigger("compiled:remark",e.fileModel,e.e.getValue())});i.trigger("compiled:render",e.e.getValue())},changeTheme:function(e){i.trigger("user:setTheme",e),this.e.setTheme(o+e)},onChange:function(e){if(this._activeStyling)return;if(this.fileModel&&this.fileModel.get("remark")===!0)return;this._changeIterator>this._changeSaveThreshold&&(this._changeIterator=0,i.trigger("editor:saveDocument")),this._changeIterator%5===0&&i.trigger("editor:compile"),this._changeIterator++},toggleHorizontal:function(e){if(typeof e=="undefined"){this.$el.parent().toggleClass("horizontal"),i.trigger("user:setView",this.$el.parent().hasClass("horizontal")),this.e.resize();return}e?this.$el.parent().addClass("horizontal"):this.$el.parent().removeClass("horizontal"),this.e.resize()},currentEditorFileOptions:function(){i.trigger("fileOptions:show",this.fileModel)},loadDocument:function(e,t){if(!e||this._fetchingDocument)return;if(this.activeDoc&&this.activeDoc.get("file_id")===e.get("_id"))return;var n=this,r=function(){n.fileModel=e;var r=e.get("_id");i.trigger("load:show","Opening ..."),n._fetchingDocument=!0,n.activeDoc=new s({file_id:r}),n.activeDoc.fetch().then(function(){n.setContent(t)})};if(this.activeDoc)return n.saveDocument(r);r()},setReadOnly:function(){this.e.setReadOnly(!0)},setContent:function(e){e=e||function(){},this._activeStyling&&(this._activeStyling=!1,this.e.getSession().setMode(this._markdownMode)),this.e.setValue(this.activeDoc.get("body")),i.trigger("load:hide"),this.e.clearSelection(),this.e.moveCursorTo(0,0),this.fileModel.trigger("loaded"),i.trigger("user:setActiveDocument",this.fileModel),this.e.setReadOnly(!1),i.trigger("editor:compile"),this._fetchingDocument=!1,this._changeIterator=0,e()},saveDocument:function(e){e=e||function(){},this._activeStyling?this.activeDoc.set({style:this.e.getValue()}):this.activeDoc.set({body:this.e.getValue()}),i.trigger("load:show","Saving ..."),this.activeDoc.save().then(function(){i.trigger("load:hide"),e()})},_deactivateCommand:function(e,t,n){this.e.commands.addCommand({name:e,bindKey:{win:t,mac:n},exec:function(e){return!1},readOnly:!0})},addCommand:function(){var e=this;this.e.commands.addCommand({name:"markdown",bindKey:{win:"Ctrl-M",mac:"Command-M"},exec:function(t){e.compile()},readOnly:!0}),this.e.commands.addCommand({name:"newFile",bindKey:{win:"Ctrl-L",mac:"Command-L"},exec:function(e){return i.trigger("sidebar:newfile"),!1},readOnly:!0}),this.e.commands.addCommand({name:"saveDocument",bindKey:{win:"Ctrl-S",mac:"Command-S"},exec:function(e){return i.trigger("editor:saveDocument"),!0},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Shift-Ctrl-L",mac:"Shift-Command-L"},exec:function(e){return i.trigger("sidebar:newfolder"),!1},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Shift-Ctrl-I",mac:"Shift-Command-I"},exec:function(e){return i.trigger("editor:editStyling"),!1},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Ctrl-K",mac:"Command-K"},exec:function(e){return i.trigger("sidebar:toggle"),!1},readOnly:!0})}})});