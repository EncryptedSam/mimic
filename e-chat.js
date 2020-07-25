(function () {
    let styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .message__top {
            height: auto !important;
        }
    `;
    document.head.appendChild(styleSheet);



    const targetNode = document;
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    const callback = (function () {

        let Button = function (name, fontSize, className, diable) {
            this.button = document.createElement("Button");
            this.button.style.margin = "0px 5px";
            this.button.innerText = name;
            this.button.className = className || "";
            this.button.style.fontSize = fontSize || "7px";
            this.button.disabled = false || diable;

            this.addEvent = function (eventType, event) {
                if (eventType && event) {
                    this.button.addEventListener(eventType, event)
                }
            }

            this.fontSize = function (sz) {
                this.button.style.fontSize = sz || "7px";
            }

            this.className = function (clNm) {
                this.button.className = clNm || "";
            }

            this.disable = function (bol) {
                this.button.disabled = bol;
            }
        }


        let onLastMsgLoad = (function () {
            let mimicList = [];
            window.mimicList = mimicList;

            return function (lastMsg) {
                let block = new Button("Mimic");

                block.addEvent('click', function () {
                    let message = this.parentElement;

                    while (message.className != 'message ') {
                        message = message.parentElement;
                    }

                    let uid = message.querySelector('.message__username').innerHTML;

                    if (!mimicList.includes(uid)) {
                        mimicList.push(uid);
                    } else {
                        
                        let index = mimicList.indexOf(uid);
                        if (index > -1) {
                            mimicList.splice(index, 1);
                        }
                    }

                });

                lastMsg.querySelector('.message__top').appendChild(block.button);

                if (mimicList.includes(lastMsg.querySelector('.message__username').innerHTML)) {
                    let msg = lastMsg.querySelector('.message__text').innerHTML;

                    let inputField = document.querySelector('#InputTextArea');
                    let sendBtn = document.querySelector('#SendButton');

                    inputField.value = msg;
                    sendBtn.click();

                    // console.log(lastMsg.querySelector('.message__username').innerHTML)
                }
            }
        })()


        let plm, clm = null;
        return function (mutationsList, observer) {

            for (let iii = 0; iii < mutationsList.length; iii++) {
                let mutation = mutationsList[iii];

                if (mutation.target.querySelectorAll('.message')) {
                    let lastMsg = mutation.target.querySelectorAll('.message');
                    lastMsg = lastMsg[lastMsg.length - 1];
                    if (lastMsg) {
                        clm = lastMsg
                        if (clm != plm) {
                            onLastMsgLoad(lastMsg);
                            plm = clm;
                        }
                    }
                }

            }

        };
    })();

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
})();
