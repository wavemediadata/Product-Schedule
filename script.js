document.addEventListener("DOMContentLoaded", getDetails);

function getDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const s = urlParams.get('s') || "TEMPLATE/V1004";

    console.log(s);
    
    if (s) {
      const [project, partNumber] = s.split('/'); // Split 's' into project and partNumber
      if (project && partNumber) {
        // Fetch data from the API
        gsid = "AKfycbzNEHAKdxeMokky3W_wQc3Vv06luCoM7tMOwnP8Ir-IPGjBhFWtSrf4ERCU4bwcUTYClA"
        fetch(`https://script.google.com/macros/s/${gsid}/exec?project=${project}&partNumber=${partNumber}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                document.getElementById("project").textContent = data.details.project || "N/A";
                document.getElementById("partNumber").textContent = data.details.partNumber || "N/A";
                document.getElementById("itemName").textContent = data.details.itemName || "N/A";
                document.getElementById("itemDescription").textContent = data.details.itemDescription || "N/A";
            } else {
                var elem = document.getElementById("project");
                elem.textContent = "Error: " + data.message;
                elem.style.color = "red";
            }
        })
        .catch(error => console.error("Error fetching API: ", error));
      } else {
        console.log("Invalid URL parameters");
      }
    }
  }
