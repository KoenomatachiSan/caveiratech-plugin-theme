const TITLE_APPLY = "Caveiratech Theme Extension";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

const CSS = `

#header .user { background:#c0c0c0; color: #005221; }

a:link, a:visited{color:black}


#header { background:#c0c0c0;}


#main_b .wrapper { background:#c0c0c0;}

.navigate_section {
	display: none;
}


#element {
	line-height: 0;
	display: none;
}

body {
  background: #c0c0c0;
 }

 #info_bar{
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
