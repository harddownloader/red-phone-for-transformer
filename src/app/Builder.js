// @//ts-check
import {ConvertTools} from './core.js'
import configJS from './config'
import {getPhoneHTML} from './createHTML'
import {ComputedProperties} from './ComputedProperties'

/**
 * класс для сборки макета анимации,
 * отвечает за проставление высот, ширин и отступов для элементов анимации,
 * с учетом того процентного соотношения их друг к другу
 */
export class BuildPhone {
  constructor(argsForBuilder) {
    this.argsForBuilder = argsForBuilder
    this.height = new ComputedProperties().getHW().height // wrapper_phone
    this.width = new ComputedProperties().getHW().width // wrapper_phone
    this.phoneDisplayHeight = new ComputedProperties().phone_display().height
    this.phoneDisplayWidth = new ComputedProperties().phone_display().width

    this.marginsForPhoneDisplay = {
      marginTop: new ComputedProperties().phone_display().margins.marginTop.toString(),
      marginRight: new ComputedProperties().phone_display().margins.marginRight.toString(),
      marginBottom: new ComputedProperties().phone_display().margins.marginBottom.toString(),
      marginLeft: new ComputedProperties().phone_display().margins.marginLeft.toString(),
    }

    this.paddingsForPhoneDisplay = {
      paddingTop: new ComputedProperties().phone_display().paddings.paddingTop.toString(),
      paddingRight: new ComputedProperties().phone_display().paddings.paddingRight.toString(),
      paddingBottom: new ComputedProperties().phone_display().paddings.paddingBottom.toString(),
      paddingLeft: new ComputedProperties().phone_display().paddings.paddingLeft.toString(),
    }

    this.chatHeaderWrapperHeight = new ComputedProperties().displayElements().topHeaderHeight

    this.chatContentHeight = new ComputedProperties().displayElements().chatContentHeight // он же и max-height

    // footer
    this.chatUiInputHeight = new ComputedProperties().displayElements().chatUiInputHeigh
    this.bottomUiHeight = new ComputedProperties().displayElements().bottomUiHeight
    this.sectionsAppHeight = new ComputedProperties().displayElements().sectionsAppHeight

    this.chatHeaderWrapperOtricatelnueMargins = {
      marginLeft: '-' + this.marginsForPhoneDisplay.marginLeft + 'px',
      marginRight: '-' + this.marginsForPhoneDisplay.marginRight + 'px',
    }
  } // construstor

