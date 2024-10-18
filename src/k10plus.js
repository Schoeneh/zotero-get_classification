// API = https://wiki.k10plus.de/display/K10PLUS/SRU
// Using ISBN

// titleInfo

var items = Zotero.getActiveZoteroPane().getSelectedItems();
//const parser = new DOMParser();
var apiCall = "https://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb%3D";
var suffix = "&maximumRecords=1&recordSchema=mods";

for (let item of items) {
    var query = item.getField('ISBN');
    let data = await Zotero.HTTP.request("GET", apiCall + query + suffix);
    let xmlDoc = data.responseXML;
    let classif = xmlDoc.getElementsByTagName('classification')
    //var test = xmlDoc.getElementsByTagName('classification')[1]['attributes'][0]['value'];
    //var test = Zotero.Utilities.xpath(xmlDoc,'.', "http://www.loc.gov/mods/v3");
    //var s = new XMLSerializer().serializeToString(data);
    return classif.length;
}