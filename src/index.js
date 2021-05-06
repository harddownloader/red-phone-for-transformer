import {BuildPhone} from './app/Builder' // на постройку самого телефона
// import { Chating } from './app/Chating' // на постройку механики обмена сообщениями
import {ChatsList} from './app/chatsList' // создание списка чатов

// подрубаем стили на stylus-е
require('./styles/stylus/main.styl')
;(function() {
  /**
   * класс инициализации самой анимации
   */
  window.RedPhoneAnimation = class PhoneAnimation {
    constructor(args) {
      this.startAnimationEvent(args.idElement)
      this.dialogs = args.dialogs
      PhoneAnimation.numInstances = (PhoneAnimation.numInstances || 0) + 1
      this.numInstances = PhoneAnimation.numInstances

      this.argsForBuilder = {
        type: args.type || 0, // тип анимации, отвеч. за отображение анимации ввода юзера

        dateChatingInHeader: args.dateChatingInHeader,
        headingChat: args.headingChat,
        dateTime: args.dateTime,
        clock: args.clock,
      }
      this.type = args.type || 0
    }

    /**
     * делаем стили(link в html) действующими на странице
     * для более удобно мержда с другими анимациями
     * нужно просто расскоментить вызовы этих функций ниже, чтобы их файлы стилей то включались
     * то выключались с страницы
     * @param {*} name 
     */
    activateStyles(name = 'linkRedPhone') {
      document
          .querySelector(`link[data-id=${name}]`)
          .removeAttribute('disabled')
    }

    /**
     * делаем стили(link в html) бездействующими на странице
     * @param {*} name 
     */
    deactivateStyles(name = 'linkRedPhone') {
      document
          .querySelector(`link[data-id=${name}]`)
          .setAttribute('disabled', '')
    }

    /**
     * проверяет загрузилась ли страничка
     * @param {*} callback 
     */
    ready(callback) {
      if (document.readyState != 'loading') callback()
      else document.addEventListener('DOMContentLoaded', callback)
    }

    /**
     * ставит событие клика и условие, что нужно сделать если произошел клик по нужному id
     * @param {*} elementID 
     */
    startAnimationEvent(elementID) {
      // если не проставили значек айдишника, то ставим его
      if (elementID[0] != '#') elementID = '#' + elementID

      // когда кликаем по иконке нашей анимации (для ее старта)
      document.querySelector(elementID).addEventListener('click', (event) => {
        event.stopPropagation() // это экспериментальная , можно удалять
        this.ready(async () => {
          // this.activateStyles()
          // чтобы не было дублей события старта при множественных кликах
          document.querySelector(elementID).style.pointerEvents = 'none';
          await this.setBodyOverflow('hidden') // убираем возможность скролла по веб странице в момент игры анимации

          const bp = new BuildPhone(this.argsForBuilder) // начинаем создавать телефон

          // для resiz-а окна
          window.addEventListener('resize', (event) => {
            bp.ResizeActivator() // перерасчитываем значения всех элементов
          })

          await bp.SetterAllElements() // ставим значения для всех элементов
          await this.setNeededOffsetToTopIfPageScrolledBefore()
          await this.ChangevVisibilityStatus('overlay') // делаем серый фон видным
          await this.closeAnimationEvent(elementID) // ставим событие на закрытие окна анимации
          // await bp.setTimeChating() // ставим заголовочное время диалога
          // await new Chating().CreateAnimationChating(this.dialogs) // создание анимации переписки
          await new ChatsList().init(bp, this.dialogs) // создание списка чатов
        })
      })
    }

    /**
     * ставим событие на закрытие аниамции при клике
     * на пространство вокруг анимации
     * @param {*} elementID 
     */
    closeAnimationEvent(elementID) {
      // если кликаем по контейнеру вокруг телефона(т.е. в любое место ,только не на телефон), то закрываться анимация
      document.getElementById('overlay').addEventListener('click', () => {
        // отключаем стили анимации снова
        // this.deactivateStyles()
        // чтобы не было дублей события старта при множественных кликах
        document.querySelector(elementID).style.pointerEvents = 'auto';
        // возвращаем body скроллинг
        this.setBodyOverflow('visible')
        // вырубаем все сеттаймауты
        window.timerHub.stop('chatinUserAnimation')
        window.timerHub.stop('preBuildMessageApp')
        window.timerHub.stop('preBuildMessageUser')
        // чистим html и приводим все в первоначальный вид
        document.body.removeChild(document.getElementById('master-container'))
        document.body.removeChild(document.getElementById('overlay'))
      })
    }

    /**
     * делаем элемент видимым или не видимым, через свойство visibility
     * @param {*} id - id элемента, которому мы проставляем visibility
     */
    ChangevVisibilityStatus(id) {
      const el = document.getElementById(id)
      el.style.visibility =
        el.style.visibility == 'visible' ? 'hidden' : 'visible'
    }

    /**
     * чтобы нельзя было гонять скролл по веб-странице в момент анимации (это фикс белой полоски внизу экрана при анимации , тип что оверлей все не может покрыть , еси скролл включен)
     * @param {*} value - значение для overflow , может быть visible или hidden
     */
    setBodyOverflow(value) {
      document.querySelector('body').style.overflow = value
    }

    /**
     * двигаем анимацию точно в место просотра веб-страницы прямо сейчас(если человек до этого проскролил и нажал включить анимацию)
     * (это тоже фикс белой полоски внизу экрана при анимации , тип что оверлей все не может покрыть , еси скролл включен)
     */
    setNeededOffsetToTopIfPageScrolledBefore() {
      document.querySelector('#master-container').style.top =
        document.querySelector('html').scrollTop + 'px'
      document.querySelector('#overlay').style.top =
        document.querySelector('html').scrollTop + 'px'
    }
  }
})()
