let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Masukan Username yang akan distalk', m)

  await m.reply('Searching...')
    axios.get('https://ariarestapii.herokuapp.com/api/ig/stalk?username=${text}&apikey=aria')
    .then((res) => {
      imageToBase64(res.data.profile)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')
            let hasil = `*IG STALKER*\n\nFullName : ${res.data.fullname}\nFollowers : ${res.data.follower}\nFollowing : ${res.data.following}\nBio : ${res.data.bio}`

    conn.reply(m.chat, buf, 'foto.jpg', hasil, m)
         })
	})
}
handler.help = ['igstalk','stalkig'].map(v => v + ' <@user>')
handler.tags = ['internet']
handler.command = /^(igstalk|stalkig)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
