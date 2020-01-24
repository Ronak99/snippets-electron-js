define("ace/theme/demoTestTheme",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-demoTestTheme";
exports.cssText = "\
.ace-demoTestTheme .ace_gutter {\
background: #282a36;\
color: rgb(144,145,148)\
}\
.ace-demoTestTheme .ace_print-margin {\
width: 1px;\
background: #44475a\
}\
.ace-demoTestTheme {\
background-color: #282a36;\
color: #f8f8f2\
}\
.ace-demoTestTheme .ace_cursor {\
color: #f8f8f0\
}\
.ace-demoTestTheme .ace_marker-layer .ace_selection {\
background: #44475a\
}\
.ace-demoTestTheme.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #282a36;\
border-radius: 2px\
}\
.ace-demoTestTheme .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174)\
}\
.ace-demoTestTheme .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #a29709\
}\
.ace-demoTestTheme .ace_marker-layer .ace_active-line {\
background: #44475a\
}\
.ace-demoTestTheme .ace_gutter-active-line {\
background-color: #44475a\
}\
.ace-demoTestTheme .ace_marker-layer .ace_selected-word {\
box-shadow: 0px 0px 0px 1px #a29709;\
border-radius: 3px;\
}\
.ace-demoTestTheme .ace_fold {\
background-color: #50fa7b;\
border-color: #f8f8f2\
}\
.ace-demoTestTheme .ace_keyword {\
color: #ff79c6\
}\
.ace-demoTestTheme .ace_constant.ace_language {\
color: #bd93f9\
}\
.ace-demoTestTheme .ace_constant.ace_numeric {\
color: #bd93f9\
}\
.ace-demoTestTheme .ace_constant.ace_character {\
color: #bd93f9\
}\
.ace-demoTestTheme .ace_constant.ace_character.ace_escape {\
color: #ff79c6\
}\
.ace-demoTestTheme .ace_constant.ace_other {\
color: #bd93f9\
}\
.ace-demoTestTheme .ace_support.ace_function {\
color: #8be9fd\
}\
.ace-demoTestTheme .ace_support.ace_constant {\
color: #6be5fd\
}\
.ace-demoTestTheme .ace_support.ace_class {\
font-style: italic;\
color: #66d9ef\
}\
.ace-demoTestTheme .ace_support.ace_type {\
font-style: italic;\
color: #66d9ef\
}\
.ace-demoTestTheme .ace_storage {\
color: #ff79c6\
}\
.ace-demoTestTheme .ace_storage.ace_type {\
font-style: italic;\
color: #8be9fd\
}\
.ace-demoTestTheme .ace_invalid {\
color: #F8F8F0;\
background-color: #ff79c6\
}\
.ace-demoTestTheme .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #bd93f9\
}\
.ace-demoTestTheme .ace_string {\
color: #f1fa8c\
}\
.ace-demoTestTheme .ace_comment {\
color: #6272a4\
}\
.ace-demoTestTheme .ace_variable {\
color: #50fa7b\
}\
.ace-demoTestTheme .ace_variable.ace_parameter {\
font-style: italic;\
color: #ffb86c\
}\
.ace-demoTestTheme .ace_entity.ace_other.ace_attribute-name {\
color: #50fa7b\
}\
.ace-demoTestTheme .ace_entity.ace_name.ace_function {\
color: #50fa7b\
}\
.ace-demoTestTheme .ace_entity.ace_name.ace_tag {\
color: blue;\
background:'red'\
}\
.ace-demoTestTheme .ace_invisible {\
color: #626680;\
}\
.ace-demoTestTheme .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y\
}";
exports.$selectionColorConflict = true;

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
                (function() {
                    window.require(["ace/theme/demoTestTheme"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            