import {ChatInputCommandInteraction} from 'discord.js';
import {injectable} from 'inversify';
import Command from '.';
import {SlashCommandBuilder} from '@discordjs/builders';

@injectable()
export default class implements Command {
  public readonly slashCommand = new SlashCommandBuilder()
    .setName('nick')
    .setDescription('change nickname of anyone on the server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('tag a user')
        .setRequired(true),
    )
    .addStringOption(name => 
        name.setName('nick')
        .setDescription('choose a new nickname')
        .setRequired(true)
     );

  public requiresVC = false;

  constructor() {
  }

  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {

    const user = interaction.options.getUser('user');
    const nick = interaction.options.getString('nick');

    if (user == null)
        throw new Error("no user selected")
        
    if (nick == null)
        throw new Error("no nickname selected")

    await interaction.guild?.members.edit(user!!, { nick: nick })
    await interaction.reply(`Set nickname of ${user} to ${nick}`);
  }
}
