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
    data.payload.text = estringa;
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
    
    //archive
    if (t.indexOf('/archive') != -1){
      var tt = e.message.reply_to_message.text;
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      var url = tt.match(reg)[0];
      var arc = 'http://web.archive.org/save/' + url;
      var ret = UrlFetchApp.fetch(arc)
      var mensaje = {
        "method": "sendMessage",
        "chat_id": e.message.chat.id.toString(),
        "text": arc + " archived"//+ e.message.reply_to_message.entities.from.last_name
      }
      return mensaje;
    }
    
    
    if (t.indexOf("/")>=0){
      var 攻 = "";
      if(e.message.from.first_name) 攻 = 攻 + e.message.from.first_name;
      //if(e.message.from.last_name) 攻 = 攻 + e.message.from.last_name;
      if (攻 == "Loc") 攻 = "狼狼";
      
      var 受 = "";
      if(e.message.reply_to_message.from.first_name) 受 = 受 + e.message.reply_to_message.from.first_name;
      //if(e.message.reply_to_message.from.last_name) 受 = 受 + e.message.reply_to_message.from.last_name;
      if (受 == "Loc") 受 = "狼狼";
      if (受 == "猫") 受 = "猫猫的客户";
      if (受.indexOf("す苏") >= 0) 受 = "りこ 的客户";  
      if (受.indexOf("花明") >= 0) 受 = "花明的猫猫";
      var action = "攻 透了 受！";
      if (t.indexOf("fuck") >= 0) action = "攻 草了 受！";
      if (t.indexOf("sb") >= 0) action = "穷傻瓜 受 在路上被 200 条 攻 同是插爆b！";//"流的满路黑紫色的血"
      if (t.indexOf("handjob") >= 0) action = "攻 用手指玩弄 受 的下体，渐渐开始感到湿润。"
      if (t.indexOf("kiss") >= 0) action = "攻 插了进去之后，抱住 受 的身体，再次吻上她的唇"
      if (t.indexOf("nakada") >= 0) action = "攻 已经全数射在 受 的体内了！"
      if (t.indexOf("back") >= 0) action = "受 自行拿卫生纸擦拭自己的生殖器，然后才穿上内裤，又坐回 攻 身旁。"
      if (t.indexOf("feet") >= 0) action = "攻 伸出穿着白色膝上袜的双脚夹住他的生殖器开始上下套弄，受 频频呻吟出来。"
      if (t.indexOf("stocking") >= 0) action = "受 的丝袜直接包覆生殖器丝袜包覆的那种摩擦感真的很棒，在一阵套弄后 攻 微微有了想射精的感觉。"
      
      var fucomposition = action.replace("受", 受).replace("攻", 攻);
      var mensaje = {
        "method": "sendMessage",
        "chat_id": e.message.chat.id.toString(),
        "text": fucomposition //+ e.message.reply_to_message.entities.from.last_name
      }
      return mensaje;
    }
    if (t.indexOf("花明") != -1) {
      var mensaje = {
        "method": "sendSticker",
        "chat_id": e.message.chat.id.toString(),
        "sticker": 'CAADBQADCgIAAgsiPA6YQhC2cRBPowI'
      }
      return mensaje;
    }
    var wordlist = ["我", "男人", "mtf", "药娘", "虎", "老鼠", "水鼠", "佬鼠", "lzmr", "42", "猫人", "貓人", "月巫",  "moonwizard707",    "透椒", "花椒", "莲子",      "蓮子",   "yuki", "deleted絢香", "deletedりこ", "冮方法", "黄小姐", "ske", "猫猫", "薮猫", "kfh", "狐狸鱼", "狐狸魚", "青竹", "狼狼", "秋", "璃子", "离子", "量子", "友利", "包子", "你妈", "qwq"];
    var namelist = ["你", "男人", "药娘", "MtF", "虎虎虎", "大老鼠", "大水鼠", "德国大佬鼠", "猫人", "猫人", "貓人", "猫人", " @MoonWizard707 ", "月巫", "椒", "花椒", "莲子","蓮子", "يوكي יוקי", "deleted絢香", "deletedりこ", "冮方法 🇭🇰", "冮方法", "ske", "猫猫", "kfh", "薮猫", "狐狸鱼", "狐狸魚", "青竹🎋", "狼狼🐺", "秋", "璃子", "离子", "量子", "友利", "包子", "你妈", "qwq"];

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
      if (t.indexOf("りこ") >= 0) {
      攻 = "りこ";
      }else delete(names[rdm]);
      var ret = 攻 + "透";
      for (elei in names) {
        ret = ret + names[elei];
      }
    } else {
      var ret = "透";
      if (t.indexOf("りこ") >= 0) {
      ret = "りこ" + ret;
      }
      if (names.length == 1) ret = ret + names[0];
    }

    if (ret == "透") ret = ret + "透";
    if (ret == "りこ透") ret = ret + "透";
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
