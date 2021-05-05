// @//ts-check
import { ConvertTools } from './core.js'
import configJS from './config'
import { getPhoneHTML } from './createHTML'

/**
 * класс для сборки макета анимации,
 * отвечает за проставление высот, ширин и отступов для элементов анимации,
 * с учетом того процентного соотношения их друг к другу
 */
export class BuildPhone {
  constructor(argsForBuilder) {
    this.argsForBuilder = argsForBuilder
    this.height = this.getHW().height // wrapper_phone
    this.width = this.getHW().width // wrapper_phone
    this.phoneDisplayHeight = this.phone_display().height
    this.phoneDisplayWidth = this.phone_display().width

    this.marginsForPhoneDisplay = {
      marginTop: this.phone_display().margins.marginTop.toString(),
      marginRight: this.phone_display().margins.marginRight.toString(),
      marginBottom: this.phone_display().margins.marginBottom.toString(),
      marginLeft: this.phone_display().margins.marginLeft.toString(),
    }

    this.paddingsForPhoneDisplay = {
      paddingTop: this.phone_display().paddings.paddingTop.toString(),
      paddingRight: this.phone_display().paddings.paddingRight.toString(),
      paddingBottom: this.phone_display().paddings.paddingBottom.toString(),
      paddingLeft: this.phone_display().paddings.paddingLeft.toString(),
    }

    this.chatHeaderWrapperHeight = this.displayElements().topHeaderHeight

    this.chatContentHeight = this.displayElements().chatContentHeight // он же и max-height

    // footer
    this.chatUiInputHeight = this.displayElements().chatUiInputHeigh
    this.bottomUiHeight = this.displayElements().bottomUiHeight
    this.sectionsAppHeight = this.displayElements().sectionsAppHeight

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
    
    //--footer
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
    // на пока просто не нужно document.querySelector('.ChatAkcent').style.height = new ConvertTools().convert_percents_to_px(configJS['ChatAkcentPercentage'], this.getHW().height) + 'px'
    const borderRadius =
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
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
    if(document.querySelector('.chat-list-version')) {
      isChatsList = true
    }

    // HEIGHT AND WIDHT
    document.querySelector('#wrapper_phone').style.width =
      this.getHW().width + 'px'
    // console.log(this.getHW().width)
    document.querySelector('#wrapper_phone').style.height =
      this.getHW().height + 'px'

    document.querySelector('.phone_display').style.height =
      this.phone_display().height + 'px'
    document.querySelector('.phone_display').style.width =
      this.phone_display().width + 'px'

    document.querySelector('.chatContent').style.maxHeight =
      this.displayElements(isChatsList).chatContentHeight + 'px'

    document.querySelector('.chatHeaderWrapper').style.height =
      this.displayElements(isChatsList).topHeaderHeight + 'px'
    
    document.querySelector('.topHeaderNetworkWrap__img').style.width =
      this.displayElements().wifiAndBatteryWidth + 'px'

    document.querySelector('.user-control__img.more-btn').style.height =
      this.displayElements().moreBtnHeight + 'px'

    document.querySelector('.user-control__img.add-contact-btn').style.height =
      this.displayElements().addContactHeight + 'px'
    
    document.querySelector('.user-control__img.writing-btn').style.height =
      this.displayElements().writingHeight + 'px'
    
    document.querySelector('.user-options__search .search-input').style.height =
      this.displayElements().searchHeight + 'px'
    
    //--chat list
    if (isChatsList) {
      // chat item
      document.querySelectorAll('.chat-item').forEach(item => {
        item.style.height = Math.round(this.displayElements(isChatsList).chatItemHeight) + 'px'
      })
      // chat item img
      document.querySelectorAll('.chat-item .chat__avatar').forEach(item => {
        item.style.height = Math.round(this.displayElements(isChatsList).chatItemImgHeight) + 'px'
        item.style.width = Math.round(this.displayElements(isChatsList).chatItemImgHeight) + 'px'
      })
      // section app icons
      document.querySelectorAll('.sections-app__item .section_img').forEach(item => {
        item.style.height = Math.round(this.displayElements(isChatsList).sectionsAppIconsHeight) + 'px'
      })
    }
    
    
    //--footer
    document.querySelector('#chat-ui-input').style.height =
      this.displayElements(isChatsList).chatUiInputHeigh + 'px'
    document.querySelector('.bottom-ui').style.height =
      this.displayElements(isChatsList).bottomUiHeight + 'px'
    document.querySelector('.sections-app-wrapp').style.height =
      this.displayElements(isChatsList).sectionsAppHeight + 'px'
    document.querySelector('.bottom-ui__phone_line').style.width =
      this.displayElements().bottomLineWidth + 'px'
    document.querySelector('.chatSend').style.width =
      this.displayElements().userInputWidth + 'px'
    document.querySelector('.chatSend').style.height =
      this.displayElements().userInputHeight + 'px'
      

    // PADDINGS
    const display_width_p_top = this.phone_display().paddings.paddingTop.toString()
    const display_width_p_right = this.phone_display().paddings.paddingRight.toString()
    const display_width_p_bottom = this.phone_display().paddings.paddingBottom.toString()
    const display_width_p_left = this.phone_display().paddings.paddingLeft.toString()

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

    //--top header
    document.querySelector('.chatTopHeaderContainer').style.paddingTop = 
      this.displayElements().topHeaderPaddings.paddingTop + 'px'
    document.querySelector('.chatTopHeaderContainer').style.paddingRight = 
      this.displayElements().topHeaderPaddings.paddingRight + 'px'
    document.querySelector('.chatTopHeaderContainer').style.paddingLeft = 
      this.displayElements().topHeaderPaddings.paddingLeft + 'px'
    document.querySelector('.chatTopHeaderContainer').style.paddingBottom = 
      this.displayElements().topHeaderPaddings.paddingBottom + 'px'
    
    
    // MARGINS
    const display_width_m_top = this.phone_display().margins.marginTop.toString()
    const display_width_m_right = this.phone_display().margins.marginRight.toString()
    const display_width_m_bottom = this.phone_display().margins.marginBottom.toString()
    const display_width_m_left = this.phone_display().margins.marginLeft.toString()

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
    ).style.marginLeft = this.phone_display().margins.marginLeft.toString()

