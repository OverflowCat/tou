//env properties
var scriptProperties = PropertiesService.getScriptProperties();
var keys = scriptProperties.getKeys();
var botusername = "toutoutoubot"

function doPost(e) {
  console.log(e);
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  try {
    var rtn = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + keys.tgbot + "/", data));
  } catch (err) {
    data.payload.text = err.toString();
  }

  debug = false;
  if (debug) {
    data.payload.text += estringa.toString();
    data.payload.chat_id = "405582582";
    //data.reply_to_message_id = e.message
    var rtn = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + keys.tgbot + "/", data));
  }
}
// Deal with /commands
function slashcmd(cmd) {
  var t_ = e.message.text + " ";
  if (cmd.charAt(0) != "/") cmd = "/" + cmd;
  if (t_.substr(0, cmd.length + 1) == cmd + " ") {
    return (t_.substring(cmd.length + 1, t_.length - 1));
  }
  return false;
}

function identificar(e) {
  if (e.message.text) {
    var t = e.message.text.toLowerCase();
    if (t.indexOf("花明") != -1) {
      var mensaje = {
        "method": "sendSticker",
        "chat_id": e.message.chat.id.toString(),
        "sticker": 'CAADBQADCgIAAgsiPA6YQhC2cRBPowI'
      }
      return mensaje;
    }
    var wordlist = ["我", "男人", "mtf", "药娘", "虎", "老鼠", "水鼠", "佬鼠", "LZMR", "42LZMR", "猫人", "貓人", "月巫",  "moonwizard707",    "透椒", "花椒", "莲子",      "蓮子",   "yuki", "deleted絢香", "deletedりこ", "冮方法", "黄小姐", "ske", "猫猫", "薮猫", "狐狸鱼", "狐狸魚", "青竹", "狼狼", "秋", "璃子", "离子", "量子", "友利", "包子", "你妈", "qwq"];
    var namelist = ["你", "男人", "药娘", "MtF", "虎虎虎", "大老鼠", "大水鼠", "德国大佬鼠", "猫人", "猫人", "貓人", "猫人", " @MoonWizard707 ", "月巫", "椒", "花椒", "莲子","蓮子", "يوكي יוקי", "deleted絢香", "deletedりこ", "冮方法 🇭🇰", "冮方法", "ske", "猫猫", "薮猫", "狐狸鱼", "狐狸魚", "青竹🎋", "狼狼🐺", "秋", "璃子", "离子", "量子", "友利", "包子", "你妈", "qwq"];
    var ret = "透";

    if (t.indexOf("りこ") >= 0) ret = "りこ" + ret;
    var count = wordlist.length;
    var isName = false;
    var namesc = 0;
    var names = [];
    for (i = 0; i < count; i++) {
      if (t.indexOf(wordlist[i]) >= 0) {
        isName = true;
        namesc = namesc + 1;
        names.unshift(namelist[i])
        //ret = ret + namelist[i]; 
      }
    }
    if (!isName) {
      if (t.indexOf("透") == -1 && t.indexOf("@" + botusername) == -1) return false;
    }
    var lth = names.length;
    if (lth >= 2) {
      var rdm = Math.floor(Math.random() * lth);
      var 攻 = names[rdm];
      delete(names[rdm]);
      var ret = 攻 + "透";
      for (elei in names) {
        ret = ret + names[elei];
      }
    } else {
      var ret = "透";
      if (names.length == 1) ret = ret + names[0];
    }

    if (ret == "透") ret = ret + "透";
    if (ret == "透你") return false;
    ret = ret + "！"
    if (t.indexOf("osu") != -1) ret = "Welcome to " + ret;
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id.toString(),
      "text": ret,
    }
  } else if (e.message.sticker) {
    var mensaje = {
      "method": "sendSticker",
      "chat_id": e.message.chat.id,
      "sticker": e.message.sticker.file_id
    }
  } else if (e.message.photo) {
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": e.message.chat.id,
      "photo": text.file_id
    }
  } else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": "可以透透了！"
    }
  }
  return mensaje
}
