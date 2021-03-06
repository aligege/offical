; (function ($)
{
    var _util = CS.util; var _params = {}, _nodes = {}; function init(searchResultUrl)
    { _params.searchResultUrl = searchResultUrl || {}; _nodes.$searchInput = $('#searchInputBySite'); _nodes.$searchBySiteBtn = $('#searchBySiteBtn'); _nodes.$siteList = $('#searchSiteList'); _nodes.$currentSiteBtn = $('#currentSiteBtn'); _bindEvent(); }
    function _bindEvent()
    { _nodes.$currentSiteBtn.hover(_showSiteList, _hideSiteList); _nodes.$siteList.hover(_showSiteList, _hideSiteList); _nodes.$siteList.on('click', 'a', function ()
        { var siteName = $(this).text(), siteType = $(this).attr('type'); _nodes.$siteList.hide(); _nodes.$currentSiteBtn.html(siteName).attr('type', siteType); }); var defaultInputValue = _nodes.$searchInput.attr("def"); _nodes.$searchInput.focus(function ()
        { if ($(this).val() === defaultInputValue)
            { $(this).val(''); } }).blur(function ()
        { if ($(this).val() === '')
            { $(this).val(defaultInputValue); $(this).css('color', '#999'); } else if ($(this).val() !== defaultInputValue)
            { $(this).css('color', '#333'); } }).keyup(function (event)
        { if (event.keyCode === 13)
            { _submitSearch(); return false; } }); _nodes.$searchBySiteBtn.on('click', function ()
        { _submitSearch(); return false; }); var $headQrCode = $('#headQrCode'); $headQrCode.find('.close').on('click', function ()
        { $headQrCode.hide(); return false; }); }
    function _submitSearch()
    {
        var searchType = _nodes.$currentSiteBtn.attr('type'), searchValue = $.trim(_nodes.$searchInput.val()), searchResultUrl = _params.searchResultUrl; if (searchValue.length === 0)
        { _dialog.alert("请输入搜索内容"); return; }
        if (!searchResultUrl)
        { return; }
        searchResultUrl = searchResultUrl.replace('p1', searchType).replace('p2', encodeURIComponent(searchValue)); window.location.href = searchResultUrl;
    }
    function _showSiteList()
    { _nodes.$siteList.show(); }
    function _hideSiteList()
    { _nodes.$siteList.hide(); }
    _util.initNameSpace("CS.page"); CS.page.subNav = { 'init': init };
})(jQuery);