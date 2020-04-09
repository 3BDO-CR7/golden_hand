import {Dimensions , I18nManager} from "react-native";
import COLORS from '../../src/consts/colors'

const width     = Dimensions.get('window').width;
const height    = Dimensions.get('window').height;

const styles = ({

    // Style Color ConText

    text_yellow : {
        color               : COLORS.yellow
    },
    text_red : {
        color               : COLORS.red
    },
    text_brown : {
        color               : COLORS.brown
    },
    text_blue : {
        color               : COLORS.blue
    },
    text_light_red : {
        color               : COLORS.light_red
    },
    text_darkBrown : {
        color               : COLORS.darkBrown
    },
    text_gray : {
        color               : COLORS.gray
    },
    text_lightWhite : {
        color               : COLORS.lightWhite
    },
    text_toby : {
        color               : COLORS.toby
    },
    text_light_blue : {
        color               : COLORS.light_blue
    },
    text_black : {
        color               : COLORS.black
    },
    text_midBrown : {
        color               : COLORS.midBrown
    },
    text_bold_gray : {
        color               : COLORS.bold_gray
    },
    text_light_gray : {
        color               : COLORS.light_gray
    },
    text_White : {
        color               : '#FFF'
    },

    // Style Font

    textRegular : {
        fontFamily          : 'cairo',
    },
    textBold : {
        fontFamily          : 'cairoBold'
    },
    textDecoration : {
        textDecorationLine  : "underline"
    },
    fontBold : {
        fontWeight          : "bold"
    },
    fontSpacing: {
        letterSpacing       : 1,
    },
    textSize_11 : {
        fontSize            : 11,
    },
    textSize_12 : {
        fontSize            : 12,
    },
    textSize_13 : {
        fontSize            : 13,
    },
    textSize_14 : {
        fontSize            : 14,
    },
    textSize_16 : {
        fontSize            : 16,
    },
    textSize_18 : {
        fontSize            : 18,
    },
    textSize_20 : {
        fontSize            : 20,
    },
    textSize_22 : {
        fontSize            : 22,
    },
    textSize_24 : {
        fontSize            : 24,
    },
    textSize_26 : {
        fontSize            : 26,
    },
    textSize_28 : {
        fontSize            : 28,
    },
    textSize_30 : {
        fontSize            : 30,
    },
    textSize_32 : {
        fontSize            : 32,
    },

    // Style Direction Text

    textCenter : {
        textAlign           : "center"
    },
    textRight : {
        textAlign           : "left"
    },
    textLeft : {
        textAlign           : "left"
    },

    // Margin Space Vertical

    marginVertical_5 : {
        marginVertical      : 5
    },
    marginVertical_10 : {
        marginVertical      : 10
    },
    marginVertical_15 : {
        marginVertical      : 15
    },
    marginVertical_20 : {
        marginVertical      : 20
    },
    marginVertical_25 : {
        marginVertical      : 25
    },

    // Margin Space Horizontal

    marginHorizontal_0 : {
        marginHorizontal    : 0
    },
    marginHorizontal_5 : {
        marginHorizontal    : 5
    },
    marginHorizontal_10 : {
        marginHorizontal    : 10
    },
    marginHorizontal_15 : {
        marginHorizontal    : 15
    },
    marginHorizontal_20 : {
        marginHorizontal    : 20
    },
    marginHorizontal_25 : {
        marginHorizontal    : 25
    },

    // Padding Space Vertical

    paddingVertical_0 : {
        paddingVertical      : 0
    },
    paddingVertical_5 : {
        paddingVertical      : 5
    },
    paddingVertical_10 : {
        paddingVertical      : 10
    },
    paddingVertical_15 : {
        paddingVertical      : 15
    },
    paddingVertical_20 : {
        paddingVertical      : 20
    },
    paddingVertical_25 : {
        paddingVertical      : 25
    },

    // Padding Space Horizontal

    paddingHorizontal_0 : {
        paddingHorizontal    : 0
    },
    paddingHorizontal_5 : {
        paddingHorizontal    : 5
    },
    paddingHorizontal_10 : {
        paddingHorizontal    : 10
    },
    paddingHorizontal_15 : {
        paddingHorizontal    : 15
    },
    paddingHorizontal_20 : {
        paddingHorizontal    : 20
    },
    paddingHorizontal_25 : {
        paddingHorizontal    : 25
    },

    // Style Border Radius

    Radius_0 : {
        borderRadius        : 0
    },
    Radius_5 : {
        borderRadius        : 5
    },
    Radius_10 : {
        borderRadius        : 10
    },
    Radius_15 : {
        borderRadius        : 15
    },
    Radius_20 : {
        borderRadius        : 20
    },
    Radius_30 : {
        borderRadius        : 30
    },
    Radius_40 : {
        borderRadius        : 40
    },
    Radius_50 : {
        borderRadius        : 50
    },
    Radius_60 : {
        borderRadius        : 60
    },
    Radius_70 : {
        borderRadius        : 70
    },
    Radius_80 : {
        borderRadius        : 80
    },
    Radius_90 : {
        borderRadius        : 90
    },
    Radius_100 : {
        borderRadius        : 100
    },
    RadiusTop_5 : {
      borderTopLeftRadius   : 5,
      borderTopRightRadius  : 5
    },

    // Background Color

    bg_toby : {
        backgroundColor     : COLORS.toby
    },
    bg_light_oran : {
        backgroundColor     : COLORS.light_blue
    },
    bg_orange : {
        backgroundColor     : COLORS.blue
    },
    bg_turquoise : {
        backgroundColor      : COLORS.turquoise
    },
    bg_brown : {
        backgroundColor      : COLORS.brown
    },
    bg_darkBrown : {
        backgroundColor      : COLORS.darkBrown
    },
    bg_midBrown : {
        backgroundColor      : COLORS.midBrown
    },
    bg_gray : {
        backgroundColor      : COLORS.gray
    },
    bg_lightWhite : {
        backgroundColor     : COLORS.lightWhite
    },
    bg_light_red : {
        backgroundColor     : COLORS.light_red
    },
    bg_lightBrown : {
        backgroundColor     : COLORS.lightBrown
    },
    bg_transRed : {
        backgroundColor     : COLORS.transRed
    },
    bg_semon : {
        backgroundColor     : COLORS.semon
    },
    bg_black : {
        backgroundColor     : COLORS.black
    },
    bg_overlay : {
        backgroundColor     : "rgba(250, 218, 208, 0.9)"
    },
    overlay_white : {
        backgroundColor     : "rgba(255, 255, 255, 0.7)"
    },
    overlay_black : {
        backgroundColor     : "rgba(0, 0, 0, 0.5)"
    },
    overlay_transBlue : {
        backgroundColor     : COLORS.transBlue
    },
    overlay_transBrown : {
        backgroundColor     : '#98723dcf'
    },
    overlay_red : {
        backgroundColor     : COLORS.transRed
    },
    bg_White : {
        backgroundColor     : '#FFF'
    },
    bg_light_gray : {
        backgroundColor     : '#d2d2d2'
    },

    // Style Border

    borderToby : {
      borderWidth           : 1,
      borderColor           : COLORS.toby
    },
    borderLightOran : {
        borderWidth           : 1,
        borderColor           : COLORS.lightBrown
    },
    borderRed : {
        borderWidth           : 1,
        borderColor           : COLORS.midBrown
    },
    borderGray : {
        borderWidth           : 1,
        borderColor           : COLORS.light_gray
    },
    borderBlack : {
        borderWidth           : 1,
        borderColor           : COLORS.black
    },
    borderBold : {
        borderWidth           : 1,
        borderColor           : COLORS.bold_gray
    },
    Border : {
        borderWidth           : 1,
        borderColor           : COLORS.opcity_gray
    },

    // Style Search

    checkBox : {
        paddingLeft             : 0,
        paddingBottom           : 0,
        borderRadius            : 5,
        paddingRight            : 3
    },

    // Style Shadow

    boxShadow : {
        shadowColor             : "#363636",
        shadowOffset            : { width: 0, height: 1},
        shadowOpacity           : 0.22,
        shadowRadius            : 2.22,
        elevation               : 3,
    },

    // Styles Flex Box

    flexCenter : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
    },
    centerContext : {
        alignItems          : 'center',
        justifyContent      : 'center',
    },
    centerColum : {
        alignSelf           : 'center',
    },
    SelfCenter : {
        alignSelf           : 'center',
        justifyContent      : 'center',
    },
    SelfRight : {
        alignSelf           : 'flex-end',
        justifyContent      : 'center',
    },
    SelfLeft : {
        alignSelf           : 'flex-start',
        justifyContent      : 'center',
    },
    justifyCenter : {
        justifyContent      : 'center',
    },
    justifyTop : {
        justifyContent      : 'flex-end',
    },
    justifyBottom : {
        justifyContent      : 'flex-start',
    },
    rowGroup : {
        flexDirection       : "row",
        justifyContent      : "space-between",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowCenter : {
        flexDirection       : "row",
        alignSelf           : 'center',
        justifyContent      : "center",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowRight : {
        flexDirection       : "row",
        alignSelf           : 'flex-start',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    rowLeft : {
        flexDirection       : "row",
        alignSelf           : 'flex-end',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    bgFullWidth : {
        flexGrow            : 1,
    },
    flex_10 : {
        flexBasis           : '10%'
    },
    flex_20 : {
        flexBasis           : '20%'
    },
    flex_25 : {
        flexBasis           : '25%'
    },
    flex_30 : {
        flexBasis           : '30%'
    },
    flex_40 : {
        flexBasis           : '40%'
    },
    flex_45 : {
        flexBasis           : '45%'
    },
    flex_50 : {
        flexBasis           : '50%'
    },
    flex_60 : {
        flexBasis           : '60%'
    },
    flex_70 : {
        flexBasis           : '70%'
    },
    flex_80 : {
        flexBasis           : '80%'
    },
    flex_90 : {
        flexBasis           : '90%'
    },
    flex_100 : {
        flexBasis           : '100%'
    },
    flex : {
        flex                : 1
    },


    //  Style For App

    windowWidth : {
        paddingVertical     : 30,
        width               : '100%',
        height              : '100%',
    },
    bgContent : {
        width               : null,
        height              : null,
        flex                : 1,
    },
    Width_50 : {
        width               : '50%'
    },
    Width_60 : {
        width               : '60%'
    },
    Width_70 : {
        width               : '70%'
    },
    Width_80 : {
        width               : '80%'
    },
    Width_90 : {
        width               : '90%'
    },
    Width_100 : {
        width               : '100%'
    },
    width_30 : {
        width               : 30
    },
    width_40 : {
        width               : 40
    },
    width_50 : {
        width               : 50
    },
    width_60 : {
        width               : 60
    },
    width_70 : {
        width               : 70
    },
    width_80 : {
        width               : 80
    },
    width_90 : {
        width               : 90
    },
    width_100 : {
        width               : 100
    },
    width_120 : {
        width               : 120
    },
    width_130 : {
        width               : 130
    },
    width_150 : {
        width               : 150
    },
    width_200 : {
        width               : 200
    },
    height_10 : {
        height               : 10
    },
    height_20 : {
        height               : 20
    },
    height_30 : {
        height               : 30
    },
    height_40 : {
        height               : 40
    },
    height_50 : {
        height               : 50
    },
    height_60 : {
        height               : 60
    },
    height_70 : {
        height               : 70
    },
    height_80 : {
        height               : 80
    },
    height_90 : {
        height               : 90
    },
    height_100 : {
        height              : 100
    },
    height_120 : {
        height              : 120
    },
    height_150 : {
        height              : 150
    },
    height_200 : {
        height              : 200
    },
    height_250 : {
        height              : 250
    },
    heightFull : {
        height              : '100%'
    },
    minHeight : {
        minHeight           :  150
    },
    overHidden : {
        overflow            : 'hidden'
    },

    //  Style Input

    item : {
        width               : "100%",
        marginLeft          : 0,
        marginRight         : 0,
        marginVertical      : 10,
        padding             : 0,
        paddingTop          : 0,
        paddingBottom       : 0,
        borderBottomWidth   : 0,
    },
    input : {
        width               : "100%",
        color               : COLORS.gray,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'cairo',
        fontSize            : 14,
        top                 : 0,
    },
    textArea : {
        width               : "100%",
        color               : COLORS.gray,
        paddingRight        : 20,
        paddingLeft         : 20,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'cairo',
        fontSize            : 14,
        top                 : 0,
        height              : 150,
    },
    iconSearch : {
        right               : 5
    },
    bg_before : {
        left                : 25,
        top                 : 0
    },
    Active : {
        borderWidth           : 1,
        borderColor           : COLORS.midBrown,
        paddingRight          : 60,
        paddingLeft           : 60,
    },
    noActive : {
        borderWidth           : 1,
        borderColor           : COLORS.bold_gray,
        paddingRight          : 20,
        paddingLeft           : 20,
    },
    leftHidRight : {
        right                    : -60,
    },
    leftHidLeft : {
        left                    : -60,
    },
    iconInput : {
        top                     : 12,
        height                  : 52,
        width                   : 52
    },

    // Style Picker

    viewPiker : {
        position            : 'relative',
    },
    Picker : {
        width               : '100%',
        writingDirection    : 'rtl',
        borderWidth         : 0,
        paddingLeft         : 0,
        fontSize            : 18,
        backgroundColor     : 'transparent',
        marginRight         : 0,
        borderRadius        : 0,
        height              : 50,
    },
    itemPiker : {
        borderWidth         : 0,
        borderColor         : COLORS.lightWhite,
        width               : '100%',
        position            : 'relative',
        fontSize            : 18,
        borderRadius        : 0,
        borderLeftWidth     : 0,
        borderBottomWidth   : 0,
        borderTopWidth      : 0,
        borderRightWidth    : 0
    },
    iconPicker : {
        position            : 'absolute',
        right               : 12,
        color               : COLORS.gray,
        fontSize            : 16
    },

    // Style Img Logo

    logo : {
        width               : 150,
        height              : 150,
        resizeMode          :  "contain"
    },
    iconImg : {
        width               : 50,
        height              : 50,
        resizeMode          :  "contain"
    },
    icImg : {
        width               : 80,
        height              : 80,
        resizeMode          : "cover"
    },
    sizeImage : {
        width               : 150,
        height              : 150,
        resizeMode          : 'contain'
    },
    upImage : {
        width               : 250,
        height              : 250,
        resizeMode          : 'contain'
    },
    minImage : {
        width               : 130,
        height              : 130,
        resizeMode          : 'contain'
    },
    icoImage : {
        width               : 200,
        height              : 130,
        resizeMode          : 'contain',
        marginTop           :50
    },
    smImage : {
        width               : 25,
        height              : 25,
        resizeMode          : 'contain'
    },
    favImage : {
        width               : 15,
        height              : 15,
        resizeMode          : 'contain'
    },
    ionImage : {
        width               : 20,
        height              : 20,
        resizeMode          : 'contain'
    },
    iconBank : {
        width               : 35,
        height              : 35,
        resizeMode          : 'contain'
    },

    //  Style Header

    headerView : {
        backgroundColor     : 'transparent',
        zIndex              : 99,
        paddingTop          : 20,
        paddingRight        : 0,
        paddingLeft         : 0,
        elevation           : 0,
        borderBottomWidth   : 0,
        alignItems          : 'center',
        height              : 85
    },
    bodyText : {
        position            : 'relative',
        alignItems          : 'center',
        flex                : 1,
        top                 : -1
    },
    leftIcon : {
        flex                : 0,
        transform           : I18nManager.isRTL ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }],
        marginHorizontal    : 15
    },
    rightIcon : {
        flex                : 0
    },
    iconHeader : {
        width               : 50,
        height              : 40
    },
    rotatTouch : {
        transform           : [{ rotate: '50deg' }],
    },
    rotatIcon : {
        transform           : [{ rotate: '-50deg' }],
    },

    // Style position

    position_R : {
        position                : 'relative',
        zIndex                  : 999
    },
    position_A : {
        position                : 'absolute',
        zIndex                  : 9999
    },
    fixItem : {
        top                     : -20,
        right                   : -20
    },
    top_0 : {
        top                     : 0
    },
    top_5 : {
        top                     : 5
    },
    top_10 : {
        top                     : 10
    },
    top_15 : {
        top                     : 15
    },
    top_20 : {
        top                     : 20
    },
    top_25 : {
        top                     : 25
    },
    top_30 : {
        top                     : 30
    },
    top_35 : {
        top                     : 35
    },
    bottom_0 : {
        bottom                  : 0
    },
    bottom_10 : {
        bottom                  : 10
    },
    bottom_20 : {
        bottom                  : 20
    },
    bottom_30 : {
        bottom                  : 30
    },
    bottom_40 : {
        bottom                  : 40
    },
    right_0 : {
        right                     : 0
    },
    right_5 : {
        right                     : 5
    },
    right_10 : {
        right                     : 10
    },
    right_15 : {
        right                     : 15
    },
    right_20 : {
        right                     : 20
    },
    right_25 : {
        right                     : 25
    },
    right_30 : {
        right                     : 30
    },
    right_35 : {
        right                     : 35
    },
    left_0 : {
        left                     : 0
    },
    left_5 : {
        left                     : 5
    },
    left_10 : {
        left                     : 10
    },
    left_15 : {
        left                     : 15
    },
    left_20 : {
        left                     : 20
    },
    left_25 : {
        left                     : 25
    },
    left_30 : {
        left                     : 30
    },
    left_35 : {
        left                     : 35
    },

    // Style Bg OverLay

    blackOverlay  : {
        backgroundColor         : "rgba(0,0,0,0.5)",
        position                : 'absolute',
        top                     : -10,
        left                    : -10,
        width                   : '100%',
        height                  : '100%'
    },
    brownOverlay  : {
        backgroundColor         : COLORS.midBrown,
        position                : 'absolute',
        top                     : -10,
        left                    : -10,
        width                   : '100%',
        height                  : '100%'
    },
    lightOverlay  : {
        backgroundColor         : "rgba(255,255,255,0.5)",
        position                : 'absolute',
        top                     : -10,
        left                    : -10,
        width                   : '100%',
        height                  : '100%'
    },

    // Style Search


    // Style Loading

    loading : {
        position                : 'absolute',
        top                     : 0,
        right                   : 0,
        width                   : '100%',
        height                  : '100%',
        zIndex                  :  99999,
        backgroundColor         : "rgba(0,0,0,0.5)",
    },

    // Style Swiper

    swiper : {
        height                  : 200,
    },
    viewBlock : {
        position                :  "relative",
    },
    blockContent : {
        position                : 'absolute',
        zIndex                  : 999,
        left                    : 0,
        top                     : 20,
        backgroundColor         : "#98723dcf",
    },
    paginationStyle : {
        alignSelf               : "flex-end",
        paddingHorizontal       : 30 ,
        position                : 'absolute',
        transform               : [{ rotate: '90deg' }] ,
        right                   : -330,
        zIndex                  : 999
    },
    iconContact : {
        position                : 'absolute',
        left                    : -1,
        zIndex                  : 9999,
        top                     : -1
    },

    // Style Model

    bgModel : {
        width                   : "100%",
        backgroundColor         : "rgba(0,0,0,0.8)",
        flex                    : 1,
        alignSelf               : 'center',
        justifyContent          : 'flex-end',
    },
    bgModelFilter : {
        width                   : "100%",
        backgroundColor         : "rgba(0,0,0,0.3)",
        flex                    : 1,
        alignSelf               : 'center',
    },

    // Style Drawer

    clickLogin : {
        bottom                  : 100,
        right                   : -57,
        transform               : [{ rotate: '90deg' }] ,
    },
    drawerItemStyle: {
        paddingHorizontal       : 17,
        marginVertical          : 10
    },
    zIndexUp : {
        zIndex                  : 9999
    },
    zIndexDown : {
        zIndex                  : -1
    },
    imageMask : {
        bottom                  : 0,
        right                   : -55,
        position                : 'absolute',
        height                  : 400,
        resizeMode              : 'contain'
    },

    // Style Basket

    iconRemove : {
        bottom                  : 10,
        right                   : 0
    },
    borderText : {
        borderRightWidth        : 2,
        borderRightColor        : COLORS.midBrown,
    },

    // Style Map

    map : {
        width               : '100%',
        height              : '100%',
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
    },
    activeTabs : {
        backgroundColor     : '#fff',
        borderTopWidth      : 1,
        borderTopColor      : COLORS.midBrown
    },
    noActiveTabs : {
        backgroundColor     : COLORS.midBrown,
        borderTopWidth      : 0,
        borderTopColor      : 'transparent'
    },



    //// amaaaaaaany

    starStyle:{
        color: COLORS.midBrown,
        marginHorizontal:0,
    },
    locationImg:{
        width:12,
        height:12,
        marginRight:5
    },
    locationView:{
        flexDirection:'row',
        alignItems:'center',
    },
    mainScroll:{
        height:70,
        marginTop:10
    },
    scrollView:{
        width:40,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        marginHorizontal:10,
        paddingHorizontal:5,
        paddingVertical: 20,
        backgroundColor:COLORS.light_gray,
        borderTopWidth: 2
    },
    scrollImg:{
        width:25,
        height:25,
    },
    prodImg:{
        width:'100%',
        height:100,
        alignSelf:'center',
    },
    Width_45 : {
        width : '45%'
    },
    paddingHorizontal_7 : {
        paddingHorizontal : 7
    },
    paddingVertical_7 : {
        paddingVertical : 7
    },
    bgBtn : {
        backgroundColor:COLORS.light_blue,
        borderRadius:0,
        width:40,
        height:40,
        paddingRight:0,
        paddingLeft:0,
        alignItems:'center',
        justifyContent:'center',
        right:-10
    },
    Width_95 : {
        width: '95%'
    },
    Width_93 : {
        width: '92%'
    },
    directionRow : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    counterParent:{
        flexDirection:'column' ,
        justifyContent:'center' ,
        alignItems:'center'  ,
        alignSelf:'center'
    },
    touchPlus:{
        backgroundColor:COLORS.lightBrown ,
        height:20,
        width:20,
        justifyContent:'center',
        alignItems:'center'
    },
    touchMinus:{
        backgroundColor:COLORS.light_gray ,
        height:20,
        width:20,
        justifyContent:'center',
        alignItems:'center'
    },
    plus:{
        fontSize:15 ,
        color:COLORS.midBrown
    },
    minus:{
        fontSize:15 ,
        color:'#FFF'
    },
    countText:{
        width:20,
        height:35,
        borderWidth:1,
        borderColor:COLORS.midBrown,
        marginVertical:5,
        justifyContent:'center',
        alignItems:'center'
    },
    countText2:{
        width:50,
        height:30,
        borderWidth:1,
        borderColor:COLORS.midBrown,
        marginHorizontal:15,
        justifyContent:'space-around',
        alignItems:'center'
    },
    cartBtn:{
        backgroundColor:COLORS.midBrown,
        width:'45%',
        paddingHorizontal: 15,
        paddingVertical: 7,
        justifyContent:'center',
        alignItems:'center'
    },
    subView: {
        position: "absolute",
        bottom: -10,
        backgroundColor: "#fff",
        height: 390,
        zIndex:100,
    },
    notiBlock:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        borderBottomWidth:.5,
        borderBottomColor:COLORS.light_gray,
        paddingBottom: 10
    },
    notiImg:{
        width:40,
        height:40,
        borderRadius:50,
        marginRight:10,
        flex:0
    },
    directionColumn:{
        flexDirection:'column',
    },
    directionColumnCenter:{
        justifyContent:'center' ,
        alignItems:'center' ,
        flexDirection:'column'
    },
    directionRowCenter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    directionRowSpace:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    writeMassage : {
        position             : 'absolute',
        bottom               : 10,
        width                : '100%',
        right                : 0,
        backgroundColor      : '#FFF',
    },
    btn_massage : {
        position             : 'absolute',
        right                : 5,
        top                  : 8,
        backgroundColor      : '#8F7361'
    },
    input_chat : {
        borderWidth             : 1,
        borderColor             : '#DDD',
        borderRadius            : 5,
        textAlign               : 'right',
        fontFamily              : 'cairo',
       // paddingLeft             : 20,
        width                   : '90%',
        alignSelf : 'center',
        lineHeight : 30
    },
    restImg:{
        width:50,
        height:50,
        borderRadius:25,
        marginRight:10,
        flex:0,
        resizeMode:"cover",
        borderWidth:1,
        borderColor:COLORS.light_red
    },
    commentModal:{
        width: '110%',
        position: 'absolute',
        bottom: -18,
        backgroundColor: '#fff',
        alignSelf: 'center' ,
    },
    textarea:{
        height:100
    },
    keyboardAvoid: {
        width:'100%',
        height: null,
        flex: 1,
    },
    writing:{
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
    },
    chatRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.opcity_gray,
        paddingHorizontal: 15,
        paddingVertical: 5
	},
    chatAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.midBrown,
        marginRight: 10
    },
    chatUsername: {
        alignSelf: 'flex-start',
        color: COLORS.bold_gray,
        flex: 3,
        marginTop: 5
    },
    chatTime: {
		alignSelf: 'flex-end',
		flex: 1,
        color: COLORS.bold_gray,
    },
    chatMsg: {
        color: COLORS.black
    },
    senderMsg:{
        backgroundColor: '#92662bd9',
		maxWidth: '80%',
        alignSelf: 'flex-start',
        margin: 10,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    senderText: {
        color: '#fff',
        alignSelf: 'flex-start'
    },
    reciverText: {
        color: '#fff',
		alignSelf: 'flex-start',
    },
    reciverMsg:{
        backgroundColor: '#bfa684e0',
        flexDirection: 'row',
        maxWidth: '80%',
		margin: 10,
		padding: 10,
		alignSelf: 'flex-end',
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20

    },
	reciverImg:{
		width: 40,
		height: 40,
		borderRadius: 30,
		borderWidth: 1,
		borderColor: COLORS.midBrown,
		marginRight: 10,
        marginTop: 3
    }
});

export default styles;
