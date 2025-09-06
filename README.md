```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Frontend Mini Projects Collection — README</title>
  <style>
    :root{
      --bg:#0f1724; --card:#0b1220; --muted:#9aa4b2; --accent:#60a5fa; --glass:rgba(255,255,255,0.03);
      --radius:14px; font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;
    }
    html,body{height:100%; margin:0; background:linear-gradient(180deg,#071124 0%, #07101a 100%); color:#e6eef6;}
    .wrap{max-width:980px;margin:40px auto;padding:28px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:18px;box-shadow: 0 8px 30px rgba(2,6,23,0.7);}
    header{display:flex;align-items:center;gap:16px;margin-bottom:18px}
    .logo{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#7dd3fc);display:grid;place-items:center;color:#052036;font-weight:700;font-size:20px;}
    h1{margin:0;font-size:20px}
    p.lead{margin:6px 0 18px;color:var(--muted);font-size:14px}
    .grid{display:grid;grid-template-columns:1fr 320px;gap:20px}
    .card{background:var(--card);padding:16px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.6)}
    h2{margin:0 0 10px;font-size:16px}
    ul.projects{list-style:none;padding:0;margin:0;display:grid;gap:8px}
    ul.projects li{padding:10px;border-radius:10px;background:var(--glass);display:flex;justify-content:space-between;align-items:center;font-size:14px}
    .muted{color:var(--muted);font-size:13px}
    pre{background:#021025;padding:12px;border-radius:8px;overflow:auto;color:#cfeffd;font-size:13px}
    footer{margin-top:18px;color:var(--muted);font-size:13px}
    a.chip{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(96,165,250,0.12);color:var(--accent);text-decoration:none;font-weight:600}
    .license{background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));padding:12px;border-radius:10px;margin-top:12px;color:var(--muted);font-size:13px}
    @media (max-width:860px){.grid{grid-template-columns:1fr;}.logo{width:48px;height:48px}}
  </style>
</head>
<body>
  <main class="wrap" role="main">
    <header>
      <div class="logo">FM</div>
      <div>
        <h1>Frontend Mini Projects Collection</h1>
        <p class="lead">8 small HTML/CSS/JavaScript projects (i1 → i8). Each folder is a standalone frontend demo — open <code>index.html</code> in a browser to run.</p>
      </div>
    </header>

    <div class="grid">
      <section class="card" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects (overview)</h2>
        <ul class="projects" aria-label="project list">
          <li><strong>i1</strong><span class="muted">Starter project (includes README)</span></li>
          <li><strong>i2</strong><span class="muted">Simple web template — HTML/CSS/JS</span></li>
          <li><strong>i3</strong><span class="muted">Simple web template — HTML/CSS/JS</span></li>
          <li><strong>i4</strong><span class="muted">Single-page responsive template</span></li>
          <li><strong>i5</strong><span class="muted">Interactive website demo</span></li>
          <li><strong>i6</strong><span class="muted">UI-rich site — images and SVGs (restaurant/portfolio style)</span></li>
          <li><strong>i7</strong><span class="muted">Event management frontend — multi-page (dashboard, calendar, tickets, profile, create-event)</span></li>
          <li><strong>i8</strong><span class="muted">Minimal single-page app template</span></li>
        </ul>

        <h2 style="margin-top:14px">Quick start</h2>
        <ol style="padding-left:18px;color:var(--muted);font-size:14px">
          <li>Clone the repo: <code>git clone https://github.com/your-username/frontend-mini-projects.git</code></li>
          <li>Open any folder <code>i1</code> … <code>i8</code></li>
          <li>Open <code>index.html</code> (or relevant page) in your browser</li>
        </ol>

        <h2 style="margin-top:14px">Tech</h2>
        <p class="muted">HTML5 · CSS3 · Vanilla JavaScript</p>

        <h2 style="margin-top:14px">Structure</h2>
        <p class="muted">Each project folder contains a basic structure: <code>index.html</code>, <code>styles.css</code>, <code>script.js</code>, and optional assets (images, icons, extra pages).</p>
      </section>

      <aside class="card" aria-labelledby="usage-heading">
        <h2 id="usage-heading">Usage & tips</h2>
        <p class="muted">To preview locally, you can simply open files in your browser. For a better dev experience use a static server:</p>
        <pre>npx http-server ./i7 -o</pre>
        <p class="muted" style="margin-top:8px">If a project uses multiple pages (like <code>i7</code>), open the folder root or its main HTML (e.g., <code>dashboard.html</code>).</p>

        <h2 style="margin-top:12px">Contribute</h2>
        <p class="muted">Add features, fix bugs, or create a demo video per project. Make PRs to the main branch with clear commit messages.</p>

        <div class="license" role="note">
          <strong>License</strong>
          <p style="margin:8px 0 0">This collection is open-source under the MIT License. Copy, modify, and use freely.</p>
        </div>

        <p style="margin-top:12px"><a class="chip" href="#">Open in GitHub</a></p>
      </aside>
    </div>

    <section style="margin-top:18px" class="card">
      <h2>Repository README (plain text)</h2>
      <pre>
Frontend Mini Projects Collection

This repository contains 8 frontend projects built with HTML, CSS and JavaScript.
Folders: i1, i2, i3, i4, i5, i6, i7, i8

Getting started:
1. git clone https://github.com/your-username/frontend-mini-projects.git
2. cd frontend-mini-projects
3. open any folder (i1..i8) and run index.html in a browser

Tech:
- HTML5
- CSS3
- Vanilla JavaScript

License: MIT
      </pre>
    </section>

    <footer>
      <div class="muted">Created for quick demos and frontend practice — open any folder to explore each project's source files.</div>
    </footer>
  </main>
</body>
</html>
```
