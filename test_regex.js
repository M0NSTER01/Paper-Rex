const str = '<a class="test" href="#education">Education</a>';
const r = new RegExp("(<a[^>]*href=\"#education\"[^>]*>[\\\\s\\\\S]*?<\\\\/a>)", 'g');
console.log(str.replace(r, 'MATCH $1 MATCH'));