  /**
   * расчет всех пропорциональных свойств элементов анимации,
   * и проставление их
   * (срабатывает при старте анимации)
   */
  async SetterAllElements() {
    // созд. скелет html
    await this.initHTML()
    // назначаем тип отображение анимации вода юзера
    var typeClass
    switch (this.argsForBuilder.type) {
      case 0:
        typeClass = 'none'
        break
      case 1:
        typeClass = 'one'
        break
      case 2:
        typeClass = 'two'
        break
      case 3:
        typeClass = 'three'
    }
    document.querySelector('.ChatAkcent').classList.add(typeClass)
    // SET CHAT PARAM
    document.querySelector(
        '.headAndDate__sub_title'
    ).innerHTML = this.argsForBuilder.headingChat

    document.querySelector(
        '.topHeaderTime'
    ).innerHTML = this.argsForBuilder.clock

    // HEIGHT AND WIDHT
    document.querySelector('#wrapper_phone').style.width = this.width + 'px'
    document.querySelector('#wrapper_phone').style.height = this.height + 'px'

    document.querySelector('.phone_display_wrapper').style.width = '100%'
    document.querySelector('.phone_display_wrapper').style.height = '100%'

    // document.querySelector('.chatTopHeaderContainer').style.height =
    //   this.chatTopHeaderContainerHeight + 'px' // '0px'

    document.querySelector('.phone_display').style.width =
      this.phoneDisplayWidth + 'px'
    document.querySelector('.phone_display').style.height =
      this.phoneDisplayHeight + 'px'

    document.querySelector('.chatContent').style.maxHeight =
      this.chatContentHeight + 'px'

    document.querySelector('.chatHeaderWrapper').style.height =
      this.chatHeaderWrapperHeight + 'px'
    
    // --footer
    document.querySelector('#chat-ui-input').style.height =
      this.chatUiInputHeight + 'px'
    document.querySelector('.bottom-ui').style.height =
      this.bottomUiHeight + 'px'
    document.querySelector('.sections-app-wrapp').style.height =
      this.sectionsAppHeight + 'px'
    
    // PADDINGS
    const display_width_p_top = this.paddingsForPhoneDisplay.paddingTop
    const display_width_p_right = this.paddingsForPhoneDisplay.paddingRight
    const display_width_p_bottom = this.paddingsForPhoneDisplay.paddingBottom
    const display_width_p_left = this.paddingsForPhoneDisplay.paddingLeft

    const padding_options =
      display_width_p_top +
      'px ' +
      display_width_p_right +
      'px ' +
      display_width_p_bottom +
      'px ' +
      display_width_p_left +
      'px'

    document.querySelector('.phone_display').style.padding = padding_options

    // MARGINS
    const display_width_m_top = this.marginsForPhoneDisplay.marginTop
    const display_width_m_right = this.marginsForPhoneDisplay.marginRight
    const display_width_m_bottom = this.marginsForPhoneDisplay.marginBottom
    const display_width_m_left = this.marginsForPhoneDisplay.marginLeft

    const margin_options =
      display_width_m_top +
      'px ' +
      display_width_m_right +
      'px ' +
      display_width_m_bottom +
      'px ' +
      display_width_m_left +
      'px'

    document.querySelector('.phone_display').style.margin = margin_options

    document.querySelector(
        '.chatHeaderWrapper'
    ).style.marginLeft = this.chatHeaderWrapperOtricatelnueMargins.marginLeft
    document.querySelector(
        '.chatHeaderWrapper'
    ).style.marginRight = this.chatHeaderWrapperOtricatelnueMargins.marginRight

    // для блока теней (анимация для привлечения внимания на поле ввода в момент печати текста)
    // на пока просто не нужно document.querySelector('.ChatAkcent').style.height = new ConvertTools().convert_percents_to_px(configJS['ChatAkcentPercentage'], new ComputedProperties().getHW().height) + 'px'
    const borderRadius =
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px'
    document.querySelector('.ChatAkcent').style.borderRadius = borderRadius

    // и для анимации постветки у футера (используется в 3м типе анимации реагирования на ввод пользователя)
    document.querySelector(
        '.ChatAkcent__FooterOnly'
    ).style.borderRadius = borderRadius
  }

