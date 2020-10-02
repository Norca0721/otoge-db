const toggleSwitch=document.getElementById("themeToggleCheckbox"),root=document.documentElement;window.matchMedia("(prefers-color-scheme: dark)").matches&&(toggleSwitch.checked=!1,root.setAttribute("data-theme","dark")),window.matchMedia("(prefers-color-scheme: light)").matches&&(toggleSwitch.checked=!0,root.setAttribute("data-theme","light")),whichTransitionEvent=()=>{let t,e=document.createElement("fakeelement"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in n)if(void 0!==e.style[t])return n[t]};let transitionEvent=whichTransitionEvent(),item=document.querySelector(".circle"),message=document.querySelector(".footer"),counter=1;function switchTheme(t){root.classList.toggle("transitioning"),t.target.checked?root.setAttribute("data-theme","light"):root.setAttribute("data-theme","dark"),root.addEventListener(transitionEvent,transitionEndCallback)}function updateQueryStringParameter(t,e){var n=new URLSearchParams(window.location.search);if("URLSearchParams"in window){""===e?n.delete(t):n.set(t,e);var a=window.location.pathname+"?"+n.toString();history.pushState(null,"",a)}}function clearQueryStringParameter(){new URLSearchParams(window.location.search);if("URLSearchParams"in window){var t=window.location.pathname;history.pushState(null,"",t)}}function unescapeSlashes(t){if(null!==t){let e=t.replace(/(^|[^\\])(\\\\)*\\$/,"$&\\");try{e=JSON.parse(`"${e}"`)}catch(e){return t}return t.replace(/(^|[^\\])(\\\\)*\\$/,"$&\\")}return t}function appendSelectboxStateClass(t,e){""!==e?t.addClass("changed"):t.removeClass("changed")}toggleSwitch.addEventListener("change",switchTheme,!1),transitionEndCallback=t=>{root.removeEventListener(transitionEvent,transitionEndCallback),root.classList.remove("transitioning")},$(document).ready((function(){$("html").removeClass("page-loading")}));
$(document).ready((function(){var e,a=new URLSearchParams(window.location.search),t=[{displayTitle:"ID (system)",name:"id",data:"id",className:"id",visible:!1},{displayTitle:"#",name:"index",data:"image_url",className:"id",data:function(e){return e.image_url.split(".")[0]},render:function(e,a,t){return"display"===a?'<div class="inner-wrap">'+e+"</div>":e},width:"20px",searchable:!1},{displayTitle:"アルバムアート",name:"jacket",data:"image_url",className:"jacket",render:function(e){return'<span class="img-wrap"><img src="jacket/'+e.split(".")[0]+'.jpg"/></span><span class="index">'+e.split(".")[0]+"</span>"},width:"50px",orderable:!1,searchable:!1},{displayTitle:"曲名",name:"title",data:"title",className:"song-title",render:function(e,a,t){return"display"===a?'<div class="inner-wrap"><span class="title">'+e+'</span><span class="artist-display hidden">'+t.artist+"</span></div>":"filter"===a?e:t.title_sort},width:"80vw"},{displayTitle:"曲名 (読み)",name:"title_sort",data:"title_sort",className:"title-sort",visible:!1,searchable:!1},{displayTitle:"曲名・アーティスト",name:"title_merged",data:"title",className:"artist",render:function(e,a,t){return"display"===a?'<div class="inner-wrap"><span class="artist-display hidden">'+t.artist+"</span></div>":t.title_sort},searchable:!1},{displayTitle:"ジャンル",name:"category",data:"category",className:"category",render:function(e,a,t){return"display"===a?'<div class="inner-wrap">'+e+"</div>":e},customDropdownSortSource:"category_id",filterable:!0},{displayTitle:"ジャンルID",name:"category_id",data:"category_id",width:"90px",visible:!1},{displayTitle:"チャプターID",name:"chap_id",data:"chap_id",className:"chapter-id",visible:!1},{displayTitle:"チャプター",name:"chap",data:function(e,a,t,r){return"sort"===a||"meta"===a?e.chap_id:(e.chap_chapter=e.chap_id.substr(3,2),"0"==e.chap_id.substr(0,1)?"1"==e.chap_id.substr(1,1)?(e.chap_book="1",e.chap_display=e.chap_book+"-"+e.chap_chapter+" "+e.chapter,e.chap_display):"2"==e.chap_id.substr(1,1)?(e.chap_book="2",e.chap_display=e.chap_book+"-"+e.chap_chapter+" "+e.chapter,e.chap_display):"3"==e.chap_id.substr(1,1)?"0308"==e.chap_id.substr(0,4)?(e.chap_book="3",e.chap_chapter=e.chap_id.substr(4,1),e.chap_display=e.chap_book+"-S"+e.chap_chapter+" "+e.chapter,e.chap_display):(e.chap_book="3",e.chap_display=e.chap_book+"-"+e.chap_chapter+" "+e.chapter,e.chap_display):(e.chap_display=e.chapter,e.chap_display):"80"==e.chap_id.substr(0,2)?(e.chap_book="SP2",e.chap_display=e.chap_book+"-"+e.chap_chapter+" "+e.chapter,e.chap_display):"99"==e.chap_id.substr(0,2)?(e.chap_book="SP",e.chap_display=e.chap_book+"-"+e.chap_chapter+" "+e.chapter,e.chap_display):(e.chap_display=e.chap_id+" "+e.chapter,e.chap_display))},className:"chapter",width:"15em",render:function(e,a,t){return"display"===a?'<div class="inner-wrap">'+e+"</div>":e},filterable:!0},{displayTitle:"属性",name:"enemy_type",data:"enemy_type",className:"type",render:function(e,a,t){return"display"===a?'<div class="inner-wrap"><span class="element-type-icon '+e.toLowerCase()+'"><span class="icon"></span><span class="label-text">'+e+"</span></span></div>":e},width:"40px",filterable:!0},{displayTitle:"キャラID",name:"chara_id",data:"chara_id",visible:!1},{displayTitle:"相手キャラ",name:"character",data:"character",className:"character",render:function(e,a,t){return"display"===a?'<div class="inner-wrap">'+e+"</div>":e},customDropdownSortSource:"chara_id",width:"10em",filterable:!0},{displayTitle:"相手レベル",name:"enemy_lv",data:"enemy_lv",className:"enemy-lv",render:function(e,a,t){return"display"===a?'<div class="inner-wrap">Lv.'+e+"</div>":e},customDropdownSortSource:i("enemy_lv"),width:"4em"},{displayTitle:"BASIC",name:"lev_bas",data:l("lev_bas","lev_bas_i"),className:"lv lv-bsc",render:n("lev_bas","lev_bas_i"),customDropdownSortSource:i("lev_bas"),reverseSortOrder:!0,width:"3rem",filterable:!flat_view},{displayTitle:"ADVANCED",name:"lev_adv",data:l("lev_adv","lev_adv_i"),className:"lv lv-adv",render:n("lev_adv","lev_adv_i"),customDropdownSortSource:i("lev_adv"),reverseSortOrder:!0,width:"3rem",filterable:!flat_view},{displayTitle:"EXPERT",name:"lev_exc",data:l("lev_exc","lev_exc_i"),className:"lv lv-exp",render:n("lev_exc","lev_exc_i"),customDropdownSortSource:i("lev_exc"),reverseSortOrder:!0,width:"3rem",filterable:!flat_view},{displayTitle:"MASTER",name:"lev_mas",data:l("lev_mas","lev_mas_i"),className:"lv lv-mas",render:n("lev_mas","lev_mas_i"),customDropdownSortSource:i("lev_mas"),reverseSortOrder:!0,width:"3rem",filterable:!flat_view},{displayTitle:"LUNATIC",name:"lev_lnt",data:l("lev_lnt","lev_lnt_i"),className:"lv lv-lnt",render:n("lev_lnt","lev_lnt_i"),customDropdownSortSource:i("lev_lnt"),reverseSortOrder:!0,width:"3rem",filterable:!flat_view},{displayTitle:"譜面",name:"chart_diff",data:flat_view?"chart_diff":null,className:"lv-name detail-hidden",width:"3rem",createdCell:flat_view?function(e,a,t,r,l){$(e).addClass(t.chart_diff)}:null,render:(e="chart_diff",function(a,t,r){return"display"===t?'<span class="diff-name">'+c(r[e])+"</span>":a}),searchable:!1,visible:!1},{displayTitle:"難易度グループ",name:"chart_lev",data:flat_view?"chart_lev":null,className:"lv detail-hidden",width:"4rem",customDropdownSortSource:i("chart_lev"),reverseSortOrder:!0,filterable:!1,visible:!1},{displayTitle:"譜面レベル",name:"chart_lev_i",data:flat_view?"chart_lev_i":null,className:"lv lv-name detail-hidden",render:flat_view?function(e,a,t,r){return function(t,l,s){return"display"===l?'<div class="inner-wrap"><span class="diff-name">'+c(s[e])+'</span><span class="lv-num-wrap"><span class="lv-num-simple">'+s[a]+'</span><span class="lv-num-precise">'+s[r]+"</span></span></div>":t}}("chart_diff","chart_lev",0,"chart_lev_i_display"):null,width:"4rem",createdCell:flat_view?function(e,a,t,r,l){$(e).addClass(t.chart_diff)}:null,filterable:!1,searchable:!1,visible:flat_view},{displayTitle:"NEW",name:"new",data:"new",searchable:!1,visible:!1},{displayTitle:"追加日",name:"date",data:"date",className:"date",filterable:!0,render:function(e,a,t){return"display"===a?'<div class="inner-wrap">'+e+"</div>":e},reverseSortOrder:!0,width:"4em"},{displayTitle:"(details)",name:"details",data:"id",className:"details detail-hidden",width:"10px"}],r=flat_view?[[21,"desc"],[13,"desc"],[23,"desc"]]:[[23,"desc"],[9,"asc"],[0,"asc"]];function l(e,a){return function(t,r,l,i){return"sort"===r?""===t[a]?s(t[e]):s(t[a]):t[e]}}function s(e){return""!=e?(lev_processed=parseInt(e)<10?"0"+e:e,lev_processed):""}function i(e){return function(a,t){return s(a[e]).localeCompare(s(t[e]))}}function n(e,a){return function(t,r,l){return"display"===r?'<div class="inner-wrap"><span class="lv-num-simple">'+l[e]+'</span><span class="lv-num-precise">'+l[a]+"</span></div>":t}}function c(e){switch(e){case"lev_bas":var a="BASIC";break;case"lev_adv":a="ADVANCED";break;case"lev_exc":a="EXPERT";break;case"lev_mas":a="MASTER";break;case"lev_lnt":a="LUNATIC"}return a}function d(e,a){return a?e.map((e=>["lev_bas","lev_adv","lev_exc","lev_mas","lev_lnt"].map((a=>e[a]?{...e,chart_diff:a,chart_lev:e[a],chart_lev_i:parseFloat(e[a+"_i"]||e[a].replace("+",".7")),chart_lev_i_display:e[a+"_i"]||'<span class="approx">'+parseFloat(e[a].replace("+",".7")).toFixed(1)+"</span>"}:null)))).flat().filter((e=>!!e)):e}if($.getJSON("data/music-ex.json",(e=>{$("#table").DataTable({data:d(e,flat_view),buttons:[{extend:"colvis",className:"config-btn",columns:".toggle",text:"カラムON/OFF",collectionTitle:"表示するカラムを選択",collectionLayout:"fixed",fade:150}],columns:t,deferRender:!0,dom:'<"toolbar-group"<"toolbar filters"><"toolbar search"f>><"toolbar secondary"<"info"ilB>><"table-inner"rt><"paging"p>',language:{sEmptyTable:"テーブルにデータがありません",sInfo:" _TOTAL_項目 (_START_〜_END_ 表示中)",sInfoEmpty:" 0 項目",sInfoFiltered:"（全 _MAX_ 項目）",sInfoPostFix:"",sInfoThousands:",",sLengthMenu:"1ページ表示 _MENU_",sLoadingRecords:"読み込み中...",sProcessing:"処理中...",sSearch:"キーワード検索",sZeroRecords:"一致するレコードがありません",oPaginate:{sFirst:"先頭",sLast:"最終",sNext:"次",sPrevious:"前"},oAria:{sSortAscending:": 列を昇順に並べ替えるにはアクティブにする",sSortDescending:": 列を降順に並べ替えるにはアクティブにする"}},lengthMenu:[[25,50,100,-1],[25,50,100,"All"]],order:r,responsive:{details:{type:"column",target:"tr",display:$.fn.dataTable.Responsive.display.modal({header:function(e){var a=e.data();return'<div class="modal-header"><div class="img-wrap"><img src="jacket/'+a.image_url.split(".")[0]+'.jpg"/></div><div class="content-wrap"><span class="title">'+a.title+'</span><span class="artist">'+a.artist+"</span></div></div>"}}),renderer:$.fn.dataTable.Responsive.renderer.tableAll()}},rowGroup:{dataSrc:"date",startRender:flat_view||""!=a?null:function(e,a){return"<div>"+a+" 追加</div>"}},scrollX:!0,initComplete:function(){var e=this.api().rows().data(),r=this.api();r.columns().every((function(){var l=r.order(),s=this,i=s.data(),n=t[s.index()];if("filterable"in n&&1==n.filterable){var c=$('<div class="select-wrap"><span class="label">'+n.displayTitle+"</span></div>").appendTo($(".toolbar.filters")),d=$('<select id="'+n.name+'"><option value="" data-default>——</option></select>');if(d.appendTo(c),d.on("change",(function(){var e=$(this).val(),a=$.fn.dataTable.util.escapeRegex($(this).val());appendSelectboxStateClass($(this),e),23===s.index()||""===a&&23===l[0][0]?s.rowGroup().enable():s.rowGroup().disable(),updateQueryStringParameter(n.name,e),s.search(a?"^"+a+"$":"",!0,!1).draw()})),i=n.customDropdownSortSource?i.map((function(e,a){return a})).sort((function(a,t){var r=e[a],l=e[t];return"function"==typeof n.customDropdownSortSource?n.customDropdownSortSource(r,l):r[n.customDropdownSortSource].localeCompare(l[n.customDropdownSortSource])})).map((function(e){return i[e]})):i.sort(),n.reverseSortOrder&&i.reverse(),i.unique().each((function(e,a){""!=e&&d.append('<option value="'+e+'">'+e+"</option>")})),"URLSearchParams"in window){var o=a.get(n.name);if(null!==o){var p=unescapeSlashes(o);i.unique().each((function(e){d.val(p)})),appendSelectboxStateClass(d,p)}}}})),"URLSearchParams"in window&&(a.forEach((function(e,l){r.columns().every((function(){var e=t[this.index()],r=a.get(e.name),l=$.fn.dataTable.util.escapeRegex(decodeURIComponent(r));null!==r&&this.search(r?"^"+l+"$":"",!0,!1)}))})),r.draw()),r.on("order.dt",(function(){var e=r.order(),a=r.columns().search(),t=!1;for(let e=0;e<a.length;e+=1)if(e in a&&""!==a[e]){t=!0;break}return 23!==e[0][0]?void r.rowGroup().disable():23!==e[0][0]||t?void 0:void r.rowGroup().enable()})),$("#table").addClass("loading-done"),$("html").removeClass("table-loading")}})})),$("select#chart_lev").on("change",(function(){var e=$("#table").DataTable(),a=$(this),t=$(this).val(),r=$.fn.dataTable.util.escapeRegex($(this).val());"filter"==a.data("type")?(e.column("chart_lev:name").search(r?"^"+r+"$":"",!0,!1),updateQueryStringParameter("chart_lev",t),e.draw()):window.location.href="/lv?chart_lev="+encodeURIComponent(t)})),"URLSearchParams"in window){var o=a.get("chart_lev");if(null!==o){var p=unescapeSlashes(o);$("select#chart_lev").val(p)}}$("a.reset-search").on("click",(function(){$("#table").DataTable().order(r).search("").columns().search("").draw(),clearQueryStringParameter(),$(".toolbar.filters select").prop("selectedIndex",0),console.log("search reset")}))}));
