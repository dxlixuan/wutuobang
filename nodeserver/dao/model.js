//这里模拟从数据库获取数据
var EnglishObj = {
    first : {
        title : 'Perfect Logic',
        summary : 'All you want your website to do',
        content : 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt',
        picSrc : 'img/pic/pic1.jpg'
    },
    second : {
        title : 'Complete Solution',
        summary : 'A tool anything and everything you can think',
        content : 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciun tdolore magnam aliquam quaerat voluptatem.',
        picSrc : 'img/pic/pic2.jpg'
    },
    third : {
        title : 'Uber Culture',
        summary : 'Fresh. Modern and ready for future',
        content : 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        picSrc : 'img/pic/pic3.jpg'
    }
};

var ChineseObj = {
    first : {
        title : 'html',
        summary : 'HTML 是用来描述网页的一种语言',
        content : 'HTML 指的是超文本标记语言 (Hyper Text Markup Language)。HTML 不是一种编程语言，而是一种标记语言 (markup language)。标记语言是一套标记标签 (markup tag)。HTML 使用标记标签来描述网页HTML 文档描述网页HTML 文档包含 HTML 标签和纯文本HTML 文档也被称为网页',
        picSrc : 'img/pic/pic_html.jpg'
    },
    second : {
        title : 'css',
        summary : 'CSS 指层叠样式表 (Cascading Style Sheets)',
        content : '样式定义如何显示 HTML 元素。样式通常存储在样式表中。。把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题。外部样式表可以极大提高工作效率。外部样式表通常存储在 CSS 文件中。多个样式定义可层叠为一',
        picSrc : 'img/pic/pic_css.jpg'
    },
    third : {
        title : 'javascript',
        summary : 'JavaScript 是世界上最流行的编程语言',
        content : '这门语言可用于 HTML 和 web，更可广泛用于服务器、PC、笔记本电脑、平板电脑和智能手机等设备。JavaScript 是一种轻量级的编程语言。JavaScript 是可插入 HTML 页面的编程代码。JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。JavaScript 很容易学习',
        picSrc : 'img/pic/pic_javascript.jpg'
    }
};


function getChinese(){
    return ChineseObj;
}
exports.getChinese = getChinese;

function getEnglish(){
    return EnglishObj;
}
exports.getEnglish = getEnglish;