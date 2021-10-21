type AnyFun = (options: any) => any;

type Exclude<T, U> = T extends U ? never : T;

type Omit<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P];
};
/**
 * 基本类
 */
export const enum MenuItemBase {
    /** 举报 */ Expose = "menuItem:exposeArticle",
    /** 调整字体 */ SetFont = "menuItem:setFont",
    /** 日间模式 */ DayMode = "menuItem:dayMode",
    /** 夜间模式 */ NightModeF = "menuItem:nightMode",
    /** 刷新 */ Refresh = "menuItem:refresh",
    /** 查看公众号（已添加） */ Profile = "menuItem:profile",
    /** 查看公众号（未添加） */ AddContact = "menuItem:addContact",
}
/**
 * 传播类
 */
export const enum MenuItemShare {
    /** 发送给朋友 */ AppMessage = "menuItem:share:appMessage",
    /** 分享到朋友圈 */ Timeline = "menuItem:share:timeline",
    /** 分享到QQ */ QQ = "menuItem:share:qq",
    /** 分享到Weibo */ WeiboApp = "menuItem:share:weiboApp",
    /** 收藏 */ Favorite = "menuItem:share:favorite",
    /** 分享到FB */ Facebook = "menuItem:share:facebook",
    /** 分享到 QQ 空间 */ QZone = "menuItem:share:QZone",
}
/**
 * 保护类
 */
export const enum MenuItemGuard {
    /** 编辑标签 */ EditTag = "menuItem:editTag",
    /** 删除 */ Delete = "menuItem:delete",
    /** 复制链接 */ CopyUrl = "menuItem:copyUrl",
    /** 原网页 */ OriginPage = "menuItem:originPage",
    /** 阅读模式 */ ReadMode = "menuItem:readMode",
    /** 在QQ浏览器中打开 */ OpenWithQQBrowser = "menuItem:openWithQQBrowser",
    /** 在Safari中打开 */ OpenWithSafari = "menuItem:openWithSafari",
    /** 邮件 */ Email = "menuItem:share:email",
    /** 一些特殊公众号 */ Brand = "menuItem:share:brand",
}

interface Config {
    /**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     */
    debug: boolean;
    /**
     * 必填，公众号的唯一标识
     */
    appId: string;
    /**
     * 必填，生成签名的时间戳
     */
    timestamp: string;
    /**
     * 必填，生成签名的随机串
     */
    nonceStr: string;
    /**
     * 必填，签名
     */
    signature: string;
    /**
     * 必填，需要使用的JS接口列表
     */
    jsApiList: Array<any>;
}

interface Extra {
    /**
     * 接口调用成功时执行的回调函数。
     */
    success?: any;
    /**
     * 接口调用失败时执行的回调函数。
     */
    fail?: any;
    /**
     * 接口调用完成时执行的回调函数，无论成功或失败都会执行。
     */
    complete?: any;
    /**
     * 接口调用完成时执行的回调函数，无论成功或失败都会执行。
     */
    cancel?: any;
    /**
     *  监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
     */
    trigger?: any;
}

interface AppMessageShare extends Extra {
    /** 分享标题 */ title: string;
    /** 分享描述 */ desc: string;
    /** 分享链接,分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 */ link: string;
    /** 分享图标 */ imgUrl: string;
}

type TimelineShare = Omit<AppMessageShare, "desc" | keyof Extra> & Extra;

interface MenuShareApp extends AppMessageShare {
    /** 分享类型,music、video或link，不填默认为link */ type: "";
    /** 如果type是music或video，则要提供数据链接，默认为空 */ dataUrl: "";
}
interface MenuShareQQ extends AppMessageShare { }
interface MenuShareWeibo extends AppMessageShare { }
interface MenuShareQZone extends AppMessageShare { }
interface ChooseImage extends Extra {
    /** 默认9 */ count?: number;
    /** 可以指定是原图还是压缩图，默认二者都有*/ sizeType?: Array<
    "original" | "compressed"
>;
    /** 可以指定来源是相册还是相机，默认二者都有 */ sourceType?: Array<
    "album" | "camera"
>;
}

