define(["require","exports","module","../lib/oop","./text","../tokenizer","./yaml_highlight_rules","./matching_brace_outdent"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./yaml_highlight_rules").YamlHighlightRules,u=e("./matching_brace_outdent").MatchingBraceOutdent,a=function(){this.$tokenizer=new s((new o).getRules()),this.$outdent=new u};r.inherits(a,i),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);if(e=="start"){var i=t.match(/^.*[\{\(\[]\s*$/);i&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)}}.call(a.prototype),t.Mode=a});