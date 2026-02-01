# Instagram Stats

Analyze your Instagram followers and following **locally** using your official data export.

Your ZIP file is processed entirely in your browser.

---

## How it works

1. Request your data from Instagram
2. Download the ZIP file
3. Upload it here
4. Get clean, downloadable results

---

<form id="uploadForm">
  <label for="zipFile"><strong>Instagram ZIP file</strong></label>
  <input type="file" id="zipFile" accept=".zip" required>
  <button type="submit">Process</button>
</form>

<div id="downloadButtons" style="display:none; margin-top:1rem;">
  <button id="downloadNotFollowingBack">Download: Not following you back</button>
  <p></p>
  <button id="downloadNotFollowingYou">Download: You don't follow back</button>
  <p></p>
  <button id="downloadMutualFollowers">Download: Mutual followers</button>
</div>

<div id="results"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="/assets/js/instagram-stats.js"></script>
