// API = https://wiki.k10plus.de/display/K10PLUS/SRU
// Using ISBN   

var items = Zotero.getActiveZoteroPane().getSelectedItems();
const parser = new DOMParser();
var apiCall = "https://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb%3D";
var suffix = "&maximumRecords=1&recordSchema=mods";

for (let item of items) {
    var query = item.getField('ISBN');
    let data = await Zotero.HTTP.request("GET", apiCall + query + suffix);
    return data;
}