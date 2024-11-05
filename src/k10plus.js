// API = https://wiki.k10plus.de/display/K10PLUS/SRU
// Using ISBN
// https://services.dnb.de/sru/dnb?version=1.1&operation=searchRetrieve&query=NUM%3D978-3-8353-0636-3&recordSchema=MARC21-xml
// https://sru.kobv.de/k2?version=1.1&operation=searchRetrieve&query=dc.identifier%3D978-3-8353-0636-3&startRecord=1&maximumRecords=10&recordSchema=marcxml&recordPacking=xml

// titleInfo

var items = Zotero.getActiveZoteroPane().getSelectedItems();
var parser = new DOMParser();
var apiCall = "https://sru.kobv.de/k2?version=1.1&operation=searchRetrieve&query=dc.identifier%3D";
var suffix = "&startRecord=1&maximumRecords=10&recordSchema=marcxml&recordPacking=xml&stylesheet=";

for (let item of items) {
    var txt = "";
    var query = item.getField('ISBN');
    let data = await Zotero.HTTP.request("GET", apiCall + query + suffix);
    let xmlDoc = data.responseXML;
    let test = xmlDoc.evaluate("//zs:records/zs:record/zs:recordData",xmlDoc,namespace,XPathResult.ANY_TYPE,null);
    
    let node = null;
    const RVK = [];
    while ((node = result.iterateNext())) {
        var result = test.iterateNext();
        var xmlDoc2 = parser.parseFromString(result["innerHTML"],"text/html");
        var test2 = xmlDoc2.evaluate("//datafield[@tag='084' and subfield[@code='2'] = 'rvk']/subfield[@code='a']",xmlDoc2,namespace2,XPathResult.ANY_TYPE,null);
        var result2 = test2.iterateNext();
        
        RVK.push(result2["innerHTML"]);
    } 
    
    //return data['response'];
    //return xmlDoc;
    //return test;
    //return result["innerHTML"];
    //return result2["innerHTML"];
    return RVK;
}

function namespace() {
  return "http://www.loc.gov/zing/srw/";
}
function namespace2() {
    return "http://www.loc.gov/MARC21/slim"
}