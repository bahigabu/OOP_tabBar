class Tab {
  constructor(id) {
    // 獲取主要元素
    this.main = document.querySelector(id);
    // 獲取加號按鈕
    this.add = this.main.querySelector('.tab-add');
    // li的父元素
    this.ul = this.main.querySelector('.first-nav ul:first-child');
    // section的父元素
    this.section_father = this.main.querySelector('.tabs-con');
    // 調用方法
    this.init();
  }
  // 初始化操作讓相關元素綁定事件
  init() {
    this.updateNode();
    this.add.onclick = this.addTab.bind(this.add, this); // 不能立即觸發，要點擊觸發，所以不加()
    for (var i = 0; i < this.lis.length; i++) {
      // lis是偽數組
      // lis[i]是其中一個dom對象
      // this.lis[i].index就是在對象裡面加1個屬性
      this.lis[i].index = i;
      // 所有小li綁點擊事件 // 不能立即觸發，要點擊觸發，所以不加()
      this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this); 
      this.remove[i].onclick = this.removeTab.bind(this.remove[i], this); 
      this.spans[i].ondblclick = this.editTab; 
      this.sections[i].ondblclick = this.editTab; 
    }
  }
  // 獲取所有小li和section
  updateNode() {
    this.lis = this.main.querySelectorAll('li');   
    this.remove = this.main.querySelectorAll('.icofont-close-squared-alt');
    this.spans = this.main.querySelectorAll('.first-nav li span:first-child');
    this.sections = this.main.querySelectorAll('section');
  }
  // 清除類名
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
  // 切換功能
  toggleTab(that) {
    that.clearClass();
    this.className = 'li-active'; // this指向每一個小li
    that.sections[this.index].className = 'con-active';
  }
  // 添加功能
  addTab(that) {
    that.clearClass();
    // 創建li元素和section元素
    var li =
      '<li class="li-active"> <span>新選項卡</span><span class="icofont-close-squared-alt"></span> </li>';
    var section = '<section class="con-active">新內容</section>';
    // 把元素追加到對應的父元素裡面
    that.ul.insertAdjacentHTML('beforeend', li);
    that.section_father.insertAdjacentHTML('beforeend', section);
    that.init();
  }
  // 刪除功能
  removeTab(that, e) {
    e.stopPropagation();
    var index = this.parentNode.index;
    // 根據索引號刪除對應的li和section
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    // 當我們刪除的不是選中狀態的li，原來選中狀態不變
    if (document.querySelector('.li-active')) {
      return;
    }
    // 刪除選中狀態的li，讓前一個li變成選中狀態
    index--;
    // 自動瞬間點擊
    that.lis[index] && that.lis[index].click(); //邏輯運算符中的短路運算
  }
  // 修改功能
  editTab() {
    var str = this.innerHTML; // span的內容
    // 雙擊禁止選中文字
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    this.innerHTML = '<input type="text"/>';
    var input = this.children[0]; // 獲取<input type="text"/>
    input.value = str;
    input.select(); // 文本框文字處於選中狀態
    // 離開文本框就把文本值給span
    input.onblur = function () {
      if (this.value == '') {
        this.parentNode.innerHTML = str;
      } else {
        this.parentNode.innerHTML = this.value;
      }
    };
    input.onkeyup = function (e) {
      if (e.key === 'Enter') {
        this.blur();
      }
    };
  }
}
new Tab('#tab');