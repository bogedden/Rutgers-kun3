function sendWelcomeMessage( guild, user, welcomeChannel, text ) {
    let channel = welcomeChannel
    // turn id into channel
    channel = guild.channels.find( channel => channel.id == welcomeChannel )
    // if channel cannot be found turn to systemchannel
    channel = channel ? channel : guild.systemChannel
    // output welcome message text to a channel
    const welcomeText = text ? text
                                .replace('[guild]', guild.name)
                                .replace('[user]', `<@${user.id}>`) : `Welcome to ${guild.name}, <@${user.id}>!`
    channel.send( welcomeText )
}

exports.sendWelcomeMessage = sendWelcomeMessage