// список чатов
import {Chating} from './Chating' // на постройку механики обмена сообщениями


export class ChatsList {
  constructor(props) {
    this.bp
    this.dialogs
    this.needChatItemId = '.need-item'
  }

  init(bp, dialogs) {
    this.bp = bp
    this.dialogs = dialogs

    // set current dialog to LS
    if (!localStorage.getItem('currentAnimationDialog')) {
      localStorage.setItem('currentAnimationDialog', JSON.stringify(dialogs))
    } else {
      this.hideChatListHtml()
    }

    // show html
    this.create()
    // wait click event
    // const needChatItemId = '.need-item'
    document.querySelector(this.needChatItemId).addEventListener('click', (event) => {
      // console.log('click to need item')
      document.querySelector(this.needChatItemId).classList.toggle('active')

      // rm chats list
      setTimeout(() => {
        this.destroy()
      }, 300)
    })
  }

  create() {
    // console.log('createChatsList')
    
    document.querySelector('.chatHeader').style.display = 'none'
    document.querySelector('.chatContentWrapper').style.display = 'none'
    document.querySelector('#chat-ui-input').style.display = 'none'
    document.querySelector('.bottom-ui').style.display = 'none'

    // ставим пропорции для списка чатов
    const isChatsList = true
    this.bp.ResizeActivator(isChatsList)

    let delayBafereClickOnChatListItem = 2000

    if (localStorage.getItem('currentAnimationDialog')) {
      delayBafereClickOnChatListItem = 0
    }

    //  через время активируем диалог, как буд-то произошел клик
    setTimeout(() => {
      if (document.querySelector(this.needChatItemId)) {
        document.querySelector(this.needChatItemId).click()
      }
    }, delayBafereClickOnChatListItem)
  }

  runTransitionAnimation() {
    // console.log('runAnimation')

    let delayTransitionAnimationFromChatListToChat = 400

    if (localStorage.getItem('currentAnimationDialog')) {
      delayTransitionAnimationFromChatListToChat = 0
    }

    setTimeout(() => {
      if (document.querySelector('.chatContentWrapper')) {
        document.querySelector('.chatContentWrapper').classList.toggle('activeChat')
      }
    }, delayTransitionAnimationFromChatListToChat)
  }

  async runChatingAnimation() {
    await this.bp.setTimeChating() // ставим заголовочное время диалога
    await new Chating().CreateAnimationChating(this.dialogs) // создание анимации переписки
  }

  hideChatListHtml() {
    document.querySelector('.chats-list').style.display = 'none'
    document.querySelector('.sections-app-wrapp').style.display = 'none'
    document.querySelector('.app-header').style.display = 'none'
  }

  destroy() {
    // console.log('destroyChatsList')
    document.querySelector('.chat-list-version').classList.toggle('chat-list-version')
    document.querySelector('.chatContent').classList.toggle('whiteBg')
    document.querySelector('.chatContent').classList.toggle('grayBg')
    
    this.hideChatListHtml()

    document.querySelector('.chatHeader').style.display = 'flex'
    document.querySelector('.chatContentWrapper').style.display = 'block'
    document.querySelector('#chat-ui-input').style.display = 'flex'
    document.querySelector('.bottom-ui').style.display = 'flex'

    // document.querySelector('.sections-app-wrapp').style.display = 'none'
    // document.querySelector('.app-header').style.display = 'none'

    // run animation redirect to chat
    this.runTransitionAnimation()

    // ставим пропорции для чата
    this.bp.ResizeActivator()
    

    // start chating...
    this.runChatingAnimation()
  }
}