    document.querySelector(
      '.chatHeaderWrapper'
    ).style.marginRight = this.phone_display(isChatsList).margins.marginRight.toString()

    document.querySelector('.user-options__options').style.marginLeft =
      this.displayElements().userOptionsOffests.marginLeft + 'px'
    
    document.querySelector('.user-options__options').style.marginRight =
      this.displayElements().userOptionsOffests.marginRight + 'px'

    // для блока теней (анимация для привлечения внимания на поле ввода в момент печати текста)
    // пока что не нужно document.querySelector('.ChatAkcent').style.height = new ConvertTools().convert_percents_to_px(configJS['ChatAkcentPercentage'], this.getHW().height) + 'px'
    // для блока теней (анимация для привлечения внимания на поле ввода в момент печати текста)
    // на пока просто не нужно document.querySelector('.ChatAkcent').style.height = new ConvertTools().convert_percents_to_px(configJS['ChatAkcentPercentage'], this.getHW().height) + 'px'
    const borderRadius =
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
      ) +
      'px ' +
      new ConvertTools().convert_percents_to_px(
        configJS['ChatAkcentBorderRadiusPercentage'],
        this.getHW().width
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
   * возвращает объект с нужными высотами частей анимации
   */
  displayElements(isChatsList = false) {
    // console.log('displayElements', isChatsList)
    if(document.querySelector('.chat-list-version')) {
      isChatsList = true
    }

    const height_ = this.getHW().height
    const width_ = this.getHW().width

    const topHeaderHeigthInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? configJS['topHeaderHeightPercentage__chatList'] : configJS['topHeaderPercentage']
          // console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      chatUiInputHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? 0 : configJS['chatUiInputHeightPercentage']
          // console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      userInputWidthInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? 0 : configJS['userInputWidthPercentage']
          // console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        width_
      ),
      userInputHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? 0 : configJS['userInputHeightPercentage']
          // console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      bottomUiHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? 0 : configJS['bottomUiHeightPercentage']
          // console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      bottomLineWidthInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? 0 : configJS['bottomLineWidthPercentage']
          // console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        width_
      ),
      sectionsAppHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? configJS['sectionsAppHeightPercentage'] : 0
          // console.log('sectionsAppHeightInConfig needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      sectionsAppIconsHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = configJS['sectionsAppIconsHeightPercentage']
          // console.log('sectionsAppIconsHeightInConfig needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      chatItemImgHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? configJS['chatItemImgHeightPercentage'] : 0
          // console.log('chatItemImgHeightInConfig needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      wifiAndBatteryWidthInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = configJS['wifiAndBatteryWidthPercentage']
          // console.log('wifiAndBatteryWidthInConfig needPercentage', needPercentage)
          return needPercentage
        })(),
        width_
      ),
      moreBtnHeightInConfig = new ConvertTools().convert_percents_to_px(
        configJS['moreBtnHeightPercentage'],
        height_
      ),
      addContactHeightInConfig = new ConvertTools().convert_percents_to_px(
        configJS['addContactHeightPercentage'],
        height_
      ),
      writingHeightInConfig = new ConvertTools().convert_percents_to_px(
        configJS['writingHeightPercentage'],
        height_
      ),
      userOptionsMarginRightInConfig = new ConvertTools().convert_percents_to_px(
        configJS['userOptionsOffestsPercentage']['marginRight'],
        width_
      ),
      userOptionsMarginLeftInConfig = new ConvertTools().convert_percents_to_px(
        configJS['userOptionsOffestsPercentage']['marginLeft'],
        width_
      ),
      topHeaderPaddingTopInConfig = new ConvertTools().convert_percents_to_px(
        configJS['topHeaderPaddingsPercentage']['paddingTop'],
        height_
      ),
      topHeaderPaddingRightInConfig = new ConvertTools().convert_percents_to_px(
        configJS['topHeaderPaddingsPercentage']['paddingRight'],
        width_
      ),
      topHeaderPaddingLeftInConfig = new ConvertTools().convert_percents_to_px(
        configJS['topHeaderPaddingsPercentage']['paddingLeft'],
        width_
      ),
      topHeaderPaddingBottomInConfig = new ConvertTools().convert_percents_to_px(
        configJS['topHeaderPaddingsPercentage']['paddingBottom'],
        height_
      ),
      searchHeightInConfig = new ConvertTools().convert_percents_to_px(
        configJS['searchHeightPercentage'],
        height_
      ),
      // sums margins and paddings
      sumMarginsTopBottom =
        parseInt(this.phone_display().margins.marginTop.toString()) +
        parseInt(this.phone_display().margins.marginBottom.toString()),
      sumPaddingsTopBottom =
        parseInt(this.phone_display().paddings.paddingTop.toString()) +
        parseInt(this.phone_display().paddings.paddingBottom.toString()),
      chatBordersTopBottom = 6,
      sumHeaderFooterOffsets =
        topHeaderHeigthInConfig +
        chatUiInputHeightInConfig +
        bottomUiHeightInConfig +
        sectionsAppHeightInConfig +
        sumMarginsTopBottom +
        sumPaddingsTopBottom +
        chatBordersTopBottom,
      chatContentHeight = height_ - sumHeaderFooterOffsets,
      chatListMarginsTopBottom = 10,
      chatItemHeight = (chatContentHeight - chatListMarginsTopBottom) / 8

    const parameters_elements = {
      topHeaderHeight: topHeaderHeigthInConfig,
      chatUiInputHeigh: chatUiInputHeightInConfig,
      userInputWidth: userInputWidthInConfig,
      userInputHeight: userInputHeightInConfig,
      bottomUiHeight: bottomUiHeightInConfig,
      bottomLineWidth: bottomLineWidthInConfig,
      sectionsAppHeight: sectionsAppHeightInConfig,
      chatContentHeight: chatContentHeight,
      sumPaddingsTopBottom: sumPaddingsTopBottom,
      sumMarginsTopBottom: sumMarginsTopBottom,
      chatItemHeight: chatItemHeight,
      chatItemImgHeight: chatItemImgHeightInConfig,
      wifiAndBatteryWidth: wifiAndBatteryWidthInConfig,
      sectionsAppIconsHeight: sectionsAppIconsHeightInConfig,
      moreBtnHeight: moreBtnHeightInConfig,
      addContactHeight: addContactHeightInConfig,
      writingHeight: writingHeightInConfig,
      userOptionsOffests: {
        marginRight: userOptionsMarginRightInConfig,
        marginLeft: userOptionsMarginLeftInConfig
      },
      topHeaderPaddings: {
        paddingTop: topHeaderPaddingTopInConfig,
        paddingRight: topHeaderPaddingRightInConfig,
        paddingLeft: topHeaderPaddingLeftInConfig,
        paddingBottom: topHeaderPaddingBottomInConfig
      },
      searchHeight: searchHeightInConfig,
    }

    console.log('height_', height_)
    console.log('parameters_elements', parameters_elements)

    return parameters_elements
  }

  /**
   * возвращает высоту, ширину, отступы для контейнера анимации
   */
  phone_display() {
    const height = this.getHW().height
    const widht = this.getHW().width
    const marginsParam = configJS['marginsInPercentsForPhoneDisplay']
    const marginTop = marginsParam.marginTop,
      marginRight = marginsParam.marginRight,
      marginBottom = marginsParam.marginBottom,
      marginLeft = marginsParam.marginLeft
    const SumMarginsLeftRight = marginLeft + marginRight
    const SumMarginsTopBottom = marginTop + marginBottom // 0 + 10% of img in px

    const paddingsParam = configJS['paddingsInPercentsForPhoneDisplay']

    const paddingTop = new ConvertTools().convert_percents_to_px(paddingsParam.paddingTop, widht),
      paddingRight = new ConvertTools().convert_percents_to_px(paddingsParam.paddingRight, widht),
      paddingBottom = new ConvertTools().convert_percents_to_px(paddingsParam.paddingBottom, widht),
      paddingLeft = new ConvertTools().convert_percents_to_px(paddingsParam.paddingLeft, widht)

      
    // const SumPaddingsLeftRight = paddingLeft + paddingRight
    // const SumPaddingsTopBottom = paddingTop + paddingBottom
    // поставили border-box, теперь не нужно высчитывать с paddings, поэтому ставим их по 0м
    const SumPaddingsLeftRight = 0
    const SumPaddingsTopBottom = 0

    const PDHeight = height - SumMarginsTopBottom - SumPaddingsTopBottom
    const PDWidth = widht - SumMarginsLeftRight - SumPaddingsLeftRight

    const parameters_display = {
      width: PDWidth,
      height: PDHeight,
      margins: {
        marginTop: marginTop,
        marginRight: marginRight,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
      },
      paddings: {
        paddingTop: paddingTop,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        paddingLeft: paddingLeft,
      },
    }

    return parameters_display
  }

  /**
   * высчитывает и отдает высоту и ширину анимации
   */
  getHW() {
    var windowHeight = window.innerHeight

    if (windowHeight < 400) {
      windowHeight = 400
    }
    var tallage = 100 - configJS['marginsSumTopBottomInPercentsWindowAnimation'] // 100% - 10%(отступы по 5%) = 90%
    var heightPhone = (windowHeight / 100) * tallage // вычисление процентов
    var widthPhone = heightPhone / 2.04999

    const offsetHeightPx = 2 // it's 3 px
    const offsetWidthPx = 0 // it's 3px

    heightPhone = heightPhone - offsetHeightPx
    widthPhone = widthPhone - offsetWidthPx

    const parameters = {
      // тут самое главное это сохранение пропорций, НУЖНО написать код на пропорции - Ширина к Высоте
      windowHeigth: window.innerHeight,
      width: widthPhone,
      height: heightPhone,
      coefficientForCurrentImg: 2.038, // разница сторон картинки(высоты к ширине)
    }
    return parameters
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
