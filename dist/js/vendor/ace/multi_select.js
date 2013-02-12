/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Harutyun Amirjanyan <amirjanyan AT gmail DOT com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","./range_list","./range","./selection","./mouse/multi_select_handler","./lib/event","./commands/multi_select_commands","./search","./edit_session","./editor"],function(e,t,n){function c(e,t,n){return l.$options.wrap=!0,l.$options.needle=t,l.$options.backwards=n==-1,l.find(e)}function d(e,t){return e.row==t.row&&e.column==t.column}function v(e){e.$onAddRange=e.$onAddRange.bind(e),e.$onRemoveRange=e.$onRemoveRange.bind(e),e.$onMultiSelect=e.$onMultiSelect.bind(e),e.$onSingleSelect=e.$onSingleSelect.bind(e),t.onSessionChange.call(e,e),e.on("changeSession",t.onSessionChange.bind(e)),e.on("mousedown",o),e.commands.addCommands(a.defaultCommands),m(e)}function m(e){function i(){n&&(r.style.cursor="",n=!1)}var t=e.textInput.getElement(),n=!1,r=e.renderer.content;u.addListener(t,"keydown",function(e){e.keyCode==18&&!(e.ctrlKey||e.shiftKey||e.metaKey)?n||(r.style.cursor="crosshair",n=!0):n&&(r.style.cursor="")}),u.addListener(t,"keyup",i),u.addListener(t,"blur",i)}var r=e("./range_list").RangeList,i=e("./range").Range,s=e("./selection").Selection,o=e("./mouse/multi_select_handler").onMouseDown,u=e("./lib/event"),a=e("./commands/multi_select_commands");t.commands=a.defaultCommands.concat(a.multiSelectCommands);var f=e("./search").Search,l=new f,h=e("./edit_session").EditSession;(function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}).call(h.prototype),function(){this.ranges=null,this.rangeList=null,this.addRange=function(e,t){if(!e)return;if(!this.inMultiSelectMode&&this.rangeCount==0){var n=this.toOrientedRange();if(e.intersects(n))return t||this.fromOrientedRange(e);this.rangeList.add(n),this.$onAddRange(n)}e.cursor||(e.cursor=e.end);var r=this.rangeList.add(e);return this.$onAddRange(e),r.length&&this.$onRemoveRange(r),this.rangeCount>1&&!this.inMultiSelectMode&&(this._emit("multiSelect"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),t||this.fromOrientedRange(e)},this.toSingleRange=function(e){e=e||this.ranges[0];var t=this.rangeList.removeAll();t.length&&this.$onRemoveRange(t),e&&this.fromOrientedRange(e)},this.substractPoint=function(e){var t=this.rangeList.substractPoint(e);if(t)return this.$onRemoveRange(t),t[0]},this.mergeOverlappingRanges=function(){var e=this.rangeList.merge();e.length?this.$onRemoveRange(e):this.ranges[0]&&this.fromOrientedRange(this.ranges[0])},this.$onAddRange=function(e){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(e),this._emit("addRange",{range:e})},this.$onRemoveRange=function(e){this.rangeCount=this.rangeList.ranges.length;if(this.rangeCount==1&&this.inMultiSelectMode){var t=this.rangeList.ranges.pop();e.push(t),this.rangeCount=0}for(var n=e.length;n--;){var r=this.ranges.indexOf(e[n]);this.ranges.splice(r,1)}this._emit("removeRange",{ranges:e}),this.rangeCount==0&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._emit("singleSelect"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),t=t||this.ranges[0],t&&!t.isEqual(this.getRange())&&this.fromOrientedRange(t)},this.$initRangeList=function(){if(this.rangeList)return;this.rangeList=new r,this.ranges=[],this.rangeCount=0},this.getAllRanges=function(){return this.rangeList.ranges.concat()},this.splitIntoLines=function(){if(this.rangeCount>1){var e=this.rangeList.ranges,t=e[e.length-1],n=i.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(n,t.cursor==t.start)}else{var n=this.getRange(),r=n.start.row,s=n.end.row;if(r==s)return;var o=[],u=this.getLineRange(r,!0);u.start.column=n.start.column,o.push(u);for(var a=r+1;a<s;a++)o.push(this.getLineRange(a,!0));u=this.getLineRange(s,!0),u.end.column=n.end.column,o.push(u),o.forEach(this.addRange,this)}},this.toggleBlockSelection=function(){if(this.rangeCount>1){var e=this.rangeList.ranges,t=e[e.length-1],n=i.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(n,t.cursor==t.start)}else{var r=this.session.documentToScreenPosition(this.selectionLead),s=this.session.documentToScreenPosition(this.selectionAnchor),o=this.rectangularRangeBlock(r,s);o.forEach(this.addRange,this)}},this.rectangularRangeBlock=function(e,t,n){var r=[],s=e.column<t.column;if(s)var o=e.column,u=t.column;else var o=t.column,u=e.column;var a=e.row<t.row;if(a)var f=e.row,l=t.row;else var f=t.row,l=e.row;o<0&&(o=0),f<0&&(f=0),f==l&&(n=!0);for(var c=f;c<=l;c++){var h=i.fromPoints(this.session.screenToDocumentPosition(c,o),this.session.screenToDocumentPosition(c,u));if(h.isEmpty()){if(p&&d(h.end,p))break;var p=h.end}h.cursor=s?h.start:h.end,r.push(h)}a&&r.reverse();if(!n){var v=r.length-1;while(r[v].isEmpty()&&v>0)v--;if(v>0){var m=0;while(r[m].isEmpty())m++}for(var g=v;g>=m;g--)r[g].isEmpty()&&r.splice(g,1)}return r}}.call(s.prototype);var p=e("./editor").Editor;(function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(e){e.cursor||(e.cursor=e.end);var t=this.getSelectionStyle();return e.marker=this.session.addMarker(e,"ace_selection",t),this.session.$selectionMarkers.push(e),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,e},this.removeSelectionMarker=function(e){if(!e.marker)return;this.session.removeMarker(e.marker);var t=this.session.$selectionMarkers.indexOf(e);t!=-1&&this.session.$selectionMarkers.splice(t,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length},this.removeSelectionMarkers=function(e){var t=this.session.$selectionMarkers;for(var n=e.length;n--;){var r=e[n];if(!r.marker)continue;this.session.removeMarker(r.marker);var i=t.indexOf(r);i!=-1&&t.splice(i,1)}this.session.selectionMarkerCount=t.length},this.$onAddRange=function(e){this.addSelectionMarker(e.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(e){this.removeSelectionMarkers(e.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(e){if(this.inMultiSelectMode)return;this.inMultiSelectMode=!0,this.setStyle("multiselect"),this.keyBinding.addKeyboardHandler(a.keyboardHandler),this.commands.on("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onSingleSelect=function(e){if(this.session.multiSelect.inVirtualMode)return;this.inMultiSelectMode=!1,this.unsetStyle("multiselect"),this.keyBinding.removeKeyboardHandler(a.keyboardHandler),this.commands.removeEventListener("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelectExec=function(e){var t=e.command,n=e.editor;if(!n.multiSelect)return;t.multiSelectAction?t.multiSelectAction=="forEach"?n.forEachSelection(t,e.args):t.multiSelectAction=="single"?(n.exitMultiSelectMode(),t.exec(n,e.args||{})):t.multiSelectAction(n,e.args||{}):(t.exec(n,e.args||{}),n.multiSelect.addRange(n.multiSelect.toOrientedRange()),n.multiSelect.mergeOverlappingRanges()),e.preventDefault()},this.forEachSelection=function(e,t){if(this.inVirtualSelectionMode)return;var n=this.session,r=this.selection,i=r.rangeList,o=r._eventRegistry;r._eventRegistry={};var u=new s(n);this.inVirtualSelectionMode=!0;for(var a=i.ranges.length;a--;)u.fromOrientedRange(i.ranges[a]),this.selection=n.selection=u,e.exec(this,t||{}),u.toOrientedRange(i.ranges[a]);u.detach(),this.selection=n.selection=r,this.inVirtualSelectionMode=!1,r._eventRegistry=o,r.mergeOverlappingRanges(),this.onCursorChange(),this.onSelectionChange()},this.exitMultiSelectMode=function(){if(this.inVirtualSelectionMode)return;this.multiSelect.toSingleRange()},this.getCopyText=function(){var e="";if(this.inMultiSelectMode){var t=this.multiSelect.rangeList.ranges;e=[];for(var n=0;n<t.length;n++)e.push(this.session.getTextRange(t[n]));e=e.join(this.session.getDocument().getNewLineCharacter())}else this.selection.isEmpty()||(e=this.session.getTextRange(this.getSelectionRange()));return e},this.onPaste=function(e){this._emit("paste",e);if(!this.inMultiSelectMode)return this.insert(e);var t=e.split(/\r\n|\r|\n/),n=this.selection.rangeList.ranges;if(t.length>n.length||t.length<=2||!t[1])return this.commands.exec("insertstring",this,e);for(var r=n.length;r--;){var i=n[r];i.isEmpty()||this.session.remove(i),this.session.insert(i.start,t[r])}},this.findAll=function(e,t,n){t=t||{},t.needle=e||t.needle,this.$search.set(t);var r=this.$search.findAll(this.session);if(!r.length)return 0;this.$blockScrolling+=1;var i=this.multiSelect;n||i.toSingleRange(r[0]);for(var s=r.length;s--;)i.addRange(r[s],!0);return this.$blockScrolling-=1,r.length},this.selectMoreLines=function(e,t){var n=this.selection.toOrientedRange(),r=n.cursor==n.end,s=this.session.documentToScreenPosition(n.cursor);this.selection.$desiredColumn&&(s.column=this.selection.$desiredColumn);var o=this.session.screenToDocumentPosition(s.row+e,s.column);if(!n.isEmpty())var u=this.session.documentToScreenPosition(r?n.end:n.start),a=this.session.screenToDocumentPosition(u.row+e,u.column);else var a=o;if(r){var f=i.fromPoints(o,a);f.cursor=f.start}else{var f=i.fromPoints(a,o);f.cursor=f.end}f.desiredColumn=s.column;if(!this.selection.inMultiSelectMode)this.selection.addRange(n);else if(t)var l=n.cursor;this.selection.addRange(f),l&&this.selection.substractPoint(l)},this.transposeSelections=function(e){var t=this.session,n=t.multiSelect,r=n.ranges;for(var i=r.length;i--;){var s=r[i];if(s.isEmpty()){var o=t.getWordRange(s.start.row,s.start.column);s.start.row=o.start.row,s.start.column=o.start.column,s.end.row=o.end.row,s.end.column=o.end.column}}n.mergeOverlappingRanges();var u=[];for(var i=r.length;i--;){var s=r[i];u.unshift(t.getTextRange(s))}e<0?u.unshift(u.pop()):u.push(u.shift());for(var i=r.length;i--;){var s=r[i],o=s.clone();t.replace(s,u[i]),s.start.row=o.start.row,s.start.column=o.start.column}},this.selectMore=function(e,t){var n=this.session,r=n.multiSelect,i=r.toOrientedRange();if(i.isEmpty()){var i=n.getWordRange(i.start.row,i.start.column);i.cursor=i.end,this.multiSelect.addRange(i)}var s=n.getTextRange(i),o=c(n,s,e);o&&(o.cursor=e==-1?o.start:o.end,this.multiSelect.addRange(o)),t&&this.multiSelect.substractPoint(i.cursor)}}).call(p.prototype),t.onSessionChange=function(e){var t=e.session;t.multiSelect||(t.$selectionMarkers=[],t.selection.$initRangeList(),t.multiSelect=t.selection),this.multiSelect=t.multiSelect;var n=e.oldSession;n&&(n.multiSelect&&n.multiSelect.editor==this&&(n.multiSelect.editor=null),t.multiSelect.removeEventListener("addRange",this.$onAddRange),t.multiSelect.removeEventListener("removeRange",this.$onRemoveRange),t.multiSelect.removeEventListener("multiSelect",this.$onMultiSelect),t.multiSelect.removeEventListener("singleSelect",this.$onSingleSelect)),t.multiSelect.on("addRange",this.$onAddRange),t.multiSelect.on("removeRange",this.$onRemoveRange),t.multiSelect.on("multiSelect",this.$onMultiSelect),t.multiSelect.on("singleSelect",this.$onSingleSelect),this.inMultiSelectMode!=t.selection.inMultiSelectMode&&(t.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},t.MultiSelect=v});