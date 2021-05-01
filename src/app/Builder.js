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

    this.chatHeaderWrapperOtricatelnueMargins = {
      marginLeft: '-' + this.marginsForPhoneDisplay.marginLeft + 'px',
      marginRight: '-' + this.marginsForPhoneDisplay.marginRight + 'px',
    }

    this.hrLineMargins = {
      marginLeft: '-' + (this.marginsForPhoneDisplay.marginLeft - 1) + 'px', // 1 it's offset
      marginRight: '-' + (this.marginsForPhoneDisplay.marginRight - 1) + 'px',
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
    // HEIGHT AND WIDHT
    document.querySelector('#wrapper_phone').style.width =
      this.getHW().width + 'px'
    console.log(this.getHW().width)
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
    console.log('displayElements', isChatsList)
    const height_ = this.getHW().height

    const topHeaderHeigthInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? configJS['topHeaderPercentage__chatList'] : configJS['topHeaderPercentage']
          console.log('needPercentage', needPercentage)
          return needPercentage
        })(),
        height_
      ),
      chatSendHeightInConfig = new ConvertTools().convert_percents_to_px(
        (() => {
          const needPercentage = isChatsList ? configJS['chatSendHeightPercentage__chatList'] : configJS['chatSendHeightPercentage']
          console.log('chatSendHeightPercentage__chatList', needPercentage)
          return needPercentage
        })(),
        // configJS['chatSendHeightPercentage'],
        height_
      ),
      chatSendHeight = chatSendHeightInConfig,
      topHeaderHeight = topHeaderHeigthInConfig,
      sumMarginsTopBottom =
        parseInt(this.marginsForPhoneDisplay.marginTop) +
        parseInt(this.marginsForPhoneDisplay.marginBottom),
      sumPaddingsTopBottom =
        parseInt(this.paddingsForPhoneDisplay.paddingTop) +
        parseInt(this.paddingsForPhoneDisplay.paddingBottom),
      sumHeaderFooterOffsets =
        chatSendHeight + topHeaderHeight + sumMarginsTopBottom + sumPaddingsTopBottom,
      chatContentHeight = height_ - sumHeaderFooterOffsets

    console.log('chatSendHeightInConfig', chatSendHeightInConfig)
    const parameters_elements = {
      chatSendHeight: chatSendHeight,
      topHeaderHeight: topHeaderHeight,
      chatContentHeight: chatContentHeight,
    }

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
    const paddingTop = paddingsParam.paddingTop,
      paddingRight = paddingsParam.paddingRight,
      paddingBottom = paddingsParam.paddingBottom,
      paddingLeft = paddingsParam.paddingLeft

      
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
