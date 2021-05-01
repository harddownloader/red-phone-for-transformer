// список чатов
import { Chating } from './Chating' // на постройку механики обмена сообщениями


export class ChatsList {
  constructor(props) {
    this.bp
    this.dialogs
  }

  init (bp, dialogs) {
    this.bp = bp
    this.dialogs = dialogs
    // show html
    this.create()
    // wait click event
    const needChatItemId = '.need-item'
    document.querySelector(needChatItemId).addEventListener('click', (event) => {
      console.log('click to need item')

      // run animation redirect to chat
      this.runTransitionAnimation()
      // rm chats list
      this.destroy()
    })
    
  }

  create() {
    console.log('createChatsList')
    
    document.querySelector('.chatHeader').style.display = 'none'
    document.querySelector('.chatContentWrapper').style.display = 'none'
    document.querySelector('#chat-ui-input').style.display = 'none'
    document.querySelector('.bottom-ui').style.display = 'none'

    // ставим пропорции для списка чатов
    const isChatsList = true
    this.bp.ResizeActivator(isChatsList)
  }

  runTransitionAnimation () {
    console.log('runAnimation')
  }

  async runChatingAnimation () {
    await this.bp.setTimeChating() // ставим заголовочное время диалога
    await new Chating().CreateAnimationChating(this.dialogs) // создание анимации переписки
  }

  destroy () {
    console.log('destroyChatsList')
    document.querySelector('.chat-list-version').classList.toggle('chat-list-version')
    document.querySelector('.chatContent').classList.toggle('whiteBg')
    document.querySelector('.chatContent').classList.toggle('grayBg')
    document.querySelector('.chats-list').style.display = 'none'
    document.querySelector('.chatHeader').style.display = 'flex'
    document.querySelector('.chatContentWrapper').style.display = 'block'
    document.querySelector('#chat-ui-input').style.display = 'flex'
    document.querySelector('.bottom-ui').style.display = 'flex'

    document.querySelector('.sections-app-wrapp').style.display = 'none'
    document.querySelector('.app-header').style.display = 'none'

    // ставим пропорции для чата
    this.bp.ResizeActivator()

    // start chating...
    this.runChatingAnimation()
  }
}