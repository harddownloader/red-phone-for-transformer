import {ConvertTools} from './core.js'
import configJS from './config'

export class ComputedProperties {
  constructor() {

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
   * возвращает объект с нужными высотами частей анимации
   */
  displayElements(isChatsList = false) {
    if (document.querySelector('.chat-list-version')) {
      isChatsList = true
    }

    const height_ = this.getHW().height
    const width_ = this.getHW().width

    const topHeaderHeigthInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? configJS['topHeaderHeightPercentage__chatList'] : configJS['topHeaderPercentage']
            return needPercentage
          })(),
          height_
      ),
      leftHeaderOffestWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['leftHeaderOffestWidthPercentage'],
          width_
      ),
      rightHeaderOffestWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['rightHeaderOffestWidthPercentage'],
          width_
      ),
      leftLogoOffsetWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['leftLogoOffsetWidthPercentage'],
          width_
      ),
      rightLogoOffsetWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['rightLogoOffsetWidthPercentage'],
          width_
      ),
      headerLogoWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['headerLogoWidthPercentage'],
          width_
      ),
      headerBackBtnWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['headerBackBtnWidthPercentage'],
          width_
      ),
      chatUiInputHeightInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? 0 : configJS['chatUiInputHeightPercentage']
            return needPercentage
          })(),
          height_
      ),
      userInputWidthInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? 0 : configJS['userInputWidthPercentage']
            return needPercentage
          })(),
          width_
      ),
      userInputHeightInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? 0 : configJS['userInputHeightPercentage']
            return needPercentage
          })(),
          height_
      ),
      userInputBgWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['userInputBgWidthPercentage'],
          width_
      ),
      bottomOffsetWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['bottomOffsetWidthPercentage'],
          width_
      ),
      bottomIconAddFileWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['bottomIconAddFileWidthPercentage'],
          width_
      ),
      bottomIconGalleryWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['bottomIconGalleryWidthPercentage'],
          width_
      ),
      bottomIconMicroWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['bottomIconMicroWidthPercentage'],
          width_
      ),
      bottomUiHeightInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? 0 : configJS['bottomUiHeightPercentage']
            return needPercentage
          })(),
          height_
      ),
      bottomLineWidthInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? 0 : configJS['bottomLineWidthPercentage']
            return needPercentage
          })(),
          width_
      ),
      sectionsAppHeightInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? configJS['sectionsAppHeightPercentage'] : 0
            return needPercentage
          })(),
          height_
      ),
      sectionsAppIconsHeightInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = configJS['sectionsAppIconsHeightPercentage']
            return needPercentage
          })(),
          height_
      ),
      chatItemImgHeightInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = isChatsList ? configJS['chatItemImgHeightPercentage'] : 0
            return needPercentage
          })(),
          height_
      ),
      wifiAndBatteryWidthInConfig = new ConvertTools().convert_percents_to_px(
          (() => {
            const needPercentage = configJS['wifiAndBatteryWidthPercentage']
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
      // --messages
      messageMarginBottomInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messageMarginBottomPercentage'],
          height_
      ),
      messageLogoTopMarginInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messageLogoTopMarginPercentage'],
          height_
      ),
      messageLogoLeftOrRightMarginInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messageLogoLeftOrRightMarginPercentage'],
          width_
      ),
      paddingOffestHeightInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messagePaddingsPercentage']['paddingOffestHeight'],
          height_
      ),
      paddingOffestWeightInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messagePaddingsPercentage']['paddingOffestWeight'],
          width_
      ),
      messageBorderRadiusFirstInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messageBorderRadiusPercentage']['first'],
          width_
      ),
      messageBorderRadiusRestInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messageBorderRadiusPercentage']['rest'],
          width_
      ),
      chatContentWrapperPeddingsInConfig = new ConvertTools().convert_percents_to_px(
          configJS['chatContentWrapperPeddingsPercentage'],
          width_
      ),
      headAndDate__arrowWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['headAndDate__arrowWidthPercentage'],
          width_
      ),
      chatIconImgWidthInConfig = new ConvertTools().convert_percents_to_px(
          configJS['chatIconImgWidthPercentage'],
          width_
      ),
      headAndDate__headFontSizeInConfig = new ConvertTools().convert_percents_to_px(
          configJS['headAndDate__headFontSizePercentage'],
          height_
      ),
      date_dialogs_itemFontSizeInConfig = new ConvertTools().convert_percents_to_px(
          configJS['date_dialogs_itemFontSizePercentage'],
          height_
      ),
      messageDateFontSizeInConfig = new ConvertTools().convert_percents_to_px(
          configJS['messageDateFontSizePercentage'],
          height_
      ),
      chatMessageFontSizeInConfig = new ConvertTools().convert_percents_to_px(
          configJS['chatMessageFontSizePercentage'],
          height_
      ),
      chatMessageLineHeightInConfig = new ConvertTools().convert_percents_to_px(
          configJS['chatMessageLineHeightPercentage'],
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
      // header
      topHeaderHeight: topHeaderHeigthInConfig,
      leftHeaderOffestWidth: leftHeaderOffestWidthInConfig,
      rightHeaderOffestWidth: rightHeaderOffestWidthInConfig,
      leftLogoOffsetWidth: leftLogoOffsetWidthInConfig,
      rightLogoOffsetWidth: rightLogoOffsetWidthInConfig,
      headerLogoWidth: headerLogoWidthInConfig,
      headerBackBtnWidth: headerBackBtnWidthInConfig,
      chatUiInputHeigh: chatUiInputHeightInConfig,
      searchHeight: searchHeightInConfig,
      wifiAndBatteryWidth: wifiAndBatteryWidthInConfig,
      userOptionsOffests: {
        marginRight: userOptionsMarginRightInConfig,
        marginLeft: userOptionsMarginLeftInConfig
      },
      moreBtnHeight: moreBtnHeightInConfig,
      addContactHeight: addContactHeightInConfig,
      writingHeight: writingHeightInConfig,
      topHeaderPaddings: {
        paddingTop: topHeaderPaddingTopInConfig,
        paddingRight: topHeaderPaddingRightInConfig,
        paddingLeft: topHeaderPaddingLeftInConfig,
        paddingBottom: topHeaderPaddingBottomInConfig
      },
      sumPaddingsTopBottom: sumPaddingsTopBottom,
      sumMarginsTopBottom: sumMarginsTopBottom,

      // content
      // --chats list
      chatContentHeight: chatContentHeight,
      chatItemHeight: chatItemHeight,
      chatItemImgHeight: chatItemImgHeightInConfig,
      // --messages
      messageMarginBottom: messageMarginBottomInConfig,
      messageLogoTopMargin: messageLogoTopMarginInConfig,
      messageLogoLeftOrRightMargin: messageLogoLeftOrRightMarginInConfig,
      messagePaddings: {
        paddingOffestHeight: paddingOffestHeightInConfig,
        paddingOffestWeight: paddingOffestWeightInConfig,
      },
      messageBorderRadius: {
        first: messageBorderRadiusFirstInConfig,
        rest: messageBorderRadiusRestInConfig
      },
      chatContentWrapperPeddings: chatContentWrapperPeddingsInConfig,
      headAndDate__arrowWidth: headAndDate__arrowWidthInConfig,
      chatIconImgWidth: chatIconImgWidthInConfig,
      headAndDate__headFontSize: headAndDate__headFontSizeInConfig,
      date_dialogs_itemFontSize: date_dialogs_itemFontSizeInConfig,
      messageDateFontSize: messageDateFontSizeInConfig,
      chatMessageFontSize: chatMessageFontSizeInConfig,
      chatMessageLineHeight: chatMessageLineHeightInConfig,
      // footer
      userInputWidth: userInputWidthInConfig,
      userInputHeight: userInputHeightInConfig,
      userInputBgWidth: userInputBgWidthInConfig,
      bottomOffsetWidth: bottomOffsetWidthInConfig,
      bottomIconAddFileWidth: bottomIconAddFileWidthInConfig,
      bottomIconGalleryWidth: bottomIconGalleryWidthInConfig,
      bottomIconMicroWidth: bottomIconMicroWidthInConfig,
      bottomUiHeight: bottomUiHeightInConfig,
      bottomLineWidth: bottomLineWidthInConfig,
      sectionsAppHeight: sectionsAppHeightInConfig,
      sectionsAppIconsHeight: sectionsAppIconsHeightInConfig,
    }

    // console.log('height_', height_)
    // console.log('parameters_elements', parameters_elements)

    return parameters_elements
  }
}
