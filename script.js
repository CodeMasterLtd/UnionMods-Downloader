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

