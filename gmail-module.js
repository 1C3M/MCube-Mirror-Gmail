var $ = undefined;
(function() {
    // Load the script
   let script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
Module.register("gmail-module", {

    name : "google_gmail-module",
    data : [{from:"Loading",snippet:"..."}],
    defaults: {
        text: "Gmail-Module",
        rest_url: "http://192.168.0.5:8080",
        token: "asdf",
        count: 5,
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        setTimeout(()=>{
            this.getGmailData(this);
            setTimeout(()=>{this.updateDom(1000);}, 5000);
        }, 1000);
        setInterval(()=>{this.getGmailData(this);}, 30000);
        setInterval(()=>{this.updateDom(1000);}, 30000);
    },

    getGmailData: function(self) {
        //while ($===undefined);

        let url = `${self.config.rest_url}/${self.config.token}/gmail/${self.config.count}`;

        $.ajax({
            type: "GET",
            url: url,
            data: {},
            success: data => {
                self.config.data = data;
            }
        });
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        let titleText = document.createElement("h5");
        titleText.innerHTML = "Mail";
        titleText.style.height = "25px";
        wrapper.appendChild(titleText);
        let emailFrom = [];
        let emailTitle = [];
        for(let i = 0; i < 5; i++){
            emailFrom[i] = document.createElement("div");
            emailTitle[i] = document.createElement("span");
            wrapper.appendChild(emailFrom[i]);
            wrapper.appendChild(emailTitle[i]);
            emailFrom[i].innerHTML =
                `${this.config.data[i].from} ${this.config.data[i].date}`;
            emailTitle[i].innerHTML =
                `${this.config.data[i].subject}`;
            emailFrom[i].style.fontSize= "15px";
            emailFrom[i].style.overflow = "hidden";
            emailFrom[i].style.textOverflow = "ellipsis";
            emailFrom[i].style.whiteSpace = "nowrap";
            emailFrom[i].style.display = "block";
            emailFrom[i].style.width = "300px";
            emailFrom[i].style.textAlign = "right";
            emailFrom[i].style.lineHeight = "1";
            emailFrom[i].style.color = "#FFFFFF";

            emailTitle[i].style.fontSize = "20px";
            emailTitle[i].style.overflow = "hidden";
            emailTitle[i].style.textOverflow = "ellipsis";
            emailTitle[i].style.whiteSpace = "nowrap";
            emailTitle[i].style.display = "block";
            emailTitle[i].style.width = "300px";
            emailTitle[i].style.textAlign = "right";
            emailTitle[i].style.marginRight = "0px";
            emailTitle[i].style.lineHeight = "1.2";
            emailTitle[i].style.marginBottom = "2px";
            emailTitle[i].style.fontWeight = "bold";
            emailTitle[i].style.color = "#FFFFFF";
        }
        wrapper.appendChild(document.createElement("br"));
        wrapper.appendChild(document.createElement("br"));
        return wrapper;
    },
});