interface PreviewImage {
    /** 当前显示图片的http链接 */ current: string;
    /** 需要预览的图片http链接列表 */ urls: Array<string>;
}
interface ShowProgressTips {
    /** 默认为1，显示进度提示 */ isShowProgressTips: number;
}
interface UploadImage extends ShowProgressTips {
    /** 需要上传的图片的本地ID，由chooseImage接口获得 */ localId: string;
}
interface DownloadImage extends ShowProgressTips {
    /** 需要下载的图片的服务器端ID，由uploadImage接口获得 */ serverId: string;
}
interface LocalImgData {
    /** 图片的localID */ localId: string;
}
interface PlayVoice {
    /** 需要播放的音频的本地ID，由stopRecord接口获得*/ localId: string;
}
interface PayseVoice {
    /** 需要暂停的音频的本地ID，由stopRecord接口获得*/ localId: string;
}
interface StopVoice {
    /** 需要停止的音频的本地ID，由stopRecord接口获得*/ localId: string;
}
interface UploadVoice extends ShowProgressTips {
    /**  需要上传的音频的本地ID，由stopRecord接口获得*/ localId: string;
}
interface DownloadVoice extends ShowProgressTips {
    /** 需要下载的音频的服务器端ID，由uploadVoice接口获得 */ serverId: string;
}
interface TranslateVoice extends ShowProgressTips {
    /** 需要识别的音频的本地Id，由录音相关接口获得*/ localId: string;
}
interface Location {
    /** 纬度，浮点数，范围为90 ~ -90*/ latitude: number;
    /** 经度，浮点数，范围为180 ~ -180。*/ longitude: number;
    /** 位置名*/ name: string;
    /** 地址详情说明*/ address: string;
    /** 地图缩放级别,整型值,范围从1~28。默认为最大*/ scale?: number;
    /** 在查看位置界面底部显示的超链接,可点击跳转*/ infoUrl: string;
}
interface GetLocation extends Extra {
    /** 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'*/ type?: string;
}
interface SearchBeacon {
    /** 摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面*/ ticket: string;
}
interface HideMenuItem {
    /** 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮*/ menuList: Array<
    MenuItemShare | MenuItemGuard
>;
}
interface ShowMenuItem {
    /** 要显示的菜单项*/ menuList: Array<
    MenuItemBase | MenuItemShare | MenuItemGuard
>;
}
interface ScanQRCode extends Extra {
    /** 默认为0，扫描结果由微信处理，1则直接返回扫描结果*/ needResult?: 0 | 1;
    /** 可以指定扫二维码还是一维码，默认二者都有*/ scanType?: Array<
    "qrCode" | "barCode"
>;
}
interface ProductSpecificView {
    /** 商品id*/ productId: string;
    /** 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页*/ viewType?: string;
}
interface Card extends Extra {
    /** 门店Id*/ shopId: string;
    /** 卡券类型*/ cardType: string;
    /** 卡券Id*/ cardId: string;
    /** 卡券签名时间戳*/ timestamp: number;
    /** 卡券签名随机串*/ nonceStr: string;
    /** 签名方式，默认'SHA1'*/ signType?: string;
    /** 卡券签名*/ cardSign: string;
}
interface AddCard extends Extra {
    /** 卡券列表*/ cardList: Array<{
    cardId: string;
    /**
     * 卡券列表
     * cardExt本身是一个JSON字符串，是商户为该张卡券分配的唯一性信息，包含以下字段
     *
     * 指定的卡券code码，只能被领一次。自定义code模式的卡券必须填写，非自定义code和预存code模式的卡券不必填写。详情见： 是否自定义code码
     * (参与签名,可选)
     * code?;
     *
     * 指定领取者的openid，只有该用户能领取。bind_openid字段为true的卡券必须填写，bind_openid字段为false不必填写。
     * (参与签名,可选)
     *openid?;
     *
     * 时间戳，商户生成从1970年1月1日00:00:00至今的秒数,即当前的时间,且最终需要转换为字符串形式;由商户生成后传入,不同添加请求的时间戳须动态生成，若重复将会导致领取失败！。
     * (参与签名,必选)
     *timestamp;
     *
     * 随机字符串，由开发者设置传入， 加强安全性（若不填写可能被重放请求） 。随机字符串，不长于32位。推荐使用大小写字母和数字，不同添加请求的nonce须动态生成，若重复将会导致领取失败。
     * (参与签名,可选)
     *nonce_str?;
     *
     * 卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类型为 DAT E_TYPE_FIX_TERM时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取时间不同步的问题。
     * (可选)
     * fixed_begintimestamp?;
     *
     * 领取渠道参数，用于标识本次领取的渠道值。
     * (可选)
     * outer_str?;
     *
     * 签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用SHA1。
     * 具体签名方案参见 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html;
     * 由商户按照规范签名后传入。
     * (必选)
     * signature;
     *
     */
    cardExt: string;
}>;
}
interface OpenCard extends Omit<AddCard, keyof Extra> { }
interface WXPay extends Extra {
    /** 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符*/ timestamp: number;
    /** 支付签名随机串，不长于 32 位*/ nonceStr: string;
    /** 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）*/ package: string;
    /** 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致*/ signType: string;
    /** 支付签名*/ paySign: string;
}
interface CheckJsApi extends Extra {
    /** 需要检测的JS接口列表*/ jsApiList: Array<keyof Sdk>;
}
/*
 * 所有微信接口
 *
 * @date 18/10/2021
 * @interface XXX
 */
