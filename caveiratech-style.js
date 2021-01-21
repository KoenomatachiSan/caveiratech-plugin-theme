const TITLE_APPLY = "Caveiratech Theme Extension";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

const CSS = `

#header .user { background:#0D1117; color: white; border: 2px solid grey; border-radius: 15px;}
#header .user img.avatar {
	border-radius: 15px;
}

.wrapper {
	display: flex;
  align-items: center;
  justify-content: center;
}

a:link, a:visited{color:#838B95}


#header { background:#06090F;}


#main_b .wrapper { background:#06090F; margin-top:50px}

.navigate_section {
	display: none;
}


#element {
	line-height: 0;
	display: none;
}

body {
  background: #06090F;
 }

 #info_bar{
	display: none;
}

.topic_table td {
	background: black;
}

#logo{
  display: none;
}

/* Ocultando menu lateral */

#sp_right{
  display: none; 
}

#sp_collapse_side4{
  display: none; 
}

.buttonlist ul li a {
	display: none;
}

#topic_icons{
  background:#06090F
}

#footer{
  display: none;
}

#bar{
  display: none;
}

`;


function toggleCSS(tab) {

  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      browser.pageAction.setIcon({ tabId: tab.id, path: "icons/active.png" });
      browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_REMOVE });

      
      browser.tabs.insertCSS({ code: CSS });
    } else {
      browser.pageAction.setIcon({ tabId: tab.id, path: "icons/desactive.png" });
      browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });
      browser.tabs.removeCSS({ code: CSS });
    }
  }

  var gettingTitle = browser.pageAction.getTitle({ tabId: tab.id });
  gettingTitle.then(gotTitle);
}

function protocolIsApplicable(url) {
  var anchor = document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({ tabId: tab.id, path: "icons/desactive.png" });
    browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });
    browser.pageAction.show(tab.id);
  }
}

var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});


browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(toggleCSS);
