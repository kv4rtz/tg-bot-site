// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Context, Telegraf } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

interface Post {
    _id: number,
    title: string,
    description: string,
    author: string
}

const BOT_TOKEN = '5924103954:AAHWfwZH1CzEP5mEqErUspddjg--UWA7fok'

const bot = new Telegraf(BOT_TOKEN)

const posts: Post[] = []

bot.command('getposts', (ctx: Context) => {
    for (let i = 0; i < posts.length; i++) {
        ctx.reply(`<i>№${i + 1}</i>\n\n— <b>${posts[i].title}</b>\n${posts[i].description}\n\n<code>Автор: ${posts[i].author}</code>`, {parse_mode: 'HTML'})
    }
})

bot.on('message', async (ctx: Context) => {
    try {
        const message = ((ctx.message) as Message.TextMessage).text
        const argsForNewPost: string[] = message.split("\n")
        
        if (argsForNewPost.length === 2) {
            const _id: number = Date.now()
            const title: string = argsForNewPost[0]
            const description: string = argsForNewPost[1]
            const author: string = ctx.from?.first_name as string
    
            addNewPostInAPI({_id, title, description, author})
            ctx.reply(`✅ Пост успешно создан\nID: ${_id}`)
        } else {
            ctx.reply(`❌ Не удалось создать пост`)
        }
    } catch(e) {
        ctx.reply("❌ Ошибка")
    }
})

bot.launch()

const addNewPostInAPI = (newPost: Post) => {
    posts.push(newPost)
}

export default function handler(
    req:NextApiRequest, res:NextApiResponse<Post[]>
) {
  res.status(200).json(posts)
}
