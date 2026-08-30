const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

const scriptTag = `
    <script>
      const contactForm = document.getElementById('portfolio-contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const btn = contactForm.querySelector('button[type="submit"]');
          const originalText = btn.innerText;
          btn.innerText = 'Sending...';
          btn.disabled = true;

          const toEmail = contactForm.getAttribute('data-to-email');
          const name = contactForm.querySelector('#name').value;
          const email = contactForm.querySelector('#email').value;
          const message = contactForm.querySelector('#message').value;

          try {
            const res = await fetch('https://4zxl3477-5000.inc1.devtunnels.ms/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, message, toEmail })
            });
            if (res.ok) {
              btn.innerText = 'Message sent!';
              btn.style.backgroundColor = '#16a34a'; // green
              contactForm.reset();
            } else {
              throw new Error('Failed');
            }
          } catch(err) {
            btn.innerText = 'Failed to send';
            btn.style.backgroundColor = '#dc2626'; // red
          }
          
          setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
          }, 3000);
        });
      }
    </script>
`;

content = content.replace(/<\/body>[\s\r\n]*<\/html>[\s\r\n]*`;/, `  ${scriptTag}\n  </body>\n  </html>\`;`);

fs.writeFileSync(file, content);
