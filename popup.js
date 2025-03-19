document.addEventListener("DOMContentLoaded", () => {
    const fillFormBtn = document.getElementById("fillFormBtn");

    if (!fillFormBtn) {
        console.error("❌ Error: Button not found!");
        return;
    }

    fillFormBtn.addEventListener("click", async () => {
        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tab?.id) {
                chrome.tabs.sendMessage(tab.id, { action: "fillForm" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("❌ Error:", chrome.runtime.lastError.message);
                    } else {
                        console.log("✅ Message sent, response:", response);
                    }
                });
            } else {
                console.error("❌ Error: No active tab found!");
            }
        } catch (error) {
            console.error("❌ Unexpected error:", error);
        }
    });
});
