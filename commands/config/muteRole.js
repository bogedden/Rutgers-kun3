const Commando = require('discord.js-commando')
const fs = require('fs')
const defaults = JSON.parse(fs.readFileSync('settings/default_settings.json', 'utf-8'))
const { oneLine } = require('common-tags')

module.exports = class SetMuteRoleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setmuterole',
            group: 'config',
            memberName: 'muterole',
            description: 'Configure the muted role for this server.',
            userPermissions: [ defaults.admin_permission ],
            guildOnly: true,
            args: [
                {
                    key: 'muteRole',
                    label: 'mute role',
                    prompt: oneLine`Enter the role you want to designate as the muted role. Enter \`clear\` to remove the setting.`,
                    type: 'role|string',
                }
            ],
            argsPromptLimit: 1,
        })
    }

    async run( msg, { muteRole } ) {
        const settings = this.client.provider

        if( typeof muteRole === 'object' )
            settings.set( msg.guild, `muteRole`, muteRole.id )
            .then( msg.channel.send( `Mute role successfully set as @${muteRole.name}.` ) )
        else if( muteRole == 'clear' ) {
            // don't remove the mute role if there are unpingable roles
            if( settings.get( msg.guild, 'unpingableRoles' ) )
                return msg.channel.send( 'You cannot clear the mute role without clearing unpingable roles first. Run `!setunpingableroles clear` first.' )
            settings.remove( msg.guild, `muteRole` )
            .then( msg.channel.send( `Mute role successfully removed.` ) )
        }
        else
            msg.channel.send(`Invalid input. Try again.`)
    }
}