  /**
   * пересчет всех пропорциональных свойств элементов анимации,
   * и проставление их,
   * при срабатывании события ресайза окна браузера
   */
  ResizeActivator(isChatsList = false) {
    if (document.querySelector('.chat-list-version')) {
      isChatsList = true
    }

    // HEIGHT AND WIDHT
    document.querySelector('#wrapper_phone').style.width =
      Math.round(new ComputedProperties().getHW().width) + 'px'
    // console.log(new ComputedProperties().getHW().width)
    document.querySelector('#wrapper_phone').style.height =
      Math.round(new ComputedProperties().getHW().height) + 'px'

    document.querySelector('.phone_display').style.height =
      Math.round(new ComputedProperties().phone_display().height) + 'px'
    document.querySelector('.phone_display').style.width =
      Math.round(new ComputedProperties().phone_display().width) + 'px'

    document.querySelector('.chatContent').style.maxHeight =
      Math.round(new ComputedProperties().displayElements(isChatsList).chatContentHeight) + 'px'

    document.querySelector('.chatHeaderWrapper').style.height =
      Math.round(new ComputedProperties().displayElements(isChatsList).topHeaderHeight) + 'px'
    
    document.querySelector('.topHeaderNetworkWrap__img').style.width =
      Math.round(new ComputedProperties().displayElements().wifiAndBatteryWidth) + 'px'

    document.querySelector('.user-control__img.more-btn').style.height =
      Math.round(new ComputedProperties().displayElements().moreBtnHeight) + 'px'

    document.querySelector('.user-control__img.add-contact-btn').style.height =
      Math.round(new ComputedProperties().displayElements().addContactHeight) + 'px'
    
    document.querySelector('.user-control__img.writing-btn').style.height =
      Math.round(new ComputedProperties().displayElements().writingHeight) + 'px'
    
    document.querySelector('.user-options__search .search-input').style.height =
      Math.round(new ComputedProperties().displayElements().searchHeight) + 'px'
    
    // --chat list
    if (isChatsList) {
      // chat item
      document.querySelectorAll('.chat-item').forEach(item => {
        item.style.height = Math.round(new ComputedProperties().displayElements(isChatsList).chatItemHeight) + 'px'
      })
      // chat item img
      document.querySelectorAll('.chat-item .chat__avatar').forEach(item => {
        item.style.height = Math.round(new ComputedProperties().displayElements(isChatsList).chatItemImgHeight) + 'px'
        item.style.width = Math.round(new ComputedProperties().displayElements(isChatsList).chatItemImgHeight) + 'px'
      })
      // section app icons
      document.querySelectorAll('.sections-app__item .section_img').forEach(item => {
        item.style.height = Math.round(new ComputedProperties().displayElements(isChatsList).sectionsAppIconsHeight) + 'px'
      })
    }
    
    // --header
    document.querySelector('.chatHeader__logo').style.width =
      Math.round(new ComputedProperties().displayElements().headerLogoWidth) + 'px'
    document.querySelector('.chatHeader__back_btn').style.width =
      Math.round(new ComputedProperties().displayElements().headerBackBtnWidth) + 'px'
    document.querySelector('.headAndDate__arrow').style.width =
      Math.round(new ComputedProperties().displayElements().headAndDate__arrowWidth) + 'px'

    // --messages
    document.querySelectorAll('.chat-icon img').forEach(item => {
      item.style.width = Math.round(new ComputedProperties().displayElements().chatIconImgWidth) + 'px'
    })
    
      
    // --footer
    document.querySelector('#chat-ui-input').style.height =
      Math.round(new ComputedProperties().displayElements(isChatsList).chatUiInputHeigh) + 'px'
    document.querySelector('.bottom-ui').style.height =
      Math.round(new ComputedProperties().displayElements(isChatsList).bottomUiHeight) + 'px'
    document.querySelector('.sections-app-wrapp').style.height =
      Math.round(new ComputedProperties().displayElements(isChatsList).sectionsAppHeight) + 'px'
    document.querySelector('.bottom-ui__phone_line').style.width =
      Math.round(new ComputedProperties().displayElements().bottomLineWidth) + 'px'
    document.querySelector('.chatSend').style.width =
      Math.round(new ComputedProperties().displayElements().userInputWidth) + 'px'
    document.querySelector('.chatSend').style.height =
      Math.round(new ComputedProperties().displayElements().userInputHeight) + 'px'
    document.querySelector('.input-element.attach-wrap').style.width =
      Math.round(new ComputedProperties().displayElements().bottomIconAddFileWidth) + 'px'
    document.querySelector('.input-element.gallery-wrap').style.width =
      Math.round(new ComputedProperties().displayElements().bottomIconGalleryWidth) + 'px'
    
    document.querySelector('.input-element.micro-wrap').style.width =
      Math.round(new ComputedProperties().displayElements().bottomIconMicroWidth) + 'px'
    document.querySelector('.input-element.micro-wrap img.micro').style.height =
      Math.round(new ComputedProperties().displayElements().bottomIconMicroWidth) + 'px'
      

    // PADDINGS
    const display_width_p_top = new ComputedProperties().phone_display().paddings.paddingTop.toString()
    const display_width_p_right = new ComputedProperties().phone_display().paddings.paddingRight.toString()
    const display_width_p_bottom = new ComputedProperties().phone_display().paddings.paddingBottom.toString()
    const display_width_p_left = new ComputedProperties().phone_display().paddings.paddingLeft.toString()

    const padding_options =
      display_width_p_top +
      'px ' +
      display_width_p_right +
      'px ' +
      display_width_p_bottom +
      'px ' +
      display_width_p_left +
      'px'

    document.querySelector('.phone_display').style.padding = padding_options

    document.querySelector('.chatContentWrapper').style.padding = Math.round(new ComputedProperties().displayElements().chatContentWrapperPeddings) + 'px'

    // --top header
    document.querySelector('.chatTopHeaderContainer').style.paddingTop = 
      Math.round(new ComputedProperties().displayElements().topHeaderPaddings.paddingTop) + 'px'
    document.querySelector('.chatTopHeaderContainer').style.paddingRight = 
      Math.round(new ComputedProperties().displayElements().topHeaderPaddings.paddingRight) + 'px'
    document.querySelector('.chatTopHeaderContainer').style.paddingLeft = 
      Math.round(new ComputedProperties().displayElements().topHeaderPaddings.paddingLeft) + 'px'
    document.querySelector('.chatTopHeaderContainer').style.paddingBottom = 
      Math.round(new ComputedProperties().displayElements().topHeaderPaddings.paddingBottom) + 'px'

    // --messages
    const paddingOffestHeight = Math.round(new ComputedProperties().displayElements().messagePaddings.paddingOffestHeight)
    const paddingOffestWeight = Math.round(new ComputedProperties().displayElements().messagePaddings.paddingOffestWeight)
    document.querySelectorAll('.chatContent .chat-column > .item > .chat-message').forEach(chat => {
      chat.style.padding = 
        paddingOffestHeight + 'px ' +
        paddingOffestWeight + 'px'
    })
    
    
    // MARGINS
    const display_width_m_top = new ComputedProperties().phone_display().margins.marginTop.toString()
    const display_width_m_right = new ComputedProperties().phone_display().margins.marginRight.toString()
    const display_width_m_bottom = new ComputedProperties().phone_display().margins.marginBottom.toString()
    const display_width_m_left = new ComputedProperties().phone_display().margins.marginLeft.toString()

    const margin_options =
      display_width_m_top +
      'px ' +
      display_width_m_right +
      'px ' +
      display_width_m_bottom +
      'px ' +
      display_width_m_left +
      'px'

    document.querySelector('.phone_display').style.margin = margin_options

    // --header
    document.querySelector(
        '.chatHeaderWrapper'
    ).style.marginLeft = new ComputedProperties().phone_display().margins.marginLeft.toString()

    document.querySelector(
        '.chatHeaderWrapper'
    ).style.marginRight = new ComputedProperties().phone_display(isChatsList).margins.marginRight.toString()

    document.querySelector('.user-options__options').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().userOptionsOffests.marginLeft) + 'px'
    
