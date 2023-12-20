import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

// Cấu hình các ngôn ngữ được sử dụng trong highlight
hljs.configure({
  languages: ['javascript', 'jsx', 'sh', 'bash', 'html', 'scss', 'css', 'json'],
});

// Gán đối tượng hljs vào biến window để sử dụng trong môi trường trình duyệt
if (typeof window !== 'undefined') {
  window.hljs = hljs;
}
