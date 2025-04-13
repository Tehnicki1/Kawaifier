/**
 * @name Kawaifier
 * @version 1.0.1
 * @author Ykela
 * @description Makes your messages super kawai and cute.
 */

let messageCounter = 0;

const swearWordsList = [
    "anal", "anus", "arse", "ass", "ballsack", "balls", "bastard", "bitch", "biatch", "bloody", "blowjob",
    "blow job", "bollock", "bollok", "boner", "boob", "bugger", "bum", "butt", "buttplug", "clitoris",
    "cock", "coon", "crap", "cunt", "damn", "dick", "dildo", "dyke", "fag", "feck", "fellate", "fellatio",
    "felching", "fuck", "f u c k", "fudgepacker", "fudge packer", "flange", "Goddamn", "God damn", "hell",
    "homo", "jerk", "jizz", "knobend", "knob end", "labia", "lmao", "lmfao", "muff", "nigger", "nigga",
    "omg", "penis", "piss", "poop", "prick", "pube", "pussy", "queer", "scrotum", "sex", "shit", "s hit",
    "sh1t", "slut", "smegma", "spunk", "tit", "tosser", "turd", "twat", "vagina", "wank", "whore", "wtf"
];

// Special word transformations
const cuteReplacements = {
    "hi": "hai",
    "hello": "hewwo",
    "hey": "haii",
    "sorry": "sowwy",
    "bye": "bai",
    "goodbye": "bai bai",
    "what": "wat",
    "why": "wy",
    "no": "nu",
    "yes": "yis",
    "ok": "oki"
};

module.exports = class MegaShy {
    start() {
        const sendModule = BdApi.findModuleByProps("sendMessage", "receiveMessage");
        this.originalSendMessage = sendModule.sendMessage;

        const self = this;

        sendModule.sendMessage = function(channelId, message, ...args) {
            if (message && message.content) {
                message.content = self.shyfy(message.content);
            }
            return self.originalSendMessage.call(this, channelId, message, ...args);
        };

        BdApi.showToast("Kawaifier Loaded uwu ✨", { type: "success" });
    }

    stop() {
        const sendModule = BdApi.findModuleByProps("sendMessage", "receiveMessage");
        if (sendModule && this.originalSendMessage) {
            sendModule.sendMessage = this.originalSendMessage;
        }

        BdApi.showToast("Kawaifier stopped 😔", { type: "error" });
    }

    shyfy(text) {
        const words = text.trim().split(/\s+/);
        const shyWords = [];
        const emotes = [">.<", ">_<", "x_x", ":3", "UwU", ">///>", "u///u", "rawr~", "< 3", "._.", "(ꈍᴗꈍ)", ">⩊<", "˙ᵕ˙"];
        const endings = [
            "i-i'm s-sorry if that was weird..",
            "i-it's n-not much b-but i hope it helps..",
            "t-thanks f-for reading.. >///<",
            ">///< i'll go now..",
            "i-i tried my best.. d-don't judge.."
        ];

        messageCounter++;

        let insertEmote = Math.random() < 0.4;
        let insertEnding = (messageCounter % 10 === 0 && words.length > 5);

        let shyifiedCount = 0;

        for (let i = 0; i < words.length; i++) {
            let originalWord = words[i];
            let cleanWord = originalWord.replace(/[^a-zA-Z]/g, '').toLowerCase();

            // Check for special cute replacements first
            if (cuteReplacements[cleanWord]) {
                shyWords.push(cuteReplacements[cleanWord]);
                continue;
            }

            if (swearWordsList.includes(cleanWord)) {
                shyWords.push(`***${originalWord}***`);
                continue;
            }

            if (words.length >= 4 && (shyifiedCount % 3 === 0) && cleanWord.length >= 5) {
                shyWords.push(this.makeMegaShy(originalWord));
                shyifiedCount++;
            } else {
                shyWords.push(originalWord);
                if (cleanWord.length >= 5) shyifiedCount++;
            }
        }

        let finalText = shyWords.join(" ");

        if (insertEmote) {
            const emote = emotes[Math.floor(Math.random() * emotes.length)];
            finalText += ` **${emote}**`;
        }

        if (insertEnding) {
            const ending = endings[Math.floor(Math.random() * endings.length)];
            finalText += ` *${ending}*`;
        }

        return finalText;
    }

    makeMegaShy(word) {
        const firstChar = word[0];
        return `*${firstChar}-${firstChar}. ${word}..*`;
    }
};