    document.querySelector('.user-options__options').style.marginRight =
      Math.round(new ComputedProperties().displayElements().userOptionsOffests.marginRight) + 'px'
    
    document.querySelector('.chatHeader__back_btn').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().leftHeaderOffestWidth) + 'px'
    document.querySelector('.headAndDate__head').style.marginRight =
      Math.round(new ComputedProperties().displayElements().rightHeaderOffestWidth) + 'px'
    document.querySelector('.chatHeader__logo').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().leftLogoOffsetWidth) + 'px'
    document.querySelector('.chatHeader__logo').style.marginRight =
      Math.round(new ComputedProperties().displayElements().rightLogoOffsetWidth) + 'px'

    // --messages
    const messageMarginBottom = Math.round(new ComputedProperties().displayElements().messageMarginBottom)
    document.querySelectorAll('.chatContent .chat-column').forEach(chat => {
      chat.style.marginBottom = 
        messageMarginBottom + 'px'
    })
    const messageLogoTopMargin = Math.round(new ComputedProperties().displayElements().messageLogoTopMargin)
    document.querySelectorAll('.chatContent .chat-column > .item > .chat-icon').forEach(chat => {
      chat.style.marginTop = 
        messageLogoTopMargin + 'px'
    })
    
    const messageLogoLeftOrRightMargin = Math.round(new ComputedProperties().displayElements().messageLogoLeftOrRightMargin)
    document.querySelectorAll('.chatContent .chat-column.company > .item > .chat-icon').forEach(chat => {
      chat.style.marginLeft = 
        messageLogoLeftOrRightMargin + 'px'
    })
    document.querySelectorAll('.chatContent .chat-column.customer > .item > .chat-icon').forEach(chat => {
      chat.style.marginRight = 
        messageLogoLeftOrRightMargin + 'px'
    })
    
    // --footer
    document.querySelector('.input-element.attach-wrap').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().bottomOffsetWidth) + 'px'
    document.querySelector('.input-element.gallery-wrap').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().bottomOffsetWidth) + 'px'  
    document.querySelector('.input-element.micro-wrap').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().bottomOffsetWidth) + 'px'  
    document.querySelector('.chatSend').style.marginLeft =
      Math.round(new ComputedProperties().displayElements().bottomOffsetWidth) + 'px'  
    document.querySelector('.chatSend').style.marginRight =
      Math.round(new ComputedProperties().displayElements().bottomOffsetWidth) + 'px'
    
    
    // line height
    document.querySelector('.chatSend__TextAndSend').style.lineHeight =
      Math.round(new ComputedProperties().displayElements().userInputHeight) + 'px'
    document.querySelector('.sendText').style.lineHeight =
      Math.round(new ComputedProperties().displayElements().userInputHeight) + 'px'
    document.querySelector('#writer').style.lineHeight =
      Math.round(new ComputedProperties().displayElements().userInputHeight) + 'px'

    document.querySelectorAll('.chat-message').forEach(chat => {
      chat.style.lineHeight = 
        Math.round(new ComputedProperties().displayElements().chatMessageLineHeight) + 'px'
    })
    document.querySelector('.headAndDate__head').style.lineHeight =
      Math.round(new ComputedProperties().displayElements().headAndDate__headFontSize) + 'px'
    document.querySelectorAll('.headAndDate__sub_title').forEach(item => {
      item.style.lineHeight = Math.round(new ComputedProperties().displayElements().messageDateFontSize) + 'px'
    })
    

    // background size
    document.querySelector('.sendText-wrap').style.backgroundSize =
      Math.round(new ComputedProperties().displayElements().userInputBgWidth) + 'px'
    document.querySelector('.sendText').style.backgroundSize =
      Math.round(new ComputedProperties().displayElements().userInputBgWidth) + 'px'
    
    // font size
    const userInputFontSize = Math.round(new ComputedProperties().displayElements().userInputHeight) / 2
    document.querySelector('.sendText').style.fontSize =
      userInputFontSize + 'px'
    document.querySelector('#writer').style.fontSize =
      userInputFontSize + 'px'
    document.querySelector('#cursor').style.fontSize =
      userInputFontSize + 'px'
    
    document.querySelector('.headAndDate__head').style.fontSize =
      Math.round(new ComputedProperties().displayElements().headAndDate__headFontSize) + 'px'
    document.querySelector('.date_dialogs_item').style.fontSize =
      Math.round(new ComputedProperties().displayElements().date_dialogs_itemFontSize) + 'px'


    document.querySelectorAll('.message-date').forEach(date => {
      date.style.fontSize = 
        Math.round(new ComputedProperties().displayElements().messageDateFontSize) + 'px'
    })
    document.querySelectorAll('.chat-message').forEach(chat => {
      chat.style.fontSize = 
      Math.round(new ComputedProperties().displayElements().chatMessageFontSize) + 'px'
    })
    document.querySelectorAll('.option_btn').forEach(item => {
      item.style.fontSize = Math.round(new ComputedProperties().displayElements().chatMessageFontSize) + 'px'
    })
    document.querySelectorAll('.headAndDate__sub_title').forEach(item => {
      item.style.fontSize = Math.round(new ComputedProperties().displayElements().messageDateFontSize) + 'px'
    })
      

    // border radius
    // --app msg
    const appMsgBorderRadiusFirst = Math.round(new ComputedProperties().displayElements().messageBorderRadius.first)
    const appMsgBorderRadiusRest = Math.round(new ComputedProperties().displayElements().messageBorderRadius.rest)

    document.querySelectorAll('.chatContent .customer.chat-column > .item > .chat-message').forEach(chat => {
      chat.style.borderRadius = 
        appMsgBorderRadiusFirst + 'px ' +
        appMsgBorderRadiusRest + 'px ' +
        appMsgBorderRadiusRest + 'px ' +
        appMsgBorderRadiusRest + 'px'
    })

    // --user msg
    const userMsgBorderRadiusFirst = Math.round(new ComputedProperties().displayElements().messageBorderRadius.first)
    const userMsgBorderRadiusRest = Math.round(new ComputedProperties().displayElements().messageBorderRadius.rest)
    document.querySelectorAll('.chatContent .company.chat-column > .item > .chat-message').forEach(chat => {
      chat.style.borderRadius = 
        userMsgBorderRadiusRest + 'px ' +
        userMsgBorderRadiusFirst + 'px ' +
        userMsgBorderRadiusRest + 'px ' +
        userMsgBorderRadiusRest + 'px'
    })
    

    // для блока теней (анимация для привлечения внимания на поле ввода в момент печати текста)
    // пока что не нужно document.querySelector('.ChatAkcent').style.height = new ConvertTools().convert_percents_to_px(configJS['ChatAkcentPercentage'], new ComputedProperties().getHW().height) + 'px'
    // для блока теней (анимация для привлечения внимания на поле ввода в момент печати текста)
    // на пока просто не нужно document.querySelector('.ChatAkcent').style.height = new ConvertTools().convert_percents_to_px(configJS['ChatAkcentPercentage'], new ComputedProperties().getHW().height) + 'px'
    const borderRadius =
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
          configJS['ChatAkcentBorderRadiusPercentage'],
          new ComputedProperties().getHW().width
      ) +
      'px'
    document.querySelector('.ChatAkcent').style.borderRadius = borderRadius

    // и для анимации постветки у футера (используется в 3м типе анимации реагирования на ввод пользователя)
    document.querySelector(
        '.ChatAkcent__FooterOnly'
    ).style.borderRadius = borderRadius
  }

  /**
   * ставит дату диалога
   */
  setTimeChating() {
    const date = this.argsForBuilder.dateChatingInHeader
    document.querySelector('.date_dialogs_item').textContent = date
    return
  }

  /**
   * создаем свой "плейсхолдер" для поля ввода (нужно чтобы можно было иметь контроль над ним)
   */
  setInputField() {
    // заменяем placeholder ( так как нормального доступа к параметрам у textarea::placeholder до сих пор(2020) нет и работает он криво)
    document.querySelector('.sendText').value = 'Сообщение...'
    document.querySelector('.sendText').style.opacity = '0.5'
  }

  /**
   * создаем html скелет для нашего приложения
   */
  async initHTML() {
    const phoneHTML = await getPhoneHTML()
    document.body.insertAdjacentHTML('beforeend', phoneHTML)
  }
} // BuildPhone
