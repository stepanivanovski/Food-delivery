function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, classActive) {
  const content = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector),
    tabs = tabsParent.querySelectorAll(tabsSelector);
  
  hideContent();
  addContent();
  
  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if (tab == e.target) {
          hideContent(i);
          addContent(i);
        }
      });
    }
  });

  function hideContent() {
    content.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((tab) => {
      tab.classList.remove(classActive);
    });
  }
  
  function addContent(i = 0) {
    content[i].classList.remove("hide");
    content[i].classList.add("show", "fade");
    tabs[i].classList.add(classActive);
  }
}

export default tabs;

