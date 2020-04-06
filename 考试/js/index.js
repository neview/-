let shopMode = (function () {
    // 获取需要操作的元素
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        box = document.querySelector('.box')
    data = null;
    // 获取json数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            };
        };
        xhr.send(null);
    };
    // 渲染数据
    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                hot,
                time,
                img
            } = item;
            str += `<div class="card">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">价格：${price}</p>
              <p class="card-text">销量：${hot}</p>
              <p class="card-text">时间：${time}</p>
            </div>
          </div>`;
            box.innerHTML = str;
        });
    };
    // 循环所有的LI，给每个按钮绑定点击事件

    let clear = function clear() {
        Array.from(navList).forEach(item => {
            if (item !== this) {
                item.flag = -1;
            };
        });
    };

    let handle = function handle() {
        Array.from(navList).forEach((item, inex) => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag;
                });
                render();
            };
        });
    };


    return {
        init() {
            queryData();
            render();
            handle();
        }
    };
})();
shopMode.init();