export interface Sdk {
    /**
     * 注入配置信息
     * JS-SDK的页面必须先注入配置信息
     * 所有接口调用都必须在config接口获得结果之后
     */
    config: (options: Config) => void;
    /**
     * 信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
     * 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
     * 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
     */
    ready: (fun: AnyFun) => void;
    /**
     * config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
     */
    error: (fun: AnyFun) => void;
    /** 判断当前客户端版本是否支持指定JS接口*/ checkJsApi: (
        options: CheckJsApi
    ) => void;
    /** 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）*/ onMenuShareTimeline: (
        options: TimelineShare
    ) => void;
    /** 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃） */ onMenuShareAppMessage: (
        optons: MenuShareApp
    ) => void;
    /** 获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃） */ onMenuShareQQ: (
        options: MenuShareQQ
    ) => void;
    /** 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口 */ onMenuShareWeibo: (
        options: MenuShareWeibo
    ) => void;
    /** 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃） */ onMenuShareQZone: (
        options: MenuShareQZone
    ) => void;
    /** 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0） */ updateTimelineShareData: (
        options: TimelineShare
    ) => void;
    /** 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0） */ updateAppMessageShareData: (
        options: AppMessageShare
    ) => void;
    /** 开始录音 */ startRecord: () => void;
    /** 停止录音接口*/ stopRecord: (options: Extra) => void;
    /** 监听录音自动停止接口*/ onVoiceRecordEnd: (options: Extra) => void;
    /** 播放语音接口*/ playVoice: (options: PlayVoice) => void;
    /** 暂停播放接口*/ pauseVoice: (options: PayseVoice) => void;
    /** 停止播放接口*/ stopVoice: (options: StopVoice) => void;
    /** 监听语音播放完毕接口*/ onVoicePlayEnd: (options: Extra) => void;
    /** 上传语音接口*/ uploadVoice: (options: UploadVoice) => void;
    /** 下载语音接口*/ downloadVoice: (options: DownloadVoice) => void;
    /** 识别音频并返回识别结果接口*/ translateVoice: (
        options: TranslateVoice
    ) => void;
    /** 拍照或从手机相册中选图接口*/ chooseImage: (
        options: ChooseImage
    ) => void;
    /** 获取地理位置接口*/ getLocation: (options: GetLocation) => void;
    /** 预览图片接口*/ previewImage: (options: PreviewImage) => void;
    /** 上传图片接口*/ uploadImage: (options: UploadImage) => void;
    /** 下载图片接口*/ downloadImage: (options: DownloadImage) => void;
    /** 获取本地图片接口*/ getLocalImgData: (options: LocalImgData) => void;
    /** 获取网络状态接口*/ getNetworkType: (options: Extra) => void;
    /** 使用微信内置地图查看位置接口*/ openLocation: (
        options: Location
    ) => void;
    hideOptionMenu: (options: any) => void;
    showOptionMenu: (options: any) => void;
    /** 关闭当前网页窗口接口*/ closeWindow: (options: any) => void;
    /** 批量隐藏功能按钮接口*/ hideMenuItems: (options: HideMenuItem) => void;
    /** 批量显示功能按钮接口*/ showMenuItems: (options: ShowMenuItem) => void;
    /** 隐藏所有非基础按钮接口*/ hideAllNonBaseMenuItem: () => void;
    /** 显示所有功能按钮接口*/ showAllNonBaseMenuItem: (options: any) => void;
    /** 调起微信扫一扫接口*/ scanQRCode: (options: ScanQRCode) => void;
    /** 共享收货地址接口*/ openAddress: (options: Extra) => void;
    /** 跳转微信商品页接口*/ openProductSpecificView: (
        options: ProductSpecificView
    ) => void;
    /** 批量添加卡券接口*/ addCard: (options: AddCard) => void;
    /** 拉取适用卡券列表并获取用户选择信息*/ chooseCard: (
        options: Card
    ) => void;
    /** 查看微信卡包中的卡券接口*/ openCard: (options: OpenCard) => void;
    consumeAndShareCard: (options: any) => void;
    /** 发起一个微信支付请求*/ chooseWXPay: (options: WXPay) => void;
    openEnterpriseRedPacket: (options: any) => void;
    /** 开启查找周边ibeacon设备接口*/ startSearchBeacons: (
        options: SearchBeacon
    ) => void;
    /** 关闭查找周边ibeacon设备接口*/ stopSearchBeacons: (
        options: Extra
    ) => void;
    onSearchBeacons: (options: any) => void;
    openEnterpriseChat: (options: any) => void;
    launchMiniProgram: (options: any) => void;
    openBusinessView: (options: any) => void;
    miniProgram: (options: any) => void;
}

declare const wxSdk: Sdk;
export default wxSdk;
