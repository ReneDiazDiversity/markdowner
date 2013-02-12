/* ***** BEGIN LICENSE BLOCK *****
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
 *      Sergi Mansilla <sergi AT ajax DOT org>
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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./ocaml_highlight_rules","./matching_brace_outdent","../range"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./ocaml_highlight_rules").OcamlHighlightRules,u=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("../range").Range,f=function(){this.$tokenizer=new s((new o).getRules()),this.$outdent=new u};r.inherits(f,i);var l=/(?:[({[=:]|[-=]>|\b(?:else|try|with))\s*$/;(function(){this.toggleCommentLines=function(e,t,n,r){var i,s,o=!0,u=/^\s*\(\*(.*)\*\)/;for(i=n;i<=r;i++)if(!u.test(t.getLine(i))){o=!1;break}var f=new a(0,0,0,0);for(i=n;i<=r;i++)s=t.getLine(i),f.start.row=i,f.end.row=i,f.end.column=s.length,t.replace(f,o?s.match(u)[1]:"(*"+s+"*)")},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.$tokenizer.getLineTokens(t,e).tokens;return(!i.length||i[i.length-1].type!=="comment")&&e==="start"&&l.test(t)&&(r+=n),r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)}}).call(f.prototype),t.Mode=f});