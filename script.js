function e(selector) {
    return document.getElementById(selector);
}

function downloadFile() {
    var url = e("urlInput").value;
    var loadingIndicator = e("loading");
    var token = url.includes("token");
    var umURL = url.includes("unionmods.com");

    if (!umURL) {
        showNPCAlert("Please enter a valid UnionMods URL.", 4000, "error");
        loadingIndicator.style.display = 'none'; 
        return;
    }

    if (!token) {
        showNPCAlert("Token is missing", 4000, "error");
        loadingIndicator.style.display = 'none'; 
        return;
    } 

    loadingIndicator.style.display = 'block';

    var modifiedUrl = url.replace("unionmods.com", "old.unionmods.com");
    
    var link = document.createElement('a');
    link.href = modifiedUrl;
    link.download = "file"; 

    showNPCAlert("Your file is ready for download. Please ensure you're logged into UnionMods, then click the download button again to proceed.", 4000, "success");

    setTimeout(function() {
        link.click();
        loadingIndicator.style.display = 'none';
    }, 1000);
}

function showNPCAlert(message = "", time = 5000, type = "info") {
    const emojis = {
        info: "ℹ️",
        success: "✅",
        error: "❌"
    };
  e("npc-alert").innerHTML = `${emojis[type] || emojis.info} ${message}`;
  e("npc-alert").classList.add("show");

    const sounds = {
        info: "audio/UI/info.mp3",
        success: "audio/UI/success.mp3",
        error: "audio/UI/error.mp3"
    };
    const audio = new Audio(sounds[type] || sounds.info);
    audio.volume = 0.2;
    audio.play().catch(() => {});

    const colours = {
        info: "#2196F3",
        success: "#4CAF50",
        error: "#F44336"
    };
    e("npc-alert").style.color = colours[type] || colours.info;

  setTimeout(() => {
    e("npc-alert").classList.remove("show");
  }, time);
}

function openGuide() {
    e("guideModal").style.display = "block";
}

function closeGuide() {
    e("guideModal").style.display = "none";
}

window.onclick = function(event) {
    let modal = e("guideModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function goBackHome(){
    location.href = "index.html";
}

function goToVersion() {
    location.href = "version.html";
}

function formatCustomTime(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; 

    return `${day} ${month} ${year} | ${hours}:${minutes}${ampm}`;
}

  const lastUpdateEl = document.getElementById("lastUpdate");
  const now = new Date();
  const storedData = JSON.parse(localStorage.getItem("lastUpdateData"));

  if (storedData) {
    const storedTime = new Date(storedData.time);
    const diffHours = (now - storedTime) / (1000 * 60 * 60);

    if (diffHours < 4) {

        lastUpdateEl.textContent = formatCustomTime(storedTime);
    } else {

        lastUpdateEl.textContent = " Just Now";
      localStorage.setItem("lastUpdateData", JSON.stringify({ time: now }));
    }
  } else {

    lastUpdateEl.textContent = " Just Now";
    localStorage.setItem("lastUpdateData", JSON.stringify({ time: now }));
  }
