function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, classActive) {
  //Tabs
  const content = document.querySelectorAll(tabsContentSelector),
  tabs = document.querySelectorAll(tabsSelector),
  tabsParent = document.querySelector(tabsParentSelector);

  function hideContent() {
    content.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove(classActive);
    });
  }

  function addContent(i = 0) {
    content[i].classList.remove("hide");
    content[i].classList.add("show", "fade");
    tabs[i].classList.add(classActive);
  }

  hideContent();
  addContent();

  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (item == e.target) {
          hideContent(i);
          addContent(i);
        }
      });
    }
  });
}

export default tabs;

